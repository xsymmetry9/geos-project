#!/bin/bash

set -e # Exit on error

export PATH="./node_modules/.bin:$PATH"
# Generate Prisma client code
npx prisma generate
npm run migrate:deploy

# Sync schema to Neon (safe and idempotent)
npx prisma db push

# Start your Express app
node src/server.js
