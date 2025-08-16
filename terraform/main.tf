terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.2"
    }
  }
}

provider "docker" {}

# -------------------
# Network
# -------------------
resource "docker_network" "app_net" {
  name = var.network_name
}

# -------------------
# Volume
# -------------------
resource "docker_volume" "db_data" {
  name = var.db_volume_name
}

# -------------------
# Database (Postgres)
# -------------------
resource "docker_container" "database" {
  name  = "database"
  image = "postgres:14-alpine"

  restart = "always"

  networks_advanced {
    name = docker_network.app_net.name
  }

  env = [
    "POSTGRES_USER=${var.db_user}",
    "POSTGRES_PASSWORD=${var.db_password}",
    "POSTGRES_DB=${var.db_name}"
  ]

  mounts {
    target = "/var/lib/postgresql/data"
    source = docker_volume.db_data.name
    type   = "volume"
  }

  mounts {
    target = "/docker-entrypoint-initdb.d/init.sql"
    source = "${path.cwd}/../database/init.sql"
    type   = "bind"
  }
}

# -------------------
# Backend
# -------------------
resource "docker_image" "backend_image" {
  name = "three-tier-backend"
  build {
    context    = "${path.cwd}/../backend"
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "backend" {
  name  = "backend"
  image = docker_image.backend_image.image_id
  restart = "always"

  networks_advanced {
    name = docker_network.app_net.name
  }

  ports {
    internal = var.backend_port
    external = var.backend_port
  }

  env = [
    "DB_HOST=database",
    "DB_PORT=${var.db_port}",
    "DB_USER=${var.db_user}",
    "DB_PASSWORD=${var.db_password}",
    "DB_NAME=${var.db_name}",
    "PORT=${var.backend_port}"
  ]

  depends_on = [docker_container.database]
}

# -------------------
# Frontend
# -------------------
resource "docker_image" "frontend_image" {
  name = "three-tier-frontend"
  build {
    context    = "${path.cwd}/../frontend"
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "frontend" {
  name  = "frontend"
  image = docker_image.frontend_image.image_id
  restart = "always"

  networks_advanced {
    name = docker_network.app_net.name
  }

  ports {
    internal = var.frontend_port
    external = var.frontend_port
  }

  env = [
    "NEXT_PUBLIC_BACKEND_URL=http://localhost:${var.backend_port}"
  ]

  depends_on = [docker_container.backend]
}
