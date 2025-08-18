## GEOS App

This is app is made for a language school that needs to complete forms and have them printed out. It also has a small database that makes teacher stay organize. It can create, update, and delete files.

App can be view here.![https://main.geos-project.pages.dev/']

## Tech Stack

- **Frontend**: React, Typescript
- **Routing**: React Router
- **Styling**: CSS, Tailwindcss
- **Deployment**: Cloudfare

## Setup for Backend

### For development
```
cp .env.development .env
npx prisma generate
npx prisma db push
```

### For production
```
cp .env.production .env
npx prisma generate
npx prisma db push
```