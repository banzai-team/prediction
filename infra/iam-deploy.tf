resource "yandex_iam_service_account" "frontend-deployer" {
  name        = "svc-frontend-deployer"
  description = "service account to deploy frontend"
}

resource "yandex_resourcemanager_folder_iam_member" "frontend-deployer-storage" {
  folder_id          = var.folder_id
  role               = "storage.editor"
  member             = "serviceAccount:${yandex_iam_service_account.frontend-deployer.id}"
}
