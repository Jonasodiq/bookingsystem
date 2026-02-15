# Examensarbete

## Introduktion

- Namn: Jonas
- Klass: MA24 Distans

## Bakgrund

Jag ska bygga ett bokningssystem för en frisörsalong. Idén kommer från att många mindre salonger fortfarande hanterar bokningar via telefon, SMS, Instagram eller liknande, vilket leder till missade bokningar och dubbelbokning. Ett webbaserat bokningssystem löser detta och ger både salongen och kunderna en smidigare upplevelse. Projektet ger mig möjlighet att arbeta med en modern teknikstack och bygga en fullständig produkt med tydliga användarbehov.

## Syfte

Syftet med projektet är att skapa ett webbaserat bokningssystem där kunder enkelt kan boka, ändra och avboka tider online. Systemet ska minska administrationen, förhindra dubbelbokningar och göra bokningsprocessen smidigare för både kunder och personal. Lösningen ska även kunna användas av andra mindre tjänsteföretag där tidsbokning är en viktig del av verksamheten, såsom barberare, nagelterapeuter, massörer, hudterapeuter och personliga tränare.

**Målgrupp:**

- **Kunder** — privatpersoner som vill boka frisörtid snabbt och enkelt via webben/mobilen.
- **Frisörer/personal** — som behöver koll på sitt dagsschema och sina bokningar.
- **Salongsägare (admin)** — som vill hantera tjänster, personal och ha överblick över alla bokningar.

**Behov som löses:**

- Kunder kan se lediga tider och boka dygnet runt utan att behöva kontakta salongen.
- Personal ser sitt schema tydligt och slipper manuell bokningshantering.
- Admin kan hantera hela salongen digitalt — tjänster, priser, öppettider och personal.
- Systemet förhindrar dubbelbokningar automatiskt.

## Mål och planering

Målet är att leverera en fungerande MVP (Minimum Viable Product) av ett bokningssystem med tre användarroller.

### Kravspecifikation (MVP)

**Must have:**

- Registrering och inloggning med rollbaserad åtkomst (admin / personal / kund)
- Admin kan skapa, redigera och ta bort tjänster (namn, pris, tidsåtgång)
- Admin kan hantera personal och öppettider
- Personal kan se sina egna bokningar och sitt dagsschema
- Kunder kan boka tid genom att välja tjänst → personal → datum/tid
- Bokningsbekräftelse visas på skärmen
- Systemet blockerar tider automatiskt baserat på tjänstens längd
- Dubbelbokningsskydd
- Responsiv design (mobilanpassad)

**Should have:**

- Kunder kan avboka eller ändra sin bokning
- Kalendervy för admin/personal
- Personal kan markera sig som ledig/tillgänglig

**Could have (om tid finns):**

- E-postbekräftelse vid bokning
- Dashboard med statistik (antal bokningar per vecka)
- Dark mode

**Won't have (i detta projekt):**

- Betalningsintegration
- SMS-påminnelser
- Flera salonger i samma system

### Tidsplan (6 veckor)

| Vecka | Fokus                                                                                       |
| ----- | ------------------------------------------------------------------------------------------- |
| 1     | Projektsetup: Vite + React, React Router, Firebase Auth, AWS Lambda + DynamoDB, Serverless Framework, GitHub Projects |
| 2     | Adminsida: CRUD för tjänster, hantera personal och öppettider                               |
| 3     | Personalsida: eget schema, se sina bokningar                                                |
| 4     | Kundsida: bokningsflöde (välj tjänst → personal → datum/tid → bekräfta)                     |
| 5     | Kalendervy, dubbelbokningsskydd, responsiv design                                           |
| 6     | Polish, bugfixar, deploy frontend till Netlify + backend till AWS Lambda, förbereda presentation                                |

### Arbetssätt

- **Figma** för wireframes och design av UI (planerat innan utveckling av varje vy)
- **GitHub Projects** för att koppla issues till kod och hålla koll på uppgifter (Kanban-board)
- **Git-strategi:** Main-branch skyddad, feature branches för varje ny funktion, merge via pull requests
- Dagliga commits för kontinuerligt arbete

## Tekniker

| Område            | Teknik                                                             |
| ----------------- | ------------------------------------------------------------------ |
| Frontend          | Vite + React 19                                                    |
| Routing           | React Router v7                                                    |
| Styling           | Tailwind CSS v4                                                    |
| Autentisering     | Firebase Auth (med rollhantering)                                  |
| Backend/API       | AWS Lambda + API Gateway (Serverless Framework)                    |
| Databas           | AWS DynamoDB                                                       |
| Deploy            | Netlify (frontend) + AWS Lambda (backend)                          |
| Versionshantering | Git + GitHub                                                       |

**Motivering:**

- **Vite + React 19** valdes för snabb utvecklingsmiljö med HMR (Hot Module Replacement) och modern build-process. Vite är extremt snabbt och lättarbetat för SPA-utveckling.
- **React Router v7** är den mest använda routing-lösningen för React med stöd för klient-routing, nested routes och modern data-fetch patterns.
- **Firebase Auth** ger färdig autentisering med stöd för email/password, social login och rollhantering via custom claims. Enkel integration med React.
- **AWS Lambda + API Gateway** ger serverless backend utan att behöva hantera servrar. Betal-per-användning och automatisk skalning. Serverless Framework förenklar deployment och infrastrukturhantering.
- **AWS DynamoDB** är en snabb NoSQL-databas med flexibelt schema, perfekt för bokningssystem. Generell gratistier och pay-per-request pricing.
- **Tailwind CSS v4** ger snabb och konsekvent styling med utility-first approach. Ny CSS-baserad konfiguration gör setup enklare.
- **Netlify** är perfekt för att deploya Vite-appar med automatisk CI/CD, gratis HTTPS och global CDN.
- **Vercel** är skapat av samma team som Next.js och ger den smidigaste deploy-upplevelsen med stöd för miljövariabler och automatisk CI/CD vid push.
