output "frontend_url" {
  value = "http://localhost:${var.frontend_port}"
}

output "backend_url" {
  value = "http://localhost:${var.backend_port}"
}

output "database_info" {
  value = "postgresql://${var.db_user}:${var.db_password}@localhost:${var.db_port}/${var.db_name}"
}
