/**
 * The case studies shown on /cases, and behind each of them on
 * /cases/<slug>.
 *
 * IMPORTANT: none of these are delivered projects. They are illustrative
 * examples of the work described on /services, written so the portfolio
 * page isn't empty while the team is starting out. Every card links to a
 * detail page that says exactly that — so this stays honest rather than
 * implying a client list that doesn't exist yet.
 *
 * Replacing one with real work means: swap the copy here, and remove it
 * from the disclaimer by giving it `isReal: true` (the detail page then
 * skips the "this is an example" panel).
 */
export interface CaseStudy {
  slug: string
  title: string
  sector: string
  description: string
  result: string
  stack: string[]
  /** What we'd actually build, shown on the detail page. */
  approach: string[]
  /** Set once this becomes a real, delivered project. */
  isReal?: boolean
  /** Optional photo in public/cases/ — falls back to the accent panel. */
  image?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'bookingsystem-klinik',
    title: 'Bookingsystem til klinikkæde',
    sector: 'Sundhed',
    description:
      'Fælles bookingplatform for otte klinikker, der samlede kalendere, journalhenvisninger og SMS-påmindelser ét sted. Aflyste tider frigives automatisk til ventelisten.',
    result: '38% færre udeblivelser',
    stack: ['Nuxt', 'PostgreSQL', 'Twilio'],
    approach: [
      'Én fælles kalender på tværs af afdelinger, med rettigheder pr. klinik',
      'Automatiske SMS- og mailpåmindelser med bekræftelse i ét klik',
      'Venteliste, der selv rykker op, når en tid bliver ledig',
    ],
  },
  {
    slug: 'lagerstyring-grossist',
    title: 'Lagerstyring for grossist',
    sector: 'Engroshandel',
    description:
      'Internt system til varemodtagelse, lokationer og plukning, bygget oven på et eksisterende ERP. Scannere på lageret skriver direkte ind i samme datamodel som kontoret arbejder i.',
    result: 'Optælling fra 3 dage til 4 timer',
    stack: ['Vue', 'Node', 'REST API'],
    approach: [
      'Stregkodescanning fra håndholdte enheder direkte ind i lagermodellen',
      'Lokationsstyring, så en vare altid har en kendt plads',
      'Integration mod det ERP, I allerede bruger - ikke en erstatning for det',
    ],
  },
  {
    slug: 'prisovervaagning',
    title: 'Prisovervågning og scraping',
    sector: 'E-commerce',
    description:
      'Automatiseret indsamling af konkurrentpriser på tværs af 40 webshops, normaliseret til én varekatalogsnøgle og leveret som dagligt prisoverblik med afvigelsesalarmer.',
    result: '40 kilder, opdateret dagligt',
    stack: ['Python', 'Playwright', 'Scheduled jobs'],
    approach: [
      'Robuste scrapers, der kan tåle at en webshop skifter layout',
      'Normalisering, så den samme vare kan sammenlignes på tværs af kilder',
      'Daglig rapport og alarm, når en pris flytter sig mere end forventet',
    ],
  },
  {
    slug: 'kundeportal-raadgivning',
    title: 'Kundeportal til rådgivningshus',
    sector: 'Rådgivning',
    description:
      'Selvbetjeningsportal hvor kunder følger deres sager, henter dokumenter og godkender oplæg digitalt - i stedet for at det hele gik gennem vedhæftede filer i mails.',
    result: 'Halveret manuel sagsopfølgning',
    stack: ['Nuxt', 'Auth', 'Dokumenthåndtering'],
    approach: [
      'Login og rettigheder, så kunden kun ser sine egne sager',
      'Dokumenter samlet ét sted med versionshistorik',
      'Digital godkendelse med sporbarhed på hvem der godkendte hvad',
    ],
  },
  {
    slug: 'vagtplanlaegning',
    title: 'Vagtplanlægning til restauration',
    sector: 'Restauration',
    description:
      'Planlægningsværktøj der tager højde for åbningstider, kompetencer og lønbudget, og som lader personalet bytte vagter indbyrdes uden at lederen skal ind over hver gang.',
    result: 'Vagtplan lagt på under en time',
    stack: ['Vue', 'PostgreSQL', 'Rollestyring'],
    approach: [
      'Vagtplan der selv holder øje med åbningstider og lønbudget',
      'Kompetencekrav pr. vagt, så den rigtige person står på den rigtige plads',
      'Vagtbytte mellem medarbejdere med godkendelse kun når det er nødvendigt',
    ],
  },
  {
    slug: 'webshop-oekonomi-integration',
    title: 'Integration mellem webshop og økonomi',
    sector: 'Detail',
    description:
      'Tovejsintegration mellem webshop, lager og økonomisystem, så ordrer, kreditnotaer og lagertal holder sig synkrone uden manuel indtastning i to systemer.',
    result: 'Ingen manuel indtastning',
    stack: ['Webhooks', 'REST API', 'Data sync'],
    approach: [
      'Ordrer og kreditnotaer synkroniseres begge veje, automatisk',
      'Lagertal holdes ens i webshop og økonomisystem',
      'Fejlhåndtering med log, så en mislykket synkronisering ikke forsvinder i stilhed',
    ],
  },
]

export function findCase(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug)
}
