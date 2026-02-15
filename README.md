# Bokningssystem — Frisörsalong

Ett webbaserat bokningssystem för frisörsalonger (och andra tjänsteföretag) där kunder kan boka, ändra och avboka tider online. Systemet har tre roller: **kund**, **personal** och **admin**.

## Teknikstack

| Område | Teknik |
|---|---|
| Frontend | Vite + React 19 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Autentisering | Firebase Auth |
| Backend/API | AWS Lambda + API Gateway |
| Databas | AWS DynamoDB |
| Deploy | Netlify (frontend) + AWS Lambda (backend) |

## Kom igång

### Frontend

```bash
# Installera dependencies
npm install

# Starta utvecklingsservern
npm run dev
```

Öppna [http://localhost:5173](http://localhost:5173) i din webbläsare.

### Backend (Serverless Framework)

```bash
# Installera Serverless Framework globalt (om inte redan installerat)
npm install -g serverless

# Deploya Lambda-funktioner till AWS
npx serverless deploy

# Kör lokalt (för testning)
npx serverless offline
```

## Projektstruktur

```
├── backend/
│   └── handlers/       # Lambda-funktioner (bookings, services, users)
├── src/
│   ├── App.jsx         # Root-komponent
│   ├── main.jsx        # Entry point
│   ├── config/         # Firebase + AWS-konfiguration
│   ├── components/     # Återanvändbara komponenter
│   ├── pages/          # Sidor (routes)
│   └── utils/          # Hjälpfunktioner
├── serverless.yml      # Serverless Framework-konfiguration
└── vite.config.js      # Vite-konfiguration
```

## Miljövariabler

Skapa en `.env.local`-fil i roten:

```env
# Firebase
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# AWS
VITE_AWS_REGION=eu-north-1
VITE_AWS_API_GATEWAY_URL=https://your-api-id.execute-api.eu-north-1.amazonaws.com/prod
```

Se [.env.example](.env.example) för mall.

## Scripts

```bash
npm run dev          # Starta utvecklingsservern (Vite)
npm run build        # Bygg för produktion
npm run preview      # Förhandsgranska produktionsbygget
npm run lint         # Kör ESLint
```

## Deploy

### Frontend (Netlify)

1. Koppla GitHub-repo till Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Lägg till miljövariabler i Netlify Dashboard

### Backend (AWS Lambda)

```bash
npx serverless deploy --stage prod
```

## Examensarbete

Se [examen_PM.md](examen_PM.md) för fullständig projektbeskrivning, kravspecifikation och tidsplan.
