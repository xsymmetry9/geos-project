## GEOS App

GEOS App is designed for a language school that needs to complete forms and print them out. It also includes a small database to help teachers stay organized. Users can create, update, and delete files efficiently.

### Live Demo

You can access the app here:![https://main.geos-project.pages.dev/']

## Tech Stack

- **Frontend**: React, Typescript
- **Routing**: React Router
- **Styling**: CSS, Tailwindcss
- **Deployment**: Cloudfare

## Installation

To run the project locally, follow these steps:

```
touch .env .env.development .env.production
```

Add .env file and add the following:

```
DATABASE_URL="postgresql://username:password@localhost:5432/db_name"
JWT_SESSION="[Secret word]"
PORT=[Port number]
```


``` 
cd frontend
npm install
npm run dev

```


## Features
1. Displays data using a **radar chart** powered by Chart.js.
2. Allows students to print forms **on desktop** (printing on mobile is not recommended).
3. Enables users to **download data** as an **Excel file.**
4. Supports **data uploads** to the app.