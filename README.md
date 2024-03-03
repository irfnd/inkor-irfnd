# Next JS + GraphQL

A React JS Problem Interview by Cyber Edu Inkor</br>
created by Irfandi Iqbal Abimanyu

## Cloud Demo

[![Vercel](https://img.shields.io/badge/Vercel-inkor--irfnd.vercel.app-black?style=flat-square)](https://inkor-irfnd.vercel.app/)

## Local Install

- Clone this Repo
  ```bash
  git clone https://github.com/irfnd/inkor-irfnd
  ```
- Install all packages by typing `npm install` or `yarn` or `pnpm i`.
- Rename `.env.example` to `.env`.
- Set the contents of `.env` according to your local conditions.
  ```env
  DATABASE_URL=<your-postgre-uri>
  JWT_SECRET=<your-jwt-secret>
  JWT_EXPIRED=<your-jwt-expired>
  COOKIE_EXPIRED=<your-cookie-expired>
  ```
- Don't forget to push db with `npx prisma db push` or `yarn prisma db push` or `pnpm prisma db push`.
- Start this project `npm run dev` or `yarn dev` or `pnpm dev` for develpment and `npm run build && npm run start` or `yarn build && yarn start` or `pnpm build && pnpm start`
- This project running smoothly.
