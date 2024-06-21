#!/bin/bash

npm install
npx prisma migrate dev --name init
npx prisma migrate deploy
npm run build
npm run start:dev
