# Oplysninger, der mangler fra ejeren

Siden viser kun det, der kan bekræftes. Der står ingen `[Indsæt …]`-tekst
nogen steder, og felter uden data vises slet ikke frem for at stå tomme.

Alle felter i **fed** findes i `site-config.js`. Udfylder du dem, dukker
indholdet automatisk op på siden. De øvrige punkter kræver, at teksten skrives
ind i den nævnte fil.

---

## ✅ På plads

- **Kontaktadresse:** `ma@emcare.dk`. Kontaktformularen samler brugerens svar,
  kopierer dem til udklipsholderen og åbner en mail til Mike. Der ligger
  hverken navn, e-mail eller helbredsoplysninger i webadressen.
- **Kvalifikationer:** fysioterapeut 2018, muskuloskeletal fysioterapeut,
  seks år på landsholdet i boksning, styrkeløft og strongman, genoptræning på
  alle niveauer. Vist på forsiden og på Om Mike.
- **Priser:** takster med og uden lægehenvisning samt tillæg for
  programmering. Står på `forloeb.dc.html#priser` og er markeret op som
  `Offer` i JSON-LD, så de kan læses maskinelt.
- **EmCare Sundhed:** logo og samarbejde nævnt på forsiden og i sidefoden.

---

## 1. Juridiske stamoplysninger (P1 — privatlivspolitik og sidefod)

**`legal.companyName`**, **`legal.cvr`**, **`legal.address`**,
**`legal.retention`** (opbevaringsperiode), **`legal.processors`**
(it-leverandører, der behandler personoplysninger — hvis EmCare Sundhed
behandler patientoplysninger, hører de til her),
**`legal.extraLegalBasis`** (yderligere behandlingsgrundlag ud over samtykke
og aftale, fx journalføringspligt).

Privatlivspolitikken beskriver i dag kun det, der faktisk kan aflæses af
koden: hvilke felter formularen har, at siden ikke sætter cookies eller måler
trafik, og at alt hostes fra samme domæne. Afsnittet "Dataansvarlig" er
ufuldstændigt, indtil felterne ovenfor er udfyldt, og politikken bør gennemgås
juridisk, før siden markedsføres.

## 2. Sikker formularaflevering (P2 — valgfrit, men bedre)

**`contact.formEndpoint`** — et HTTPS-endepunkt, der tager imod formularen som
JSON og svarer 2xx. Sættes det, sendes henvendelsen direkte fra siden, siden
venter på kvittering, og der kommer et felt til at beskrive symptomer, som i
dag med vilje er udeladt (fritekst om helbred må ikke gå gennem en mailto).
Kræver databehandleraftale, og leverandøren skal skrives ind i
`legal.processors`.

Øvrige kontaktfelter, hvis de ønskes vist: **`contact.phone`** +
**`contact.phoneLabel`**, **`contact.area`** (by eller online-dækning),
**`contact.responseTime`** (forventet svartid).

## 3. Autorisation (P2 — `om-mike.dc.html`)

Titlerne står nu på siden efter ejerens oplysning. Et link til Styrelsen for
Patientsikkerheds autorisationsregister ville gøre dem efterprøvelige for
besøgende og for søgemaskiner. Send autorisations-ID, så tilføjes det.

## 4. Anmeldelser og forløbseksempler (P1 — `site-config.js`, `resultater.dc.html`)

Fem anmeldelser og tre forløbseksempler var skrevet som eksempeltekst, men
fremstod som ægte kundeudsagn. De er fjernet.

Før noget af det kan publiceres, skal der for hvert udsagn foreligge:

1. Den oprindelige ordlyd, som personen selv skrev den
2. Hvor meget identitet personen har sagt ja til (fuldt navn, fornavn, anonym)
3. Dateret, skriftligt samtykke til offentliggørelse

Læg dem i **`reviews`** i `site-config.js` — feltet `consentDate` er ikke
pynt: en post uden dato bliver filtreret fra og vist slet ikke.

Der er bevidst ikke lagt `Review`- eller `AggregateRating`-schema på siden.
Det må først tilføjes, når ovenstående kan dokumenteres.

## 5. Kilder til det faglige indhold (P2 — `viden.dc.html`, `smerter-genoptraening.dc.html`)

Siderne har forfatterangivelse og dato for seneste gennemgang. Der mangler:

- Navn og titel på den, der har fagligt gennemgået teksterne, hvis det ikke er
  Mike selv
- De primære kilder eller retningslinjer, indholdet bygger på

Kilder er ikke opfundet. Send referencerne, så tilføjes de synligt og som
`citation` i JSON-LD.

## 6. Online coaching-forløbet (P2 — `online-coaching.dc.html`)

Taksterne for videokonsultation står nu på siden, men der mangler:

- Hvad et coaching-forløb konkret indeholder ud over konsultationerne
- Hvilken platform der bruges til programmet og kommunikationen

## 7. Emner på Viden-siden (P3 — `viden.dc.html`)

Tre "kommende emner"-felter stod tomme og er fjernet. Skriv de emner, der rent
faktisk er planlagt, hvis afsnittet skal tilbage.

## 8. Domæne og crawler-politik (P2)

- **Foretrukket domæne.** Canonical peger i dag på
  `https://lassebrandtchr.github.io/Mike-Adelholm-ny-hjemmeside/`. Skiftes der
  til eget domæne, skal `SITE_ORIGIN` i `tools/build-meta.py` rettes og
  `npm run build` køres, så canonical, Open Graph og `sitemap.xml` følger med.
- **robots.txt ligger ikke på origin-roden.** Crawlere læser
  `https://lassebrandtchr.github.io/robots.txt`, som hører til brugerens
  `lassebrandtchr.github.io`-repo — ikke til dette projekt. Filen her bliver
  derfor ikke læst, så længe siden ligger på en projekt-URL. `sitemap.xml` kan
  indsendes direkte i Google Search Console i mellemtiden, og
  `<meta name="robots">` på hver side virker uanset hvad.
- **AI-træningscrawlere.** `robots.txt` tillader i dag alle crawlere,
  inklusive søge-agenter som Googlebot, OAI-SearchBot, Claude-SearchBot og
  PerplexityBot. Ønskes træningsdata frameldt (GPTBot, ClaudeBot,
  Google-Extended), skal det vælges aktivt — de tre linjer ligger
  udkommenterede i filen.

## 9. EmCare-logoet er klippet ud af et skærmbillede

`assets/emcare-sundhed.webp` stammer fra et skærmbillede og er derfor ikke
knivskarpt. Få originalfilen fra EmCare Sundhed, læg den i `assets/` med samme
navn, og kør `npm run images` efterfulgt af `npm run build`.
