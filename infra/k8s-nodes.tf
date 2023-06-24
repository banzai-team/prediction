locals {
  subnets    = yandex_vpc_subnet.cluster_subnet
  subnet_ids = [for cluster_subnet in yandex_vpc_subnet.cluster_subnet : cluster_subnet.id]
}

resource "yandex_kubernetes_node_group" "cluster_node_group" {
  cluster_id = module.cluster.id
  name       = "system"

  version = local.cluster_version

  instance_template {
    platform_id = "standard-v3"

    network_interface {
      nat                = true
      subnet_ids         = local.subnet_ids
      security_group_ids = [
        module.cluster.main_sg_id,
        module.cluster.public_sg_id,
      ]
    }

    resources {
      memory = 4
      cores  = 2
      core_fraction = 50
    }

    boot_disk {
      type = "network-hdd"
      size = 64
    }

    scheduling_policy {
      preemptible = false
    }
  }

  scale_policy {
    auto_scale {
      initial = 0
      max     = 2
      min     = 0
    }
  }

  allocation_policy {
    dynamic location {
      for_each = local.subnets
      content {
        zone = location.value.zone
      }
    }
  }

  node_labels = {
    env    = var.environment
    target = "system"
  }

  node_taints = []
}

resource "yandex_kubernetes_node_group" "cluster_apps_node_group" {
  cluster_id = module.cluster.id
  name       = "apps"

  version = local.cluster_version

  instance_template {
    platform_id = "standard-v3"

    network_interface {
      nat                = true
      subnet_ids         = local.subnet_ids
      security_group_ids = [
        module.cluster.main_sg_id,
        module.cluster.public_sg_id,
        module.cluster.apps_sg_id,
      ]
    }

    resources {
      memory        = 8
      cores         = 4
      core_fraction = 100
    }

    boot_disk {
      type = "network-hdd"
      size = 64
    }

    scheduling_policy {
      preemptible = true
    }
  }

  scale_policy {
    auto_scale {
      initial = 0
      max     = 2
      min     = 0
    }
  }

  allocation_policy {
    dynamic location {
      for_each = local.subnets
      content {
        zone = location.value.zone
      }
    }
  }

  node_labels = {
    env    = var.environment
    target = "apps"
  }

  node_taints = [
    "target=apps:NoSchedule"
  ]
}
