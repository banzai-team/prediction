resource "yandex_container_registry" "main-registry" {
  name        = "banazai-registry"
  description = "registry for all services"
}
