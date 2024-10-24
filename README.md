## Description

Small bot to check how Nest+Prisma is working together

## How to setup?

- Install all pages

```
npm install
```

- Up the DB
```
docker-compose up
```

- Setup prisma
```
npx prisma generate && npx prisma db push

```

- Start Prisma
```
npx prisma studio
```

- Create you .env files with config at src/config/env

- Run the Bot
```
nest start --watch
```

## License

Nest is [MIT licensed](LICENSE).
