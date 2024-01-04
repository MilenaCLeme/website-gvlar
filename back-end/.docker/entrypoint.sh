#!/bin/bash

npm install
npx prisma migrate dev --name init
npm run build
npm run start:dev
