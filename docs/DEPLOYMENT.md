# Deployment & Publishing

This repository includes GitHub Actions workflows which build and publish Docker images to GitHub Container Registry (GHCR) on pushes to `main` and on manual dispatch.

## Workflow Files

- `.github/workflows/publish-image.yml` - Builds the **server** image
- `.github/workflows/publish-client.yml` - Builds the **client** (frontend) image

## Published Images

After workflow runs, images are available at:

- **Server**: `ghcr.io/<OWNER>/s3-spider2-server:latest`
- **Client**: `ghcr.io/<OWNER>/s3-spider2-client:latest`

## Railway.app Deployment

### Option A — Deploy from Repository (Recommended)

1. In Railway, create a new project and choose **"Deploy from GitHub"**
2. Connect this repository
3. For **server**: Set Root Directory to `server` or Dockerfile path to `server/Dockerfile`
4. For **client**: Set Root Directory to `client` or Dockerfile path to `client/Dockerfile`
5. Add required environment variables (see `server/sample.env`)
6. Railway will build and deploy automatically

### Option B — Use Published GHCR Images

1. In Railway, create a new service and choose **"Deploy from Image"**
2. Use image URL: `ghcr.io/<OWNER>/s3-spider2-server:latest`
3. If authentication is required, create a GitHub PAT with `read:packages` scope

## Required Environment Variables (Server)

| Variable                      | Description                           |
| ----------------------------- | ------------------------------------- |
| `S3XPLORER_ADMIN`             | Admin username/email                  |
| `S3XPLORER_ADMIN_PASS`        | Admin password (min 8 chars)          |
| `JWT_SECRET`                  | Secret for JWT signing (min 32 chars) |
| `DB_HOST`                     | PostgreSQL host                       |
| `DB_PORT`                     | PostgreSQL port                       |
| `DB_NAME`                     | Database name                         |
| `DB_USER`                     | Database user                         |
| `DB_PASS`                     | Database password                     |
| `FRONTEND_CLIENT`             | Frontend URL for CORS                 |
| `AWS_CLIENT_ID_<ACCOUNT>`     | AWS access key for account            |
| `AWS_CLIENT_SECRET_<ACCOUNT>` | AWS secret for account                |
| `AWS_CLIENT_REGION_<ACCOUNT>` | AWS regions (comma-separated)         |

### Optional Variables

| Variable        | Description                     |
| --------------- | ------------------------------- |
| `CACHE_ENABLED` | Enable Redis cache (true/false) |
| `CACHE_HOST`    | Redis host                      |
| `CACHE_PORT`    | Redis port                      |
| `CACHE_USER`    | Redis username                  |
| `CACHE_PASS`    | Redis password                  |

## Security Features

The Docker images include several security hardening measures:

- **Non-root user**: Server runs as `nodejs` user (UID 1001)
- **Healthchecks**: Built-in container healthchecks for orchestration
- **Security headers**: Helmet middleware with CSP, X-Frame-Options, etc.
- **Rate limiting**: 100 requests/15min general, 10 attempts/15min for auth
- **Strong secrets**: JWT_SECRET must be 32+ characters

## Generate a Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Manual Workflow Trigger

Go to GitHub → Actions → Select workflow → **"Run workflow"**
