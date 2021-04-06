terraform {
  backend "gcs" {
    bucket = "devops-tutorial-309521-terraform"
    prefix = "/state/mechanico"
  }
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 2.0"
    }
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 0.6"
    }
  }
}