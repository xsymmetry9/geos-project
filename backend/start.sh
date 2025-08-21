#!/bin/bash

set -e # Exit on error

# Generate Prisma client code
npx prisma generate

# Sync schema to Neon (safe and idempotent)
npx prisma db push

# Start your Express app
node src/server.js
