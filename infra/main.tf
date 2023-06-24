locals {
  default_prefix = "banzai"

  cluster_version = "1.24"

  zones      = ["ru-central1-a"]
  subnet     = "10.0.0.0/12"
  k8s_region = "ru-central1"

  location_subnets = yandex_vpc_subnet.cluster_subnet
}


module "cluster" {
  source = "./yc-k8s-cluster"

  cluster_access_net_addr = "0.0.0.0/0"
  cluster_ipv4_range      = "10.112.0.0/16"
  service_ipv4_range      = "10.96.0.0/16"

  #  cluster_node_groups        = {
  #    app = {
  #      name   = "app"
  #    }
  #  }

  kube_version = local.cluster_version
  cluster_node_groups        = {}
  location_subnets           = local.location_subnets
  name                       = "banzai-cluster"
  cluster_service_account_id = yandex_iam_service_account.cluster.id
  node_service_account_id    = yandex_iam_service_account.cluster_node.id
  vpc_id                     = yandex_vpc_network.network.id
  zonal                      = true
}