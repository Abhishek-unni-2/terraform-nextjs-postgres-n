variable "db_user" {
  default = "postgres"
}
variable "db_password" {
  default = "postgres"
}
variable "db_name" {
  default = "taskdb"
}
variable "db_port" {
  default = 5432
}
variable "backend_port" {
  default = 3001
}
variable "frontend_port" {
  default = 3000
}
variable "network_name" {
  default = "app-net"
}
variable "db_volume_name" {
  default = "postgres-data"
}
