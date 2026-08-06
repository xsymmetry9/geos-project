# GEOS Cloudinary & Deployment Summary

Session notes for Cloudinary save-to-cloud work, deployment, and paused LINE exploration.

**Date:** 2026-08-06  
**Live app:** [https://main.geos-project.pages.dev/](https://main.geos-project.pages.dev/)  
**Backup / alternate:** [https://geos-frontend-woad.vercel.app/](https://geos-frontend-woad.vercel.app/)

---

## What we built

### Save to Cloud (Cloudinary)
- Separate **Save to Cloud** button on:
  - SPR: `/spr/view/:id`
  - Level check: `/levelCheck/preview/:id`
- **Extract** still downloads a local PDF only.
- After upload, a dialog shows the Cloudinary link with **Copy**.

### Folders
| Document | Cloudinary folder |
|----------|-------------------|
| Student Progress Report | `SPR` |
| Level Check | `level_check` |

### File naming
Format:

`teacher-student-type-yyyy-MM-dd-HH:mm`

Examples:
- `Alice-Bob-spr-2026-08-06-17:53`
- `Alice-Bob-level_check-2026-08-06-17:53`

### Persisted link on records
- Added `cloudUrl` to SPR (`Student`) and level check entries.
- On successful upload, `secure_url` is saved into `localStorage` (`GEOS_app`).
- Homepage tables (SPR + Level Check) have a **Link** column:
  - Shows **click here** if `cloudUrl` exists
  - Blank if not
- Form edits preserve an existing `cloudUrl` so it is not wiped.

### Key files
| File | Purpose |
|------|---------|
| `src/utils/cloudinaryUpload.ts` | Unsigned upload to Cloudinary |
| `src/utils/buildDocumentPdf.ts` | Shared html2canvas → PDF builder |
| `src/utils/buildSprFileName.ts` | Shared document file naming |
| `src/utils/functions.ts` | `saveCloudUrlToRecord(...)` |
| `src/components/CloudSaveControl.tsx` | Save to Cloud button |
| `src/components/CloudLinkDialog.tsx` | Copy-link dialog |
| `src/components/SaveControl.tsx` | Local Extract only |
| `frontend/public/_redirects` | Cloudflare Pages SPA routing |
| `frontend/vercel.json` | Vercel SPA rewrites (`/home` 404 fix) |

---

## Environment variables

### Frontend (Vite) — safe to expose
Local: `frontend/.env` (gitignored)

```env
VITE_CLOUDINARY_CLOUD_NAME=daaunyyqs
VITE_CLOUDINARY_UPLOAD_PRESET=teacher_documents
```

Must also be set on **each** host (values baked in at **build** time):

- Cloudflare Pages → Settings → Environment variables → redeploy  
- Vercel → Project → Environment Variables → redeploy  

### Do not put in Vite
- `CLOUDINARY_API_SECRET`
- Full `CLOUDINARY_URL` (contains secret)

Unsigned uploads use only cloud name + upload preset.

### Cloudinary console setup
- Unsigned upload preset: `teacher_documents`
- Signing mode: **Unsigned**
- Asset folder on preset: leave empty (code sets folder per document)
- Free accounts: enable PDF delivery under **Settings → Security** (PDF/ZIP restriction off), or links return blocked/error

---

## Deployment notes

| Host | URL | Notes |
|------|-----|--------|
| Cloudflare Pages (primary) | https://main.geos-project.pages.dev/ | Share root URL; `/` redirects into the app |
| Vercel (alternate) | https://geos-frontend-woad.vercel.app/ | Needed `vercel.json` so `/home` and deep links work |

Env vars are **not shared** between Cloudflare and Vercel. Add `VITE_*` on both if both should support Save to Cloud.

---

## Security notes (Cloudinary links)

- Default delivery URLs are **public**: anyone with the link can open the PDF (after PDF delivery is allowed).
- Other teachers can open the same link; they do not need a Cloudinary login.
- Protection today is mostly unguessable public IDs + only sharing via the app.

---

## LINE integration — paused

### Goal discussed
After Cloudinary save, send the link to a **LINE group**.

### Do you need a backend?
**Yes, for LINE group push** — but not necessarily Express.

Safe options:
1. **Cloudflare Worker / Pages Function** or **Vercel Function**
2. **Google Apps Script (+ optional Sheet)** as a lightweight backend

Reason: LINE **channel access token** must never ship in the browser (`VITE_*`).

### Suggested flow (not implemented)
1. Browser uploads PDF → Cloudinary → `secure_url`
2. Browser calls secure endpoint (`/api/send-to-line` or Apps Script web app)
3. Endpoint uses Messaging API to push text/link to the group

### Apps Script option
Viable for this project:
- Hold LINE token in Script Properties
- Optional Sheet log of uploads
- `doPost` from Vite after cloud save  

Tradeoffs: quotas, slower cold starts; good if you also want spreadsheet storage.

### LINE Developers checklist (when resuming)
1. LINE Developers provider + **Messaging API** channel  
2. Issue long-lived **channel access token**  
3. Add the bot to the target **LINE group**  
4. Capture **group ID** (webhook / invite event)  
5. Store `LINE_CHANNEL_ACCESS_TOKEN` + `LINE_GROUP_ID` on the serverless/Apps Script side only  

---

## Status

| Item | Status |
|------|--------|
| Cloudinary upload + folders + naming | Done |
| Copy-link dialog | Done |
| Homepage link column + `cloudUrl` | Done |
| Cloudflare as live URL | Done |
| Vercel `/home` SPA fix | Done |
| LINE group notify | **Paused** — needs secure endpoint |

---

## Resume later

1. Choose backend: Cloudflare Function vs Apps Script.  
2. Create LINE Messaging API channel + add bot to group.  
3. Implement notify call from `CloudSaveControl` after successful upload.  
4. Keep LINE secrets off the Vite client.
