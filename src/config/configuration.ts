export const configuration = () => ({
    env: process.env.NODE_ENV,
    db: {
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        name: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_DB_PORT,
        url: process.env.DATABASE_URL,

    },
    app: {
        port: process.env.APP_PORT,
        telegramToken: process.env.TELEGRAM_BOT_TOKEN
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    external: {
        port: process.env.SERVER_PORT
    }
});