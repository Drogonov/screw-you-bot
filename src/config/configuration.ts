export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3001,
    jwt: {
        secret: process.env.JWT_SECRET
    },
    db: {
        DATABASE_URL: process.env.DATABASE_URL,
    },
    telegram: {
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
        TOKEN: process.env.TOKEN

    }
});