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

  labels {
    label = "traefik.enable"
    value = "true"
  }

  labels {
    label = "traefik.http.routers.amazen.service"
    value = "amazen"
  }

  labels {
    label = "traefik.http.services.amazen.loadbalancer.server.port"
    value = "3000"
  }

  labels {
    label = "traefik.http.routers.amazen.entrypoints"
    value = "web, websecure"
  }

  labels {
    label = "traefik.http.routers.amazen.rule"
    value = "Host(`amazen.fr`)"
  }
  labels {
    label = "traefik.http.routers.amazen.tls"
    value = "true"
  }

  labels {
    label = "traefik.http.routers.amazen.tls.certresolver"
    value = "production"
  }
}
