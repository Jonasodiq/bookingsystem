# Bokningssystem — Frisörsalong

Ett webbaserat bokningssystem för frisörsalonger (och andra tjänsteföretag) där kunder kan boka, ändra och avboka tider online. Systemet har tre roller: **kund**, **personal** och **admin**.

## Teknikstack

| Område        | Teknik                   |
| ------------- | ------------------------ |
| Frontend      | Next.js 16 (App Router)  |
| Styling       | Tailwind CSS + shadcn/ui |
| Autentisering | Auth.js / next-auth v5   |
| Backend/API   | Next.js Route Handlers   |
| Databas       | MongoDB Atlas (Mongoose) |
| Deploy        | Vercel                   |

## Kom igång

```bash
# Installera beroenden
npm install

# Starta utvecklingsservern
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

## Projektstruktur

```
src/
├── app/            # Next.js App Router (sidor, layouts, API-routes)
│   ├── api/        # Route Handlers (backend-API)
│   └── ...         # Sidor och layouts
├── components/     # Återanvändbara React-komponenter (shadcn/ui)
└── lib/            # Hjälpfunktioner, databasanslutning, utils
```

## Miljövariabler

Skapa en `.env.local`-fil i roten:

```env
MONGODB_URI=din_mongodb_atlas_uri
NEXTAUTH_SECRET=din_hemliga_nyckel
NEXTAUTH_URL=http://localhost:3000
```

## Examensarbete

Se [examen_PM.md](examen_PM.md) för fullständig projektbeskrivning, kravspecifikation och tidsplan.
