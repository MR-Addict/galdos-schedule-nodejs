# Nodejs Scheduled Tasks

## 1. Link

- [https://schedule.mraddict.one](https://schedule.mraddict.one)

## 2. Deploy

Add .env:

```text
MONGODB_URL="Mongodb url"
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
