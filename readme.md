# Mechanico

> Find car repair videos on YouTube

This app uses Node.js/Express/MongoDB with Google OAuth for authentication

## Usage

Add your mongoDB URI, Google OAuth, and YouTube API credentials to the config.env file

```
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start
```

## Local Setup

Add your mongoDB URI and Google OAuth credentials to the config.env file.

Then run:
```
make run-local
```

This will use docker-compose to build the application into a docker image and then run it alongside a Mongo DB container.

## Terraform

The terraform configuration provisions:
- GCP Compute Engine Virtual Machine
- Atlas MongoDB Cluster
- Cloudflare DNS "A" Record

Using the terraform config requires:
1) Creating a GCP project (+ service account key for TF to use)
2) Creating an Atlas project (+ API key for TF to use)
3) Creating a Cloudflare account (+ API token for TF to use)

## Github Action

`.github/workflows/build-push-deploy.yaml` contains a workflow which deploys to a staging environment on pushes to the `master` branch and to a production environment on pushes of tags of the form `v#.#.#`.