# Oplysninger, der mangler fra ejeren

Alt indhold, der byggede på oplysninger, ingen kunne bekræfte, er fjernet fra
siden i stedet for at stå som `[Indsæt …]`. Listen herunder er det, der skal
til, før de tilhørende afsnit kan sættes tilbage. Intet af det er gættet eller
udfyldt på må og få — felterne står tomme, indtil du selv skriver dem.

Alle felter i **fed** findes i `site-config.js`. Udfylder du dem, dukker
indholdet automatisk op på siden igen. De øvrige punkter kræver, at teksten
skrives ind i den nævnte fil.

---

## 1. Kontakt — blokerer, at formularen kan sende (P0)

Kontaktformularen samler brugerens svar, men har i dag ingen modtager. Uden én
af de to nedenstående kan en henvendelse ikke nå frem, og siden lover derfor
heller ikke, at den gør det.

| Felt | Hvad | Hvorfor |
|---|---|---|
| **`contact.formEndpoint`** | HTTPS-endpoint, der tager imod formularen som JSON (POST) og svarer 2xx | Foretrukken løsning. Siden venter på 2xx, før den melder "sendt", og viser fejl + prøv igen ved alt andet. |
| **`contact.email`** | Verificeret modtageradresse | Fallback. Åbner brugerens egen mailklient med svarene udfyldt. |

Vælges et endpoint, skal der foreligge en databehandleraftale, og
leverandøren skal skrives ind i `legal.processors`, før det tages i brug.

Øvrige kontaktfelter (valgfri, men de tilhørende linjer er skjult indtil de er
udfyldt): **`contact.phone`** + **`contact.phoneLabel`**, **`contact.area`**
(by eller online-dækning), **`contact.responseTime`** (forventet svartid).

## 2. Juridiske stamoplysninger (P1 — privatlivspolitik og footer)

**`legal.companyName`**, **`legal.cvr`**, **`legal.address`**,
**`legal.retention`** (opbevaringsperiode), **`legal.processors`**
(it-leverandører, der behandler personoplysninger),
**`legal.extraLegalBasis`** (yderligere behandlingsgrundlag ud over samtykke
og aftale, hvis der er nogen).

Privatlivspolitikken beskriver i dag kun det, der faktisk kan aflæses af
koden: hvilke felter formularen indsamler, at siden ikke sætter cookies eller
måler trafik, og at alle skrifter, scripts og billeder hostes fra samme
domæne. Afsnittet "Dataansvarlig" er ufuldstændigt, indtil felterne ovenfor er
udfyldt, og politikken bør gennemgås juridisk, før siden markedsføres.

## 3. Faglige kvalifikationer (P1 — `om-mike.dc.html`, `index.html`)

Følgende stod som pladsholdere og er fjernet:

- Uddannelse og årstal, uddannelsessted
- Eksamen/kursusrække inden for muskuloskeletal fysioterapi
- Hvor der er arbejdet, og med hvem
- Certificeringer eller efteruddannelse i træning
- Egen træningsbaggrund
- Personlig introduktion på Om Mike

Titlen **"eksamineret muskuloskeletal fysioterapeut"** er samtidig dæmpet til
"fysioterapeut og online coach" alle steder, indtil der findes dokumentation.
Send: nøjagtig titel, institution + år, samt link til
autorisationsregistret (Styrelsen for Patientsikkerheds autorisationsregister),
så kan titlen sættes tilbage og markeres op i JSON-LD.

**Bemærk:** brandportrættet `assets/mike-brand-portrait.webp` har teksten
"MUSKULOSKELETAL FYSIOTERAPEUT" trykt ind i selve billedet. Den kunne ikke
rettes i koden. Enten skal dokumentationen frem, eller også skal billedet
laves om.

## 4. Anmeldelser og forløbseksempler (P1 — `ReviewCarousel.dc.html`, `resultater.dc.html`)

Fem anmeldelser og tre forløbseksempler var skrevet som eksempeltekst, men
fremstod som ægte kundeudsagn. De er fjernet.

Før noget af det kan publiceres igen, skal der for hvert udsagn foreligge:

1. Den oprindelige ordlyd, som personen selv skrev den
2. Hvor meget identitet personen har sagt ja til (fuldt navn, fornavn, anonym)
3. Dateret, skriftligt samtykke til offentliggørelse

Der er bevidst ikke lagt `Review`- eller `AggregateRating`-schema på siden.
Det må først tilføjes, når ovenstående er dokumenteret.

## 5. Fagligt indhold og kilder (P1 — `viden.dc.html`, `smerter-genoptraening.dc.html`)

Siderne har nu forfatterangivelse og dato for seneste opdatering, men mangler:

- Navn og titel på den, der har fagligt gennemgået teksterne (hvis det ikke er
  Mike selv)
- De primære kilder/retningslinjer, indholdet bygger på, så de kan linkes

Kilder er ikke opfundet. Send referencerne, så tilføjes de synligt og i
`citation` i JSON-LD.

## 6. Ydelser og priser (P2 — `online-coaching.dc.html`, `forloeb.dc.html`)

- Hvad et online coaching-forløb konkret indeholder
- Hvilken platform der bruges
- Pris eller prisinterval
- Om den indledende samtale er gratis, og hvor lang den er

Teksten siger i dag, at rammerne aftales i samtalen, hvilket er korrekt, men
ikke særlig hjælpsomt for den, der skal vælge.

## 7. Emner på Viden-siden (P3 — `viden.dc.html`)

Tre "kommende emner"-felter stod tomme og er fjernet. Skriv de emner, der rent
faktisk er planlagt, hvis afsnittet skal tilbage.

## 8. Domæne og crawler-politik (P2)

- **Foretrukket domæne.** Canonical peger i dag på
  `https://lassebrandtchr.github.io/Mike-Adelholm-ny-hjemmeside/`. Skiftes der
  til eget domæne, skal `SITE_ORIGIN` i `tools/build-meta.py` rettes og
  scriptet køres igen, så canonical, Open Graph og `sitemap.xml` følger med.
- **robots.txt ligger ikke på origin-roden.** Crawlere læser
  `https://lassebrandtchr.github.io/robots.txt`, som hører til
  brugerens `lassebrandtchr.github.io`-repo — ikke til dette projekt.
  Filen her (`/Mike-Adelholm-ny-hjemmeside/robots.txt`) bliver derfor ikke
  læst, så længe siden ligger på en projekt-URL. `sitemap.xml` kan indsendes
  direkte i Google Search Console i mellemtiden, og `<meta name="robots">` på
  hver side virker uanset hvad. Løsningen er enten et eget domæne eller at
  kopiere indholdet til roden af `lassebrandtchr.github.io`.
- **AI-træningscrawlere.** `robots.txt` tillader i dag alle crawlere,
  inklusive søge-agenter som Googlebot, OAI-SearchBot, Claude-SearchBot og
  PerplexityBot. Ønskes træningsdata frameldt (GPTBot, ClaudeBot,
  Google-Extended), skal det vælges aktivt — de tre linjer ligger
  udkommenterede i filen.
