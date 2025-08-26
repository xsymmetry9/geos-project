# Generate Prisma client code
npm run generate

# Sync schema to Neon (safe and idempotent)
npm run migrate:deploy

# Start your Express app
node src/server.js