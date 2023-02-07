# Nodejs Scheduled Tasks

## Deploy

Add .env:

```text
EMAILFROM="Emial address"
EMAILPASS="Email password"
GLADOS_COOKIE="Glados account cookie"
```

Build docker:

```bash
docker build -t scheduled-tasks .
```

Start docker:

```bash
docker-compose up -d
```
