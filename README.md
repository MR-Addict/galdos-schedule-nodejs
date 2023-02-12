# Nodejs Scheduled Tasks

## Deploy

Add .env:

```text
REDIS_URL="Redis url"
EMAILPASS="Email password"
SERVER_CHAN_KEY="Server chan key"
GLADOS_COOKIE="Glados account cookie"
TELEGRAM_BOT_TOKEN="Telegram bot token"
```

Build docker:

```bash
docker-compose build
```

Start docker:

```bash
docker-compose up -d
```
