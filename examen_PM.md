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
| 1     | Projektsetup: Next.js 16, MongoDB Atlas, Mongoose-scheman, auth med roller, GitHub Projects |
| 2     | Adminsida: CRUD för tjänster, hantera personal och öppettider                               |
| 3     | Personalsida: eget schema, se sina bokningar                                                |
| 4     | Kundsida: bokningsflöde (välj tjänst → personal → datum/tid → bekräfta)                     |
| 5     | Kalendervy, dubbelbokningsskydd, responsiv design                                           |
| 6     | Polish, bugfixar, deploy till Vercel, förbereda presentation                                |

### Arbetssätt

- **Figma** för wireframes och design av UI (planerat innan utveckling av varje vy)
- **GitHub Projects** för att koppla issues till kod och hålla koll på uppgifter (Kanban-board)
- **Git-strategi:** Main-branch skyddad, feature branches för varje ny funktion, merge via pull requests
- Dagliga commits för kontinuerligt arbete

## Tekniker

| Område            | Teknik                                                             |
| ----------------- | ------------------------------------------------------------------ |
| Frontend          | Next.js 16 (App Router)                                            |
| Styling           | Tailwind CSS + shadcn/ui (komponentbibliotek, installeras via CLI) |
| Autentisering     | Auth.js / next-auth v5 (med rollhantering)                         |
| Backend/API       | Next.js Route Handlers (app/api/)                                  |
| Databas           | MongoDB Atlas (via Mongoose)                                       |
| Deploy            | Vercel                                                             |
| Versionshantering | Git + GitHub                                                       |

**Motivering:**

- **Next.js 16** valdes för att det är det ledande React-ramverket med inbyggd routing, SSR och Route Handlers (API) — perfekt för en fullstack-app i ett projekt. App Router ger modern React-arkitektur med server- och klientkomponenter.
- **Auth.js (next-auth v5)** valdes för smidig autentisering med inbyggt stöd för Next.js App Router och rollhantering via sessions/JWT.
- **MongoDB Atlas** valdes för att det är en flexibel NoSQL-databas som körs i molnet (på AWS-infrastruktur) med generös gratistier. Mongoose används som ODM (Object Data Modeling) för att definiera tydliga scheman för bokningar, kunder, tjänster och personal.
- **Tailwind CSS + shadcn/ui** ger snabb och konsekvent styling utan att behöva bygga alla komponenter från grunden. shadcn/ui installeras via CLI (`npx shadcn@latest init`) och ger tillgång till tillgängliga, anpassningsbara React-komponenter.
- **Vercel** är skapat av samma team som Next.js och ger den smidigaste deploy-upplevelsen med stöd för miljövariabler och automatisk CI/CD vid push.
