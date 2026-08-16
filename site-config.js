/* ═══════════════════════════════════════════════════════════════════════════
   Mike Adelholm — ét sted at rette de faktuelle oplysninger.

   Alle felter herunder står tomme med vilje. Siden er bygget, så et tomt felt
   ikke vises: der kommer ingen tomme mailto:-links, ingen "[Indsæt …]"-tekst
   og ingen påstande, der ikke kan dokumenteres. Udfyld et felt, og indholdet
   dukker op på tværs af sitet — kontaktpanel, footer og privatlivspolitik.

   Skriv KUN oplysninger, du kan stå på mål for. Se NEEDS_INPUT.md.
   ═══════════════════════════════════════════════════════════════════════════ */
window.MA_SITE = {
  contact: {
    /* Modtageradresse for kontaktformularen og for "skriv til mig"-links. */
    email: 'ma@emcare.dk',

    /* Telefonnummer i internationalt format til tel:-link, fx '+4512345678'. */
    phone: '',
    /* Samme nummer, som det skal læses på siden, fx '+45 12 34 56 78'. */
    phoneLabel: '',

    /* HTTPS-endpoint der modtager formularen som JSON via POST og svarer 2xx.
       Sættes dette, sendes henvendelsen direkte fra siden i stedet for at
       åbne brugerens mailklient. Skal have databehandleraftale (se
       privatlivspolitikken), før det tages i brug. */
    formEndpoint: '',

    /* Fx 'Online i hele Danmark' eller 'Aarhus og online'. */
    area: '',

    /* Fx 'inden for to hverdage'. Indgår i sætningen "Jeg vender tilbage …". */
    responseTime: ''
  },

  legal: {
    /* Juridisk navn på virksomheden bag siden, fx 'Adelholm Fysioterapi ApS'. */
    companyName: '',
    /* CVR-nummer, kun cifre eller med mellemrum. */
    cvr: '',
    /* Postadresse på den dataansvarlige. */
    address: '',
    /* Yderligere behandlingsgrundlag ud over samtykke og aftale, hvis der er
       nogen (fx journalføringspligt). Tom = kun de grundlag, der allerede
       står i teksten. */
    extraLegalBasis: '',
    /* Opbevaringsperiode, fx 'i fem år efter sidste kontakt'. */
    retention: '',
    /* Databehandlere/it-leverandører, der behandler personoplysninger,
       fx 'e-mailudbyder og regnskabssystem'. */
    processors: ''
  },

  /* ── Anmeldelser ──────────────────────────────────────────────────────────
     Karrusellen viser præcis det, der står her — intet andet. Listen er tom,
     og det skal den blive, indtil der for HVER anmeldelse foreligger:

       1. personens egen ordlyd, uændret
       2. hvor meget identitet personen har sagt ja til
       3. dateret, skriftligt samtykke til offentliggørelse

     consentDate er ikke pynt: en post uden dato bliver filtreret fra og vist
     slet ikke. Trækker nogen samtykket tilbage, slettes posten her.

       { quote:   'Personens egne ord.',
         name:    'Fornavn'  eller 'Anonym kunde',
         context: 'Fx "Smerter & genoptræning"',
         consentDate: '2026-08-15' }

     Der lægges bevidst ikke Review- eller AggregateRating-schema på siden.
     Det må først tilføjes, når ovenstående kan dokumenteres. */
  reviews: []
};
