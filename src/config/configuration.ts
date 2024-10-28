export const configuration = () => ({
    env: process.env.NODE_ENV,
    db: {
        url: process.env.DATABASE_URL,
    },
    app: {
        port: process.env.APP_PORT,
        telegramToken: process.env.TELEGRAM_BOT_TOKEN
    }
});