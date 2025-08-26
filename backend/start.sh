#!/bin/bash

set -e # Exit on error

export PATH="./node_modules/.bin:$PATH"
# Generate Prisma client code
npx prisma generate
prisma db push 

# Start your Express app
node src/server.js
