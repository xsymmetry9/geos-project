## GEOS App

GEOS App is designed for a language school that needs to complete forms and print them out. It also includes a small database to help teachers stay organized. Users can create, update, and delete files efficiently.

### Live Demo

You can access the app here: [https://main.geos-project.pages.dev/](https://main.geos-project.pages.dev/)

The root URL redirects into the app automatically (no `/home` needed in the shared link).

## Tech Stack

- **Frontend**: React, Typescript
- **Routing**: React Router
- **Styling**: CSS, Tailwindcss
- **Deployment**: Cloudflare Pages
- **Media**: Cloudinary (Save to Cloud)

## Installation

To run the project locally, follow these steps:

```
cd frontend
npm install
npm run dev
```

Copy `frontend/.env` with:

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

For Cloudflare Pages, add the same `VITE_*` variables in **Settings → Environment variables**, then redeploy.

## Features

1. Displays data using a **radar chart** powered by Chart.js.
2. Allows students to print forms **on desktop** (printing on mobile is not recommended).
3. Enables users to **download data** as an **Excel file.**
4. Supports **data uploads** to the app.
5. Saves SPR / level check PDFs to Cloudinary and stores shareable links.
