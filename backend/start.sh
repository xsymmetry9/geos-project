#!/bin/bash

set -e # Exit on error

export PATH="./node_modules/.bin:$PATH"
# Generate Prisma client code
npx prisma generate
npm run migrate:deploy

# Start your Express app
node src/server.js
