/** Interface, verdict and share text for the music tests, per language.
 *  English is here too, so the tests, the share page and the share cards
 *  all read one source. Page prose lives in lib/i18n/tools/pages-<lang>.ts.
 *
 *  Templates use {name} placeholders (see `fmt` in ./ui) and **bold**. */

import type { Locale } from "@/lib/i18n/tuner";
import { localName } from "./names";

export interface VerdictText {
  tier: string;
  detail: string;
}

export interface TestsUi {
  names: { "perfect-pitch": string; "tone-deaf": string; "hearing-age": string };
  questions: { "perfect-pitch": string; "tone-deaf": string; "hearing-age": string };
  hubBlurbs: { "perfect-pitch": string; "tone-deaf": string; "hearing-age": string };

  /** Perfect pitch bands, best first: ≥11, ≥8, ≥5, ≥3, below. */
  pp: VerdictText[];
  /** Tone deaf bands, best first: ≤5, ≤12, ≤25, ≤60, ≤110 cents, above.
   *  {c} is the threshold in cents. */
  td: VerdictText[];
  /** {n} */
  cents: string;
  cent1: string;
  ha: {
    belowScore: string;
    below: VerdictText;
    /** {age} */
    tier: string;
    /** {khz} {people} */
    detail: string;
    /** Aligned with HEARING_AGE, 19 kHz first. */
    ages: string[];
    /** The same ages as a phrase about people, for `detail`. */
    people: string[];
    /** Card label: {age} */
    cardLabel: string;
  };

  /** First person, for share text. {score} {tier} */
  brag: { "perfect-pitch": string; "tone-deaf": string; "hearing-age": string; hearingNone: string };
  /** Third person, for the share landing page. {score} */
  friend: { "perfect-pitch": string; "tone-deaf": string; "hearing-age": string; hearingNone: string };
  beatMe: string;
  canYouBeatIt: string;
  canYou: string;

  // Shared result panel
  yourResult: string;
  newBest: string;
  /** {score} */
  yourBest: string;
  /** {score} */
  won: string;
  tie: string;
  lost: string;
  share: string;
  copied: string;
  couldntCopy: string;
  challenge: string;
  challengeCopied: string;
  saveImage: string;
  tryAgain: string;
  moreTests: string;
  dailyChallenge: string;
  allTests: string;
  challengedTitle: string;
  /** {score} {tier} */
  challengedBody: string;
  start: string;
  bestSoFar: string;
  playAgain: string;
  progress: string;
  seeScore: string;

  // Perfect pitch
  ppIntro: string;
  ppIntroNote: string;
  /** {n} {total} */
  ppNoteOf: string;
  listen: string;
  ppWhich: string;
  /** {note} */
  ppCorrect: string;
  ppWas: string;
  ppSemitone: string;
  ppNext: string;

  // Tone deaf
  tdIntro: string;
  tdIntroNote: string;
  /** {n} */
  tdTrial: string;
  tdDiff: string;
  tdQuestion: string;
  higher: string;
  lower: string;
  tdRight: string;
  tdWrong: string;

  // Hearing age
  haWarnTitle: string;
  haWarn: string;
  haStep1: string;
  haPlayCheck: string;
  stop: string;
  haStep2: string;
  haHeadphones: string;
  /** {n} {total} */
  haToneOf: string;
  haHeard: string;
  /** {n} {total} */
  haChecked: string;
  haListen: string;
  haQuestion: string;
  hear: string;
  cantHear: string;
  playItAgain: string;
  haCaught: string;

  // Hub cards
  hubMinutes: string;
  hubBeat: string;
  hubTake: string;

  // Share landing page and card
  shareEyebrow: string;
  /** {tier} {question} */
  shareBody: string;
  /** {test} */
  shareTake: string;
  sharePrivacy: string;
  shareBadTitle: string;
  shareBadBody: string;
  shareSeeTests: string;
  /** {test} {question} */
  shareMetaDesc: string;
  /** {test} */
  shareCardAlt: string;
  cardFootnote: string;
  hearingCardSub: string;
  /** {score} */
  hearingCardTitle: string;
}

const EN: TestsUi = {
  names: { "perfect-pitch": "Perfect Pitch Test", "tone-deaf": "Tone Deaf Test", "hearing-age": "Hearing Age Test" },
  questions: {
    "perfect-pitch": "Can you name a note with no reference?",
    "tone-deaf": "How small a pitch change can you hear?",
    "hearing-age": "How high can you hear?",
  },
  hubBlurbs: {
    "perfect-pitch": "Twelve notes with no reference. Name each one — chance is 1 in 12, perfect pitch is 12 for 12.",
    "tone-deaf": "Higher or lower? It narrows the gap until it finds the smallest pitch change you can hear, in cents.",
    "hearing-age": "Tones from 8 to 20 kHz. The highest one you hear shows how old your ears sound.",
  },
  pp: [
    { tier: "Perfect pitch", detail: "You named almost every note with no reference — the signature of absolute pitch, which is often estimated at around 1 in 10,000 people." },
    { tier: "Strong pitch memory", detail: "Well above chance. You hold a stable memory of what notes sound like — many people with absolute pitch score here on unfamiliar timbres." },
    { tier: "Good pitch memory", detail: "Clearly better than guessing (chance is 1 in 12). Some notes are anchored in your memory, likely from songs or an instrument you know well." },
    { tier: "Above chance", detail: "A little better than guessing. Most musicians land here: they hear relationships between notes, not each note on its own." },
    { tier: "Relative pitch listener", detail: "Like the vast majority of musicians, you hear notes in relation to each other. That is the skill that matters most — and it can be trained." },
  ],
  td: [
    { tier: "Exceptional pitch hearing", detail: "You heard a change of {c}¢ — a twentieth of a semitone. That is the range of trained musicians and piano tuners." },
    { tier: "Excellent pitch hearing", detail: "Finer than most listeners. Small tuning errors on a guitar string will bother you, which is a good thing." },
    { tier: "Good — not tone deaf", detail: "A normal, healthy ability to hear pitch. You can tell when a string is noticeably out of tune by ear." },
    { tier: "Fair — not tone deaf", detail: "You hear pitch changes well under a semitone, which is all music needs. Training sharpens this quickly." },
    { tier: "Below average", detail: "You can hear about a semitone, the smallest step in Western music. Retake it with headphones in a quiet room — tiredness and noise cost a lot." },
    { tier: "Possible pitch difficulty", detail: "Changes smaller than a semitone were hard to hear. That can point to congenital amusia (true tone deafness, in roughly 1.5–4% of people) — but this is a browser test, not a diagnosis." },
  ],
  cents: "{n} cents",
  cent1: "1 cent",
  ha: {
    belowScore: "Below 8 kHz",
    below: { tier: "Check your sound", detail: "Almost everyone can hear 8 kHz, so this usually means the volume was too low or the speaker cannot play it. Try headphones." },
    tier: "Hearing age: {age}",
    detail: "The highest tone you heard was {khz}, typical of {people}. Noise exposure and your speakers affect this as much as age does.",
    ages: ["under 20", "under 25", "under 30", "under 40", "under 45", "under 50", "under 60", "under 70", "70 or over"],
    people: ["people under 20", "people under 25", "people under 30", "people under 40", "people under 45", "people under 50", "people under 60", "people under 70", "people aged 70 or over"],
    cardLabel: "Ears {age}",
  },
  brag: {
    "perfect-pitch": "I scored {score} on the perfect pitch test",
    "tone-deaf": "I can hear a pitch change of {score}",
    "hearing-age": "I can hear up to {score} — {tier}",
    hearingNone: "I took the hearing age test",
  },
  friend: {
    "perfect-pitch": "Your friend scored {score} on the perfect pitch test",
    "tone-deaf": "Your friend can hear a pitch change of {score}",
    "hearing-age": "Your friend can hear up to {score}",
    hearingNone: "Your friend took the hearing age test",
  },
  beatMe: "Can you beat me?",
  canYouBeatIt: "Can you beat it?",
  canYou: "Can you?",

  yourResult: "Your result",
  newBest: "New personal best!",
  yourBest: "Your best: {score}",
  won: "You beat your friend ({score})! Send it back to them.",
  tie: "A tie with your friend at {score}.",
  lost: "Your friend wins this one with {score}. Rematch?",
  share: "Share your result",
  copied: "Copied — paste it anywhere",
  couldntCopy: "Couldn't copy",
  challenge: "Challenge a friend",
  challengeCopied: "Challenge link copied",
  saveImage: "Save image",
  tryAgain: "Try again",
  moreTests: "Test your ears some more",
  dailyChallenge: "Daily Challenge",
  allTests: "All music tests",
  challengedTitle: "You've been challenged.",
  challengedBody: "A friend scored **{score}** ({tier}). Can you beat it?",
  start: "Start the test",
  bestSoFar: "Your best so far:",
  playAgain: "Play again",
  progress: "Progress",
  seeScore: "See your score",

  ppIntro: "12 notes, one at a time. Name each one — no reference note, no second guesses.",
  ppIntroNote: "A quick burst of random tones plays before each note to wipe your memory of the last one. Sound on, headphones help.",
  ppNoteOf: "Note {n} of {total}",
  listen: "Listen…",
  ppWhich: "Which note was it?",
  ppCorrect: "Correct — {note}",
  ppWas: "It was {note}",
  ppSemitone: " — only a semitone off",
  ppNext: "Next note",

  tdIntro: "You'll hear two tones. Was the second one **higher** or **lower**?",
  tdIntroNote: "It starts at a semitone apart and gets harder every time you are right, until it finds the smallest change you can hear. About two minutes. Use headphones in a quiet room for a fair score.",
  tdTrial: "Trial {n}",
  tdDiff: "Difference now:",
  tdQuestion: "Was the second tone higher or lower?",
  higher: "Higher",
  lower: "Lower",
  tdRight: "Right — getting harder",
  tdWrong: "Not that one — a little easier next",

  haWarnTitle: "Protect your ears.",
  haWarn: "Set the volume with the check tone below, then leave it alone. Never turn it up to hear a high tone — loud high frequencies can damage hearing.",
  haStep1: "Step 1: play the check tone and set it to a comfortable, quiet level.",
  haPlayCheck: "Play check tone (1 kHz)",
  stop: "Stop",
  haStep2: "Step 2: tones climb from 8 kHz to 20 kHz. Say whether you hear each one.",
  haHeadphones: "Headphones give a truer result — many phone and laptop speakers cannot play above 15 kHz.",
  haToneOf: "Tone {n} of {total}",
  haHeard: "Heard so far:",
  haChecked: "{n} of {total} frequencies checked",
  haListen: "Listen closely…",
  haQuestion: "Did you hear a tone?",
  hear: "I hear it",
  cantHear: "I can't hear it",
  playItAgain: "Play it again",
  haCaught: "One of the tones was silent, and you said you heard it — so this result may be too high. Try again with headphones and answer only when you are sure.",

  hubMinutes: "About 2 minutes",
  hubBeat: "Beat your score",
  hubTake: "Take the test",

  shareEyebrow: "You've been challenged",
  shareBody: "That's **{tier}**. {question} The test is free, takes about two minutes and runs in your browser.",
  shareTake: "Take the {test}",
  sharePrivacy: "Scores are kept in each player's own browser and shared by link. GuitarTunePro has no accounts and stores nothing about you.",
  shareBadTitle: "How good are your ears?",
  shareBadBody: "This share link is incomplete, but the tests are all here.",
  shareSeeTests: "See the music tests",
  shareMetaDesc: "{question} Take the free {test} in your browser and see if you can beat this score.",
  shareCardAlt: "{test} result card",
  cardFootnote: "Take the free test · No sign-up",
  hearingCardSub: "Free two-minute test, 8 to 20 kHz",
  hearingCardTitle: "I can hear up to {score}. Can you?",
};

const ES: TestsUi = {
  names: { "perfect-pitch": "Test de oído absoluto", "tone-deaf": "Test de oído musical", "hearing-age": "Test de edad auditiva" },
  questions: {
    "perfect-pitch": "¿Puedes nombrar una nota sin referencia?",
    "tone-deaf": "¿Qué cambio de afinación más pequeño puedes oír?",
    "hearing-age": "¿Hasta qué frecuencia oyes?",
  },
  hubBlurbs: {
    "perfect-pitch": "Doce notas sin referencia. Nombra cada una: al azar acertarías 1 de 12; con oído absoluto, las 12.",
    "tone-deaf": "¿Más aguda o más grave? La diferencia se reduce hasta encontrar el cambio de afinación más pequeño que oyes, en cents.",
    "hearing-age": "Tonos de 8 a 20 kHz. El más agudo que oigas indica la edad de tus oídos.",
  },
  pp: [
    { tier: "Oído absoluto", detail: "Nombraste casi todas las notas sin referencia: la señal del oído absoluto, que se suele estimar en una de cada 10.000 personas." },
    { tier: "Gran memoria tonal", detail: "Muy por encima del azar. Recuerdas con estabilidad cómo suenan las notas; muchas personas con oído absoluto puntúan aquí con timbres poco habituales." },
    { tier: "Buena memoria tonal", detail: "Claramente mejor que adivinar (el azar da 1 de 12). Algunas notas están fijadas en tu memoria, seguramente por canciones o por un instrumento que conoces bien." },
    { tier: "Por encima del azar", detail: "Algo mejor que adivinar. Aquí cae la mayoría de los músicos: oyen las relaciones entre notas, no cada nota por separado." },
    { tier: "Oído relativo", detail: "Como la gran mayoría de los músicos, oyes las notas en relación unas con otras. Es la habilidad que más importa, y se puede entrenar." },
  ],
  td: [
    { tier: "Oído excepcional", detail: "Oíste un cambio de {c}¢, una vigésima parte de semitono. Es el nivel de músicos entrenados y afinadores de piano." },
    { tier: "Oído excelente", detail: "Más fino que la mayoría. Notarás los pequeños errores de afinación de una cuerda, y eso es bueno." },
    { tier: "Bueno: no eres desafinado", detail: "Una capacidad normal y sana para oír la afinación. Distingues de oído cuándo una cuerda está claramente desafinada." },
    { tier: "Aceptable: no eres desafinado", detail: "Oyes cambios muy por debajo de un semitono, que es todo lo que la música necesita. Con práctica mejora rápido." },
    { tier: "Por debajo de la media", detail: "Oyes más o menos un semitono, el paso más pequeño de la música occidental. Repítelo con auriculares en un lugar tranquilo: el cansancio y el ruido pesan mucho." },
    { tier: "Posible dificultad con el tono", detail: "Te costó oír cambios menores de un semitono. Puede apuntar a amusia congénita (la verdadera «sordera tonal», en un 1,5–4 % de las personas), pero esto es un test en el navegador, no un diagnóstico." },
  ],
  cents: "{n} cents",
  cent1: "1 cent",
  ha: {
    belowScore: "Menos de 8 kHz",
    below: { tier: "Revisa el sonido", detail: "Casi todo el mundo oye 8 kHz, así que suele significar que el volumen estaba muy bajo o que el altavoz no reproduce esa frecuencia. Prueba con auriculares." },
    tier: "Edad auditiva: {age}",
    detail: "El tono más agudo que oíste fue de {khz}, típico de {people}. La exposición al ruido y tus altavoces influyen tanto como la edad.",
    ages: ["menos de 20", "menos de 25", "menos de 30", "menos de 40", "menos de 45", "menos de 50", "menos de 60", "menos de 70", "70 o más"],
    people: ["personas de menos de 20 años", "personas de menos de 25 años", "personas de menos de 30 años", "personas de menos de 40 años", "personas de menos de 45 años", "personas de menos de 50 años", "personas de menos de 60 años", "personas de menos de 70 años", "personas de 70 años o más"],
    cardLabel: "Oídos de {age}",
  },
  brag: {
    "perfect-pitch": "Saqué {score} en el test de oído absoluto",
    "tone-deaf": "Oigo un cambio de afinación de {score}",
    "hearing-age": "Oigo hasta {score} — {tier}",
    hearingNone: "Hice el test de edad auditiva",
  },
  friend: {
    "perfect-pitch": "Tu amigo sacó {score} en el test de oído absoluto",
    "tone-deaf": "Tu amigo oye un cambio de afinación de {score}",
    "hearing-age": "Tu amigo oye hasta {score}",
    hearingNone: "Tu amigo hizo el test de edad auditiva",
  },
  beatMe: "¿Me superas?",
  canYouBeatIt: "¿Puedes superarlo?",
  canYou: "¿Y tú?",

  yourResult: "Tu resultado",
  newBest: "¡Nuevo récord personal!",
  yourBest: "Tu mejor resultado: {score}",
  won: "¡Superaste a tu amigo ({score})! Devuélvele el reto.",
  tie: "Empate con tu amigo: {score}.",
  lost: "Esta vez gana tu amigo con {score}. ¿Revancha?",
  share: "Compartir resultado",
  copied: "Copiado: pégalo donde quieras",
  couldntCopy: "No se pudo copiar",
  challenge: "Retar a un amigo",
  challengeCopied: "Enlace del reto copiado",
  saveImage: "Guardar imagen",
  tryAgain: "Repetir",
  moreTests: "Pon a prueba tus oídos un poco más",
  dailyChallenge: "Reto diario",
  allTests: "Todos los tests musicales",
  challengedTitle: "Te han retado.",
  challengedBody: "Un amigo sacó **{score}** ({tier}). ¿Puedes superarlo?",
  start: "Empezar el test",
  bestSoFar: "Tu mejor resultado hasta ahora:",
  playAgain: "Repetir sonido",
  progress: "Progreso",
  seeScore: "Ver resultado",

  ppIntro: "12 notas, una a una. Nombra cada una: sin nota de referencia y sin segundas oportunidades.",
  ppIntroNote: "Antes de cada nota suena una ráfaga de tonos al azar para borrar el recuerdo de la anterior. Sube el volumen; con auriculares, mejor.",
  ppNoteOf: "Nota {n} de {total}",
  listen: "Escucha…",
  ppWhich: "¿Qué nota era?",
  ppCorrect: "Correcto: {note}",
  ppWas: "Era {note}",
  ppSemitone: ", a solo un semitono",
  ppNext: "Siguiente nota",

  tdIntro: "Oirás dos tonos. ¿El segundo era **más agudo** o **más grave**?",
  tdIntroNote: "Empieza con un semitono de diferencia y se complica cada vez que aciertas, hasta encontrar el cambio más pequeño que oyes. Unos dos minutos. Usa auriculares en un lugar tranquilo para un resultado justo.",
  tdTrial: "Intento {n}",
  tdDiff: "Diferencia actual:",
  tdQuestion: "¿El segundo tono era más agudo o más grave?",
  higher: "Más agudo",
  lower: "Más grave",
  tdRight: "Bien: ahora más difícil",
  tdWrong: "Esta no: el siguiente será algo más fácil",

  haWarnTitle: "Cuida tus oídos.",
  haWarn: "Ajusta el volumen con el tono de prueba y no lo toques más. Nunca lo subas para oír un tono agudo: las frecuencias altas a mucho volumen pueden dañar el oído.",
  haStep1: "Paso 1: reproduce el tono de prueba y ajústalo a un nivel cómodo y bajo.",
  haPlayCheck: "Tono de prueba (1 kHz)",
  stop: "Parar",
  haStep2: "Paso 2: los tonos suben de 8 kHz a 20 kHz. Indica si oyes cada uno.",
  haHeadphones: "Con auriculares el resultado es más fiable: muchos altavoces de móvil y portátil no reproducen más allá de 15 kHz.",
  haToneOf: "Tono {n} de {total}",
  haHeard: "Oído hasta ahora:",
  haChecked: "{n} de {total} frecuencias comprobadas",
  haListen: "Escucha con atención…",
  haQuestion: "¿Oíste un tono?",
  hear: "Lo oigo",
  cantHear: "No lo oigo",
  playItAgain: "Repetir tono",
  haCaught: "Uno de los tonos era silencio y dijiste que lo oías, así que este resultado puede ser demasiado alto. Repítelo con auriculares y responde solo cuando estés seguro.",

  hubMinutes: "Unos 2 minutos",
  hubBeat: "Supera tu récord",
  hubTake: "Hacer el test",

  shareEyebrow: "Te han retado",
  shareBody: "Eso es **{tier}**. {question} El test es gratis, dura unos dos minutos y funciona en el navegador.",
  shareTake: "Hacer el {test}",
  sharePrivacy: "Los resultados se guardan en el navegador de cada jugador y se comparten por enlace. GuitarTunePro no tiene cuentas ni guarda nada sobre ti.",
  shareBadTitle: "¿Qué tal oído tienes?",
  shareBadBody: "Este enlace está incompleto, pero aquí tienes todos los tests.",
  shareSeeTests: "Ver los tests musicales",
  shareMetaDesc: "{question} Haz gratis el {test} en el navegador y comprueba si superas este resultado.",
  shareCardAlt: "Tarjeta de resultado del {test}",
  cardFootnote: "Test gratis · Sin registro",
  hearingCardSub: "Test gratis de dos minutos, de 8 a 20 kHz",
  hearingCardTitle: "Oigo hasta {score}. ¿Y tú?",
};

const PT: TestsUi = {
  names: { "perfect-pitch": "Teste de ouvido absoluto", "tone-deaf": "Teste de ouvido musical", "hearing-age": "Teste de idade auditiva" },
  questions: {
    "perfect-pitch": "Consegue dizer o nome de uma nota sem referência?",
    "tone-deaf": "Qual a menor mudança de afinação que você ouve?",
    "hearing-age": "Até que frequência você ouve?",
  },
  hubBlurbs: {
    "perfect-pitch": "Doze notas sem referência. Diga o nome de cada uma: no chute você acerta 1 em 12; com ouvido absoluto, as 12.",
    "tone-deaf": "Mais aguda ou mais grave? A diferença diminui até achar a menor mudança de afinação que você ouve, em cents.",
    "hearing-age": "Tons de 8 a 20 kHz. O mais agudo que você ouvir mostra a idade dos seus ouvidos.",
  },
  pp: [
    { tier: "Ouvido absoluto", detail: "Você acertou quase todas as notas sem referência: a marca do ouvido absoluto, que costuma ser estimado em cerca de 1 a cada 10.000 pessoas." },
    { tier: "Ótima memória tonal", detail: "Bem acima do acaso. Você guarda com firmeza como cada nota soa; muitas pessoas com ouvido absoluto pontuam aqui com timbres pouco familiares." },
    { tier: "Boa memória tonal", detail: "Claramente melhor que chutar (o acaso dá 1 em 12). Algumas notas estão fixadas na sua memória, provavelmente por músicas ou por um instrumento que você conhece bem." },
    { tier: "Acima do acaso", detail: "Um pouco melhor que chutar. A maioria dos músicos fica aqui: ouve a relação entre as notas, não cada nota sozinha." },
    { tier: "Ouvido relativo", detail: "Como a grande maioria dos músicos, você ouve as notas em relação umas às outras. É a habilidade que mais importa, e dá para treinar." },
  ],
  td: [
    { tier: "Audição excepcional", detail: "Você ouviu uma mudança de {c}¢, um vigésimo de semitom. É o nível de músicos treinados e afinadores de piano." },
    { tier: "Audição excelente", detail: "Mais fina que a da maioria. Pequenos erros de afinação numa corda vão incomodar você, e isso é bom." },
    { tier: "Boa: você não é desafinado", detail: "Uma capacidade normal e saudável de ouvir afinação. Você percebe de ouvido quando uma corda está claramente desafinada." },
    { tier: "Razoável: você não é desafinado", detail: "Você ouve mudanças bem menores que um semitom, que é tudo o que a música exige. Com treino isso melhora rápido." },
    { tier: "Abaixo da média", detail: "Você ouve mais ou menos um semitom, o menor passo da música ocidental. Refaça com fones num lugar silencioso: cansaço e barulho pesam muito." },
    { tier: "Possível dificuldade com altura", detail: "Mudanças menores que um semitom foram difíceis de ouvir. Isso pode indicar amusia congênita (a verdadeira «surdez tonal», em cerca de 1,5–4% das pessoas), mas este é um teste no navegador, não um diagnóstico." },
  ],
  cents: "{n} cents",
  cent1: "1 cent",
  ha: {
    belowScore: "Abaixo de 8 kHz",
    below: { tier: "Verifique o som", detail: "Quase todo mundo ouve 8 kHz, então isso geralmente quer dizer que o volume estava baixo demais ou que o alto-falante não reproduz essa frequência. Tente com fones." },
    tier: "Idade auditiva: {age}",
    detail: "O tom mais agudo que você ouviu foi {khz}, típico de {people}. A exposição a ruído e seus alto-falantes influem tanto quanto a idade.",
    ages: ["menos de 20", "menos de 25", "menos de 30", "menos de 40", "menos de 45", "menos de 50", "menos de 60", "menos de 70", "70 ou mais"],
    people: ["pessoas com menos de 20 anos", "pessoas com menos de 25 anos", "pessoas com menos de 30 anos", "pessoas com menos de 40 anos", "pessoas com menos de 45 anos", "pessoas com menos de 50 anos", "pessoas com menos de 60 anos", "pessoas com menos de 70 anos", "pessoas com 70 anos ou mais"],
    cardLabel: "Ouvidos de {age}",
  },
  brag: {
    "perfect-pitch": "Tirei {score} no teste de ouvido absoluto",
    "tone-deaf": "Ouço uma mudança de afinação de {score}",
    "hearing-age": "Ouço até {score} — {tier}",
    hearingNone: "Fiz o teste de idade auditiva",
  },
  friend: {
    "perfect-pitch": "Seu amigo tirou {score} no teste de ouvido absoluto",
    "tone-deaf": "Seu amigo ouve uma mudança de afinação de {score}",
    "hearing-age": "Seu amigo ouve até {score}",
    hearingNone: "Seu amigo fez o teste de idade auditiva",
  },
  beatMe: "Consegue me superar?",
  canYouBeatIt: "Consegue superar?",
  canYou: "E você?",

  yourResult: "Seu resultado",
  newBest: "Novo recorde pessoal!",
  yourBest: "Seu melhor: {score}",
  won: "Você superou seu amigo ({score})! Devolva o desafio.",
  tie: "Empate com seu amigo: {score}.",
  lost: "Desta vez seu amigo ganha com {score}. Revanche?",
  share: "Compartilhar resultado",
  copied: "Copiado: cole onde quiser",
  couldntCopy: "Não foi possível copiar",
  challenge: "Desafiar um amigo",
  challengeCopied: "Link do desafio copiado",
  saveImage: "Salvar imagem",
  tryAgain: "Tentar de novo",
  moreTests: "Teste seus ouvidos um pouco mais",
  dailyChallenge: "Desafio diário",
  allTests: "Todos os testes musicais",
  challengedTitle: "Você foi desafiado.",
  challengedBody: "Um amigo tirou **{score}** ({tier}). Consegue superar?",
  start: "Começar o teste",
  bestSoFar: "Seu melhor até agora:",
  playAgain: "Tocar de novo",
  progress: "Progresso",
  seeScore: "Ver resultado",

  ppIntro: "12 notas, uma de cada vez. Diga o nome de cada uma: sem nota de referência e sem segunda chance.",
  ppIntroNote: "Antes de cada nota toca uma rajada de tons aleatórios para apagar a lembrança da anterior. Som ligado; com fones é melhor.",
  ppNoteOf: "Nota {n} de {total}",
  listen: "Ouça…",
  ppWhich: "Qual era a nota?",
  ppCorrect: "Certo: {note}",
  ppWas: "Era {note}",
  ppSemitone: ", errou por um semitom",
  ppNext: "Próxima nota",

  tdIntro: "Você vai ouvir dois tons. O segundo foi **mais agudo** ou **mais grave**?",
  tdIntroNote: "Começa com um semitom de diferença e fica mais difícil cada vez que você acerta, até achar a menor mudança que você ouve. Cerca de dois minutos. Use fones num lugar silencioso para um resultado justo.",
  tdTrial: "Rodada {n}",
  tdDiff: "Diferença atual:",
  tdQuestion: "O segundo tom foi mais agudo ou mais grave?",
  higher: "Mais agudo",
  lower: "Mais grave",
  tdRight: "Certo: agora mais difícil",
  tdWrong: "Não foi: o próximo fica um pouco mais fácil",

  haWarnTitle: "Proteja seus ouvidos.",
  haWarn: "Ajuste o volume com o tom de teste e não mexa mais. Nunca aumente para ouvir um tom agudo: frequências altas em volume alto podem danificar a audição.",
  haStep1: "Passo 1: toque o tom de teste e deixe num nível confortável e baixo.",
  haPlayCheck: "Tom de teste (1 kHz)",
  stop: "Parar",
  haStep2: "Passo 2: os tons sobem de 8 kHz a 20 kHz. Diga se ouve cada um.",
  haHeadphones: "Com fones o resultado é mais fiel: muitos alto-falantes de celular e notebook não tocam acima de 15 kHz.",
  haToneOf: "Tom {n} de {total}",
  haHeard: "Ouvido até agora:",
  haChecked: "{n} de {total} frequências verificadas",
  haListen: "Ouça com atenção…",
  haQuestion: "Você ouviu um tom?",
  hear: "Estou ouvindo",
  cantHear: "Não ouço",
  playItAgain: "Tocar de novo",
  haCaught: "Um dos tons era silêncio e você disse que ouviu, então este resultado pode estar alto demais. Tente de novo com fones e responda só quando tiver certeza.",

  hubMinutes: "Cerca de 2 minutos",
  hubBeat: "Supere seu recorde",
  hubTake: "Fazer o teste",

  shareEyebrow: "Você foi desafiado",
  shareBody: "Isso é **{tier}**. {question} O teste é grátis, leva uns dois minutos e roda no navegador.",
  shareTake: "Fazer o {test}",
  sharePrivacy: "Os resultados ficam no navegador de cada jogador e são compartilhados por link. O GuitarTunePro não tem contas e não guarda nada sobre você.",
  shareBadTitle: "Seus ouvidos são bons?",
  shareBadBody: "Este link está incompleto, mas todos os testes estão aqui.",
  shareSeeTests: "Ver os testes musicais",
  shareMetaDesc: "{question} Faça grátis o {test} no navegador e veja se supera este resultado.",
  shareCardAlt: "Cartão de resultado do {test}",
  cardFootnote: "Teste grátis · Sem cadastro",
  hearingCardSub: "Teste grátis de dois minutos, de 8 a 20 kHz",
  hearingCardTitle: "Ouço até {score}. E você?",
};

const FR: TestsUi = {
  names: { "perfect-pitch": "Test d’oreille absolue", "tone-deaf": "Test d’oreille musicale", "hearing-age": "Test d’âge auditif" },
  questions: {
    "perfect-pitch": "Savez-vous nommer une note sans référence ?",
    "tone-deaf": "Quel est le plus petit écart de hauteur que vous entendez ?",
    "hearing-age": "Jusqu’où entendez-vous dans les aigus ?",
  },
  hubBlurbs: {
    "perfect-pitch": "Douze notes sans référence. Nommez-les : le hasard en donne 1 sur 12, l’oreille absolue les 12.",
    "tone-deaf": "Plus aigu ou plus grave ? L’écart se resserre jusqu’à trouver le plus petit changement de hauteur que vous entendez, en cents.",
    "hearing-age": "Des sons de 8 à 20 kHz. Le plus aigu que vous entendez donne l’âge de vos oreilles.",
  },
  pp: [
    { tier: "Oreille absolue", detail: "Vous avez nommé presque toutes les notes sans référence : la marque de l’oreille absolue, qu’on estime souvent à environ une personne sur 10 000." },
    { tier: "Excellente mémoire des hauteurs", detail: "Bien au-dessus du hasard. Vous gardez un souvenir stable du son des notes ; beaucoup de personnes à l’oreille absolue obtiennent ce score avec des timbres inhabituels." },
    { tier: "Bonne mémoire des hauteurs", detail: "Nettement mieux que le hasard (1 sur 12). Certaines notes sont ancrées dans votre mémoire, sans doute grâce à des chansons ou à un instrument que vous connaissez bien." },
    { tier: "Au-dessus du hasard", detail: "Un peu mieux que le hasard. La plupart des musiciens sont ici : ils entendent les rapports entre les notes, pas chaque note isolée." },
    { tier: "Oreille relative", detail: "Comme la grande majorité des musiciens, vous entendez les notes les unes par rapport aux autres. C’est la compétence qui compte le plus, et elle se travaille." },
  ],
  td: [
    { tier: "Oreille exceptionnelle", detail: "Vous avez entendu un écart de {c} ¢, soit un vingtième de demi-ton. C’est le niveau des musiciens entraînés et des accordeurs de piano." },
    { tier: "Excellente oreille", detail: "Plus fine que la plupart. Les petites erreurs d’accordage d’une corde vous gêneront, et c’est une bonne chose." },
    { tier: "Bonne — pas de surdité tonale", detail: "Une capacité normale et saine à percevoir la hauteur. Vous entendez quand une corde est nettement désaccordée." },
    { tier: "Correcte — pas de surdité tonale", detail: "Vous entendez des écarts bien inférieurs au demi-ton, ce dont la musique a besoin. L’entraînement affine cela rapidement." },
    { tier: "En dessous de la moyenne", detail: "Vous entendez environ un demi-ton, le plus petit intervalle de la musique occidentale. Refaites-le au casque dans une pièce calme : la fatigue et le bruit coûtent cher." },
    { tier: "Difficulté possible avec la hauteur", detail: "Les écarts inférieurs à un demi-ton étaient difficiles à entendre. Cela peut évoquer une amusie congénitale (la vraie « surdité tonale », chez environ 1,5 à 4 % des gens), mais ceci est un test de navigateur, pas un diagnostic." },
  ],
  cents: "{n} cents",
  cent1: "1 cent",
  ha: {
    belowScore: "Moins de 8 kHz",
    below: { tier: "Vérifiez le son", detail: "Presque tout le monde entend 8 kHz : le volume était sans doute trop bas, ou le haut-parleur ne restitue pas cette fréquence. Essayez au casque." },
    tier: "Âge auditif : {age}",
    detail: "Le son le plus aigu que vous avez entendu était de {khz}, typique des {people}. L’exposition au bruit et vos haut-parleurs comptent autant que l’âge.",
    ages: ["moins de 20 ans", "moins de 25 ans", "moins de 30 ans", "moins de 40 ans", "moins de 45 ans", "moins de 50 ans", "moins de 60 ans", "moins de 70 ans", "70 ans et plus"],
    people: ["moins de 20 ans", "moins de 25 ans", "moins de 30 ans", "moins de 40 ans", "moins de 45 ans", "moins de 50 ans", "moins de 60 ans", "moins de 70 ans", "personnes de 70 ans et plus"],
    cardLabel: "Oreilles : {age}",
  },
  brag: {
    "perfect-pitch": "J’ai fait {score} au test d’oreille absolue",
    "tone-deaf": "J’entends un écart de hauteur de {score}",
    "hearing-age": "J’entends jusqu’à {score} — {tier}",
    hearingNone: "J’ai fait le test d’âge auditif",
  },
  friend: {
    "perfect-pitch": "Votre ami a fait {score} au test d’oreille absolue",
    "tone-deaf": "Votre ami entend un écart de hauteur de {score}",
    "hearing-age": "Votre ami entend jusqu’à {score}",
    hearingNone: "Votre ami a fait le test d’âge auditif",
  },
  beatMe: "Tu fais mieux ?",
  canYouBeatIt: "Ferez-vous mieux ?",
  canYou: "Et vous ?",

  yourResult: "Votre résultat",
  newBest: "Nouveau record personnel !",
  yourBest: "Votre record : {score}",
  won: "Vous avez battu votre ami ({score}) ! Renvoyez-lui le défi.",
  tie: "Égalité avec votre ami : {score}.",
  lost: "Votre ami l’emporte cette fois avec {score}. Revanche ?",
  share: "Partager le résultat",
  copied: "Copié — collez-le où vous voulez",
  couldntCopy: "Copie impossible",
  challenge: "Défier un ami",
  challengeCopied: "Lien du défi copié",
  saveImage: "Enregistrer l’image",
  tryAgain: "Recommencer",
  moreTests: "Testez encore vos oreilles",
  dailyChallenge: "Défi du jour",
  allTests: "Tous les tests musicaux",
  challengedTitle: "On vous lance un défi.",
  challengedBody: "Un ami a fait **{score}** ({tier}). Ferez-vous mieux ?",
  start: "Commencer le test",
  bestSoFar: "Votre record pour l’instant :",
  playAgain: "Réécouter",
  progress: "Progression",
  seeScore: "Voir le résultat",

  ppIntro: "12 notes, une à une. Nommez chacune : pas de note de référence, pas de seconde chance.",
  ppIntroNote: "Une courte rafale de sons aléatoires précède chaque note pour effacer le souvenir de la précédente. Activez le son ; un casque aide.",
  ppNoteOf: "Note {n} sur {total}",
  listen: "Écoutez…",
  ppWhich: "Quelle était la note ?",
  ppCorrect: "Exact — {note}",
  ppWas: "C’était {note}",
  ppSemitone: " — à un demi-ton près",
  ppNext: "Note suivante",

  tdIntro: "Vous allez entendre deux sons. Le second était-il **plus aigu** ou **plus grave** ?",
  tdIntroNote: "On commence à un demi-ton d’écart, puis ça se corse à chaque bonne réponse, jusqu’à trouver le plus petit écart que vous entendez. Environ deux minutes. Au casque et au calme pour un score juste.",
  tdTrial: "Essai {n}",
  tdDiff: "Écart actuel :",
  tdQuestion: "Le second son était-il plus aigu ou plus grave ?",
  higher: "Plus aigu",
  lower: "Plus grave",
  tdRight: "Juste — un peu plus dur",
  tdWrong: "Raté — le suivant sera un peu plus facile",

  haWarnTitle: "Protégez vos oreilles.",
  haWarn: "Réglez le volume avec le son de contrôle ci-dessous, puis n’y touchez plus. Ne montez jamais le son pour entendre un aigu : des hautes fréquences fortes peuvent abîmer l’audition.",
  haStep1: "Étape 1 : jouez le son de contrôle et réglez-le à un niveau confortable et faible.",
  haPlayCheck: "Son de contrôle (1 kHz)",
  stop: "Arrêter",
  haStep2: "Étape 2 : les sons montent de 8 kHz à 20 kHz. Dites si vous entendez chacun.",
  haHeadphones: "Un casque donne un résultat plus fiable : beaucoup de haut-parleurs de téléphone et d’ordinateur ne montent pas au-delà de 15 kHz.",
  haToneOf: "Son {n} sur {total}",
  haHeard: "Entendu jusqu’ici :",
  haChecked: "{n} fréquences sur {total} testées",
  haListen: "Écoutez attentivement…",
  haQuestion: "Avez-vous entendu un son ?",
  hear: "Je l’entends",
  cantHear: "Je ne l’entends pas",
  playItAgain: "Réécouter",
  haCaught: "L’un des sons était un silence et vous avez dit l’entendre : ce résultat est peut-être trop élevé. Recommencez au casque et ne répondez que si vous êtes sûr.",

  hubMinutes: "Environ 2 minutes",
  hubBeat: "Battre votre record",
  hubTake: "Faire le test",

  shareEyebrow: "On vous lance un défi",
  shareBody: "Soit **{tier}**. {question} Le test est gratuit, dure environ deux minutes et fonctionne dans le navigateur.",
  shareTake: "Faire le {test}",
  sharePrivacy: "Les scores restent dans le navigateur de chaque joueur et se partagent par lien. GuitarTunePro n’a pas de comptes et ne conserve rien sur vous.",
  shareBadTitle: "Avez-vous une bonne oreille ?",
  shareBadBody: "Ce lien est incomplet, mais tous les tests sont ici.",
  shareSeeTests: "Voir les tests musicaux",
  shareMetaDesc: "{question} Faites gratuitement le {test} dans votre navigateur et voyez si vous battez ce score.",
  shareCardAlt: "Carte de résultat du {test}",
  cardFootnote: "Test gratuit · Sans inscription",
  hearingCardSub: "Test gratuit de deux minutes, de 8 à 20 kHz",
  hearingCardTitle: "J’entends jusqu’à {score}. Et vous ?",
};

const DE: TestsUi = {
  names: { "perfect-pitch": "Absolutes-Gehör-Test", "tone-deaf": "Tontaub-Test", "hearing-age": "Höralter-Test" },
  questions: {
    "perfect-pitch": "Erkennst du einen Ton ohne Referenz?",
    "tone-deaf": "Wie kleine Tonhöhenunterschiede hörst du?",
    "hearing-age": "Wie hoch kannst du hören?",
  },
  hubBlurbs: {
    "perfect-pitch": "Zwölf Töne ohne Referenz. Benenne jeden – Raten bringt 1 von 12, absolutes Gehör alle 12.",
    "tone-deaf": "Höher oder tiefer? Der Abstand schrumpft, bis der kleinste Tonhöhenunterschied gefunden ist, den du hörst – in Cent.",
    "hearing-age": "Töne von 8 bis 20 kHz. Der höchste, den du hörst, zeigt, wie alt deine Ohren klingen.",
  },
  pp: [
    { tier: "Absolutes Gehör", detail: "Du hast fast jeden Ton ohne Referenz erkannt – das Kennzeichen des absoluten Gehörs, das oft auf etwa einen von 10.000 Menschen geschätzt wird." },
    { tier: "Starkes Tongedächtnis", detail: "Weit über dem Zufall. Du hast ein stabiles Gedächtnis dafür, wie Töne klingen – viele Menschen mit absolutem Gehör landen bei ungewohnten Klangfarben hier." },
    { tier: "Gutes Tongedächtnis", detail: "Deutlich besser als Raten (Zufall ist 1 von 12). Einige Töne sind in deinem Gedächtnis verankert, vermutlich durch Lieder oder ein Instrument, das du gut kennst." },
    { tier: "Über dem Zufall", detail: "Etwas besser als Raten. Hier landen die meisten Musiker: Sie hören die Beziehungen zwischen Tönen, nicht jeden Ton für sich." },
    { tier: "Relatives Gehör", detail: "Wie die große Mehrheit der Musiker hörst du Töne im Verhältnis zueinander. Das ist die wichtigste Fähigkeit – und sie lässt sich trainieren." },
  ],
  td: [
    { tier: "Außergewöhnliches Gehör", detail: "Du hast einen Unterschied von {c} Cent gehört – ein Zwanzigstel Halbton. Das ist das Niveau geübter Musiker und Klavierstimmer." },
    { tier: "Ausgezeichnetes Gehör", detail: "Feiner als bei den meisten. Kleine Stimmfehler einer Saite werden dich stören – und das ist gut so." },
    { tier: "Gut – nicht tontaub", detail: "Ein normales, gesundes Tonhöhengehör. Du hörst, wenn eine Saite deutlich verstimmt ist." },
    { tier: "Ordentlich – nicht tontaub", detail: "Du hörst Unterschiede deutlich unter einem Halbton, mehr braucht Musik nicht. Mit Übung wird das schnell feiner." },
    { tier: "Unter dem Durchschnitt", detail: "Du hörst etwa einen Halbton, den kleinsten Schritt westlicher Musik. Wiederhole den Test mit Kopfhörern in einem ruhigen Raum – Müdigkeit und Lärm kosten viel." },
    { tier: "Mögliche Schwierigkeit mit Tonhöhen", detail: "Unterschiede unter einem Halbton waren schwer zu hören. Das kann auf eine angeborene Amusie hindeuten (echte „Tontaubheit“, bei etwa 1,5–4 % der Menschen) – aber dies ist ein Browsertest, keine Diagnose." },
  ],
  cents: "{n} Cent",
  cent1: "1 Cent",
  ha: {
    belowScore: "Unter 8 kHz",
    below: { tier: "Ton prüfen", detail: "Fast jeder hört 8 kHz – meist war die Lautstärke zu niedrig oder der Lautsprecher kann diese Frequenz nicht wiedergeben. Probiere es mit Kopfhörern." },
    tier: "Höralter: {age}",
    detail: "Der höchste Ton, den du gehört hast, lag bei {khz} – typisch für {people}. Lärmbelastung und deine Lautsprecher wirken sich so stark aus wie das Alter.",
    ages: ["unter 20", "unter 25", "unter 30", "unter 40", "unter 45", "unter 50", "unter 60", "unter 70", "70 und älter"],
    people: ["Menschen unter 20", "Menschen unter 25", "Menschen unter 30", "Menschen unter 40", "Menschen unter 45", "Menschen unter 50", "Menschen unter 60", "Menschen unter 70", "Menschen ab 70"],
    cardLabel: "Ohren {age}",
  },
  brag: {
    "perfect-pitch": "Ich habe {score} im Absolutes-Gehör-Test",
    "tone-deaf": "Ich höre einen Tonhöhenunterschied von {score}",
    "hearing-age": "Ich höre bis {score} – {tier}",
    hearingNone: "Ich habe den Höralter-Test gemacht",
  },
  friend: {
    "perfect-pitch": "Dein Freund hat {score} im Absolutes-Gehör-Test",
    "tone-deaf": "Dein Freund hört einen Tonhöhenunterschied von {score}",
    "hearing-age": "Dein Freund hört bis {score}",
    hearingNone: "Dein Freund hat den Höralter-Test gemacht",
  },
  beatMe: "Schaffst du mehr?",
  canYouBeatIt: "Schaffst du das?",
  canYou: "Und du?",

  yourResult: "Dein Ergebnis",
  newBest: "Neue Bestleistung!",
  yourBest: "Deine Bestleistung: {score}",
  won: "Du hast deinen Freund geschlagen ({score})! Schick die Herausforderung zurück.",
  tie: "Gleichstand mit deinem Freund: {score}.",
  lost: "Diesmal gewinnt dein Freund mit {score}. Revanche?",
  share: "Ergebnis teilen",
  copied: "Kopiert – überall einfügen",
  couldntCopy: "Kopieren fehlgeschlagen",
  challenge: "Freund herausfordern",
  challengeCopied: "Link kopiert",
  saveImage: "Bild speichern",
  tryAgain: "Nochmal",
  moreTests: "Teste deine Ohren weiter",
  dailyChallenge: "Tägliche Challenge",
  allTests: "Alle Musiktests",
  challengedTitle: "Du wurdest herausgefordert.",
  challengedBody: "Ein Freund hat **{score}** erreicht ({tier}). Schaffst du mehr?",
  start: "Test starten",
  bestSoFar: "Deine bisherige Bestleistung:",
  playAgain: "Nochmal abspielen",
  progress: "Fortschritt",
  seeScore: "Ergebnis ansehen",

  ppIntro: "12 Töne, einer nach dem anderen. Benenne jeden – ohne Referenzton und ohne zweiten Versuch.",
  ppIntroNote: "Vor jedem Ton spielt ein kurzer Schwall zufälliger Töne, der die Erinnerung an den vorigen löscht. Ton an, Kopfhörer helfen.",
  ppNoteOf: "Ton {n} von {total}",
  listen: "Hör zu …",
  ppWhich: "Welcher Ton war das?",
  ppCorrect: "Richtig – {note}",
  ppWas: "Es war {note}",
  ppSemitone: " – nur einen Halbton daneben",
  ppNext: "Nächster Ton",

  tdIntro: "Du hörst zwei Töne. War der zweite **höher** oder **tiefer**?",
  tdIntroNote: "Es beginnt mit einem Halbton Abstand und wird mit jeder richtigen Antwort schwerer, bis der kleinste Unterschied gefunden ist, den du hörst. Etwa zwei Minuten. Für ein faires Ergebnis Kopfhörer und einen ruhigen Raum nutzen.",
  tdTrial: "Durchgang {n}",
  tdDiff: "Aktueller Abstand:",
  tdQuestion: "War der zweite Ton höher oder tiefer?",
  higher: "Höher",
  lower: "Tiefer",
  tdRight: "Richtig – jetzt schwerer",
  tdWrong: "Daneben – der nächste wird etwas leichter",

  haWarnTitle: "Schütze deine Ohren.",
  haWarn: "Stell die Lautstärke mit dem Prüfton unten ein und lass sie dann so. Dreh nie lauter, um einen hohen Ton zu hören – laute hohe Frequenzen können das Gehör schädigen.",
  haStep1: "Schritt 1: Spiel den Prüfton ab und stell ihn angenehm leise ein.",
  haPlayCheck: "Prüfton abspielen (1 kHz)",
  stop: "Stopp",
  haStep2: "Schritt 2: Die Töne steigen von 8 kHz bis 20 kHz. Sag bei jedem, ob du ihn hörst.",
  haHeadphones: "Kopfhörer liefern ein genaueres Ergebnis – viele Handy- und Laptop-Lautsprecher schaffen nichts über 15 kHz.",
  haToneOf: "Ton {n} von {total}",
  haHeard: "Bisher gehört:",
  haChecked: "{n} von {total} Frequenzen geprüft",
  haListen: "Genau hinhören …",
  haQuestion: "Hast du einen Ton gehört?",
  hear: "Ich höre ihn",
  cantHear: "Ich höre nichts",
  playItAgain: "Nochmal abspielen",
  haCaught: "Einer der Töne war Stille, und du hast angegeben, ihn zu hören – dieses Ergebnis ist also vielleicht zu hoch. Versuch es nochmal mit Kopfhörern und antworte nur, wenn du sicher bist.",

  hubMinutes: "Etwa 2 Minuten",
  hubBeat: "Bestleistung schlagen",
  hubTake: "Test machen",

  shareEyebrow: "Du wurdest herausgefordert",
  shareBody: "Das ist **{tier}**. {question} Der Test ist kostenlos, dauert etwa zwei Minuten und läuft im Browser.",
  shareTake: "{test} machen",
  sharePrivacy: "Ergebnisse bleiben im Browser jedes Spielers und werden per Link geteilt. GuitarTunePro hat keine Konten und speichert nichts über dich.",
  shareBadTitle: "Wie gut sind deine Ohren?",
  shareBadBody: "Dieser Link ist unvollständig, aber alle Tests sind hier.",
  shareSeeTests: "Zu den Musiktests",
  shareMetaDesc: "{question} Mach den kostenlosen {test} im Browser und schau, ob du dieses Ergebnis schlägst.",
  shareCardAlt: "Ergebniskarte: {test}",
  cardFootnote: "Kostenloser Test · Ohne Anmeldung",
  hearingCardSub: "Kostenloser Zwei-Minuten-Test, 8 bis 20 kHz",
  hearingCardTitle: "Ich höre bis {score}. Und du?",
};

export const TESTS_UI: Record<Locale, TestsUi> = { en: EN, es: ES, pt: PT, fr: FR, de: DE };

const EN_NOTES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
const EN_BUTTONS = ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"];

/** German spells accidentals as syllables (Cis, Es) and calls B natural H. */
const DE_NOTES = ["C", "Cis", "D", "Es", "E", "F", "Fis", "G", "As", "A", "B", "H"];
const DE_BUTTONS = ["C", "Cis/Des", "D", "Dis/Es", "E", "F", "Fis/Ges", "G", "Gis/As", "A", "Ais/B", "H"];

/** Note names for answers and feedback, by pitch class from C. */
export function testNoteNames(locale: Locale) {
  if (locale === "de") return { names: DE_NOTES, buttons: DE_BUTTONS };
  return {
    names: EN_NOTES.map((n) => localName(n, locale)),
    buttons: EN_BUTTONS.map((b) => b.split("/").map((n) => localName(n, locale)).join("/")),
  };
}
