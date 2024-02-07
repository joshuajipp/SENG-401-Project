terraform {
  cloud {
    organization = "toolshed"

    workspaces {
      name = "itemService"
    }
  }
}
