resource "yandex_vpc_network" "network" {
  name = "banzai-network"
}

resource "yandex_vpc_subnet" "cluster_subnet" {
  count = length(local.zones)

  network_id     = yandex_vpc_network.network.id
  zone           = local.zones[count.index]
  v4_cidr_blocks = ["10.0.0.0/24"]
}
