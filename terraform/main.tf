terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {
  host = var.host
}

resource "docker_registry_image" "amazen" {
  name          = docker_image.amazen.name
  keep_remotely = true
}

resource "docker_image" "amazen" {
  name = "amazen/amazen"

  build {
    context = path.cwd
  }
}

resource "docker_container" "amazen" {
  image = docker_image.amazen.image_id
  name  = "amazen"

  ports {
    internal = 3000
    external = 80
  }
}
