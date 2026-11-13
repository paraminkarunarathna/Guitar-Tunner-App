/** Interface strings for the five practice tools, per language. English is
 *  here too so the components have one source of text. Page prose lives in
 *  lib/i18n/tools/pages-<lang>.ts. */

import type { Locale } from "@/lib/i18n/tuner";

export const fmt = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

// ---------------------------------------------------------------- Tap tempo

export interface TapUi {
  tapAria: string;
  tap: string;
  idle: string;
  oneMore: string;
  /** {marking} {feel} {n} */
  reading: string;
  slower: string;
  faster: string;
  reset: string;
  copy: string;
  copied: string;
  decimals: string;
  half: string;
  double: string;
  perBeat: string;
  perBar: string;
  practice: string;
  metronome: string;
  or: string;
  rhythm: string;
  keys: string;
  /** Feel of each marking, Grave → Presto. */
  feel: string[];
}

export const TAP_UI: Record<Locale, TapUi> = {
  en: {
    tapAria: "Tap to the beat",
    tap: "TAP",
    idle: "Tap the pad to the beat",
    oneMore: "One more tap…",
    reading: "{marking} · {feel} · {n} taps",
    slower: "Slower than any marking",
    faster: "Faster than any marking",
    reset: "Reset",
    copy: "Copy BPM",
    copied: "Copied",
    decimals: "Show decimals",
    half: "Half time",
    double: "Double time",
    perBeat: "Per beat",
    perBar: "Per bar of 4",
    practice: "Practise at {bpm} BPM:",
    metronome: "open the metronome",
    or: "or",
    rhythm: "test your timing at this tempo",
    keys: "Keyboard: Space or Enter to tap, Esc to reset. Taps more than 2.5 seconds apart start a new count.",
    feel: ["Very slow and solemn", "Slow and broad", "Slow and at ease", "A walking pace", "Moderate", "Fast and lively", "Lively and quick", "Very fast"],
  },
  es: {
    tapAria: "Toca al ritmo",
    tap: "TAP",
    idle: "Toca el botón al ritmo de la música",
    oneMore: "Un toque más…",
    reading: "{marking} · {feel} · {n} toques",
    slower: "Más lento que cualquier indicación",
    faster: "Más rápido que cualquier indicación",
    reset: "Reiniciar",
    copy: "Copiar BPM",
    copied: "Copiado",
    decimals: "Mostrar decimales",
    half: "Mitad de tempo",
    double: "Doble de tempo",
    perBeat: "Por pulso",
    perBar: "Por compás de 4",
    practice: "Practica a {bpm} BPM:",
    metronome: "abre el metrónomo",
    or: "o",
    rhythm: "mide tu precisión a este tempo",
    keys: "Teclado: Espacio o Intro para tocar, Esc para reiniciar. Si pasan más de 2.5 segundos entre toques, empieza una cuenta nueva.",
    feel: ["Muy lento y solemne", "Lento y amplio", "Lento y tranquilo", "Paso de caminata", "Moderado", "Rápido y animado", "Animado y ágil", "Muy rápido"],
  },
  pt: {
    tapAria: "Toque no ritmo",
    tap: "TAP",
    idle: "Toque no botão no ritmo da música",
    oneMore: "Mais um toque…",
    reading: "{marking} · {feel} · {n} toques",
    slower: "Mais lento que qualquer indicação",
    faster: "Mais rápido que qualquer indicação",
    reset: "Reiniciar",
    copy: "Copiar BPM",
    copied: "Copiado",
    decimals: "Mostrar decimais",
    half: "Metade do andamento",
    double: "Dobro do andamento",
    perBeat: "Por tempo",
    perBar: "Por compasso de 4",
    practice: "Pratique a {bpm} BPM:",
    metronome: "abra o metrônomo",
    or: "ou",
    rhythm: "teste seu tempo neste andamento",
    keys: "Teclado: Espaço ou Enter para tocar, Esc para reiniciar. Toques com mais de 2,5 segundos de intervalo começam uma nova contagem.",
    feel: ["Muito lento e solene", "Lento e amplo", "Lento e tranquilo", "Passo de caminhada", "Moderado", "Rápido e animado", "Animado e ágil", "Muito rápido"],
  },
  fr: {
    tapAria: "Tapez en rythme",
    tap: "TAP",
    idle: "Tapez sur le bouton en rythme avec la musique",
    oneMore: "Encore un appui…",
    reading: "{marking} · {feel} · {n} appuis",
    slower: "Plus lent que toute indication",
    faster: "Plus rapide que toute indication",
    reset: "Réinitialiser",
    copy: "Copier le BPM",
    copied: "Copié",
    decimals: "Afficher les décimales",
    half: "Demi-tempo",
    double: "Double tempo",
    perBeat: "Par temps",
    perBar: "Par mesure à 4",
    practice: "Travaillez à {bpm} BPM :",
    metronome: "ouvrir le métronome",
    or: "ou",
    rhythm: "testez votre précision à ce tempo",
    keys: "Clavier : Espace ou Entrée pour taper, Échap pour réinitialiser. Plus de 2,5 secondes entre deux appuis relance le comptage.",
    feel: ["Très lent et solennel", "Lent et large", "Lent et tranquille", "Allure de marche", "Modéré", "Rapide et vif", "Vif et léger", "Très rapide"],
  },
  de: {
    tapAria: "Im Takt tippen",
    tap: "TAP",
    idle: "Tippe im Takt der Musik auf die Fläche",
    oneMore: "Noch einmal tippen…",
    reading: "{marking} · {feel} · {n} Tipper",
    slower: "Langsamer als jede Tempobezeichnung",
    faster: "Schneller als jede Tempobezeichnung",
    reset: "Zurücksetzen",
    copy: "BPM kopieren",
    copied: "Kopiert",
    decimals: "Dezimalstellen anzeigen",
    half: "Halbes Tempo",
    double: "Doppeltes Tempo",
    perBeat: "Pro Schlag",
    perBar: "Pro 4er-Takt",
    practice: "Übe mit {bpm} BPM:",
    metronome: "Metronom öffnen",
    or: "oder",
    rhythm: "prüfe dein Timing in diesem Tempo",
    keys: "Tastatur: Leertaste oder Enter zum Tippen, Esc zum Zurücksetzen. Mehr als 2,5 Sekunden Pause beginnt eine neue Zählung.",
    feel: ["Sehr langsam und feierlich", "Langsam und breit", "Langsam und ruhig", "Gehtempo", "Mäßig", "Schnell und lebhaft", "Lebhaft und flink", "Sehr schnell"],
  },
};

// --------------------------------------------------------------- Pitch pipe

export interface PipeUi {
  instrument: string;
  volume: string;
  notesLabel: string;
  idle: string;
  sounding: string;
  stop: string;
  sets: Record<string, { label: string; tip: string }>;
}

export const PIPE_UI: Record<Locale, PipeUi> = {
  en: {
    instrument: "Instrument",
    volume: "Volume",
    notesLabel: "{set} notes",
    idle: "Tap a note to sound it. Tap again to stop.",
    sounding: "Sounding — tune your string until the beating slows and stops.",
    stop: "Stop",
    sets: {}, // English text comes from PIPE_SETS itself.
  },
  es: {
    instrument: "Instrumento",
    volume: "Volumen",
    notesLabel: "Notas de {set}",
    idle: "Toca una nota para que suene. Tócala otra vez para parar.",
    sounding: "Sonando — afina la cuerda hasta que el batido se haga más lento y desaparezca.",
    stop: "Parar",
    sets: {
      guitar: { label: "Guitarra", tip: "Afinación estándar, de grave a aguda: Mi La Re Sol Si Mi. Iguala cada cuerda con su nota. Los altavoces de móvil y portátil reproducen mal el Mi grave (82 Hz): si no lo oyes, usa auriculares o afina la cuerda con el mismo Mi una octava más arriba." },
      "drop-d": { label: "Drop D", tip: "Drop D: baja la sexta cuerda un tono, de Mi a Re. Las otras cinco cuerdas se quedan como están." },
      bass: { label: "Bajo", tip: "Bajo, de grave a agudo: Mi La Re Sol. Los altavoces pequeños apenas reproducen notas tan graves: usa auriculares o afina con la octava superior." },
      ukulele: { label: "Ukelele", tip: "Ukelele estándar, en orden de cuerdas: Sol Do Mi La. La cuerda de Sol es más aguda que la de Do — la afinación reentrante que da al ukelele su sonido." },
      violin: { label: "Violín", tip: "Violín, de grave a agudo: Sol Re La Mi. Afina primero el La y después las demás por quintas justas." },
      chromatic: { label: "Cromático", tip: "Las doce notas desde el Do central. Úsalo con cualquier instrumento o para encontrar la nota de partida de una canción." },
    },
  },
  pt: {
    instrument: "Instrumento",
    volume: "Volume",
    notesLabel: "Notas de {set}",
    idle: "Toque numa nota para ela soar. Toque de novo para parar.",
    sounding: "Soando — afine a corda até o batimento ficar mais lento e sumir.",
    stop: "Parar",
    sets: {
      guitar: { label: "Violão / guitarra", tip: "Afinação padrão, do grave ao agudo: Mi Lá Ré Sol Si Mi. Iguale cada corda à sua nota. Alto-falantes de celular e notebook reproduzem mal o Mi grave (82 Hz): se não ouvir, use fones ou afine a corda com o mesmo Mi uma oitava acima." },
      "drop-d": { label: "Drop D", tip: "Drop D: abaixe a sexta corda um tom, de Mi para Ré. As outras cinco cordas continuam como estão." },
      bass: { label: "Baixo", tip: "Baixo, do grave ao agudo: Mi Lá Ré Sol. Alto-falantes pequenos quase não reproduzem notas tão graves: use fones ou afine pela oitava de cima." },
      ukulele: { label: "Ukulele", tip: "Ukulele padrão, na ordem das cordas: Sol Dó Mi Lá. A corda Sol é mais aguda que a Dó — a afinação reentrante que dá ao ukulele o seu som." },
      violin: { label: "Violino", tip: "Violino, do grave ao agudo: Sol Ré Lá Mi. Afine o Lá primeiro e depois as outras em quintas justas." },
      chromatic: { label: "Cromático", tip: "As doze notas a partir do Dó central. Use com qualquer instrumento ou para achar a nota inicial de uma música." },
    },
  },
  fr: {
    instrument: "Instrument",
    volume: "Volume",
    notesLabel: "Notes : {set}",
    idle: "Touchez une note pour la jouer. Touchez-la encore pour l’arrêter.",
    sounding: "En cours — accordez la corde jusqu’à ce que les battements ralentissent et disparaissent.",
    stop: "Arrêter",
    sets: {
      guitar: { label: "Guitare", tip: "Accordage standard, du grave à l’aigu : Mi La Ré Sol Si Mi. Accordez chaque corde sur sa note. Les haut-parleurs de téléphone ou d’ordinateur rendent mal le Mi grave (82 Hz) : si vous ne l’entendez pas, utilisez un casque ou accordez la corde sur le même Mi, une octave plus haut." },
      "drop-d": { label: "Drop D", tip: "Drop D : descendez la sixième corde d’un ton, du Mi au Ré. Les cinq autres cordes ne bougent pas." },
      bass: { label: "Basse", tip: "Basse, du grave à l’aigu : Mi La Ré Sol. Les petits haut-parleurs reproduisent à peine des notes aussi graves : utilisez un casque ou accordez sur l’octave supérieure." },
      ukulele: { label: "Ukulélé", tip: "Ukulélé standard, dans l’ordre des cordes : Sol Do Mi La. La corde de Sol est plus aiguë que celle de Do — l’accordage rentrant qui donne son son au ukulélé." },
      violin: { label: "Violon", tip: "Violon, du grave à l’aigu : Sol Ré La Mi. Accordez d’abord le La, puis les autres par quintes justes." },
      chromatic: { label: "Chromatique", tip: "Les douze notes à partir du Do central. Pour n’importe quel instrument, ou pour trouver la note de départ d’un morceau." },
    },
  },
  de: {
    instrument: "Instrument",
    volume: "Lautstärke",
    notesLabel: "Töne: {set}",
    idle: "Tippe einen Ton an, damit er erklingt. Nochmal tippen beendet ihn.",
    sounding: "Läuft — stimme die Saite, bis die Schwebung langsamer wird und verschwindet.",
    stop: "Stopp",
    sets: {
      guitar: { label: "Gitarre", tip: "Standardstimmung, tief nach hoch: E A D G H E. Gleiche jede Saite an ihren Ton an. Handy- und Laptop-Lautsprecher geben das tiefe E (82 Hz) schlecht wieder: Hörst du es nicht, nimm Kopfhörer oder stimme die Saite auf das E eine Oktave höher." },
      "drop-d": { label: "Drop D", tip: "Drop D: Stimme die tiefe E-Saite einen Ganzton tiefer auf D. Die anderen fünf Saiten bleiben, wie sie sind." },
      bass: { label: "Bass", tip: "Bass, tief nach hoch: E A D G. Kleine Lautsprecher geben so tiefe Töne kaum wieder: Nimm Kopfhörer oder stimme nach der höheren Oktave." },
      ukulele: { label: "Ukulele", tip: "Standard-Ukulele, in Saitenreihenfolge: G C E A. Die G-Saite liegt höher als die C-Saite — die „Re-entrant“-Stimmung, die den Ukulele-Klang ausmacht." },
      violin: { label: "Geige", tip: "Geige, tief nach hoch: G D A E. Stimme zuerst das A und danach die übrigen Saiten in reinen Quinten." },
      chromatic: { label: "Chromatisch", tip: "Alle zwölf Töne ab dem eingestrichenen C. Für jedes Instrument oder um den Startton eines Liedes zu finden." },
    },
  },
};

// ------------------------------------------------------------- Tuning fork

export interface ForkUi {
  choose: string;
  strikeAria: string;
  ringing: string;
  idle: string;
  damp: string;
  /** Typical use for each fork, in the order of FORKS. */
  uses: string[];
}

export const FORK_UI: Record<Locale, ForkUi> = {
  en: {
    choose: "Choose a fork",
    strikeAria: "Strike the {fork} tuning fork",
    ringing: "Ringing — hold it near your ear",
    idle: "Tap the fork to strike it",
    damp: "Damp the fork",
    uses: [], // English text comes from FORKS itself.
  },
  es: {
    choose: "Elige un diapasón",
    strikeAria: "Golpear el diapasón de {fork}",
    ringing: "Sonando — acércalo al oído",
    idle: "Toca el diapasón para golpearlo",
    damp: "Silenciar el diapasón",
    uses: [
      "El tono de concierto internacional. Las orquestas afinan con él y también los afinadores de guitarra: la cuerda La al aire suena a 110 Hz, dos octavas más abajo.",
      "Algo más agudo, usado por muchas orquestas europeas y para un sonido de cuerdas más brillante.",
      "El La de Verdi, preferido por algunos músicos por su sonido más cálido. Consulta el afinador de 432 Hz.",
      "La primera cuerda de la guitarra (Mi4). Afina la cuerda fina con él y las demás a partir de ella.",
      "La octava del Do central (Do5). Habitual en diapasones médicos y didácticos, y buena referencia para el oído.",
      "Tono científico o «filosófico»: todos los Do son potencias de dos. Referencia de enseñanza y acústica.",
    ],
  },
  pt: {
    choose: "Escolha um diapasão",
    strikeAria: "Bater o diapasão de {fork}",
    ringing: "Soando — aproxime do ouvido",
    idle: "Toque no diapasão para bater nele",
    damp: "Silenciar o diapasão",
    uses: [
      "O tom de concerto internacional. Orquestras afinam por ele, e os afinadores de violão também: a corda Lá solta soa a 110 Hz, duas oitavas abaixo.",
      "Um pouco mais agudo, usado por muitas orquestras europeias e para um som de cordas mais brilhante.",
      "O Lá de Verdi, preferido por alguns músicos pelo som mais caloroso. Veja o afinador de 432 Hz.",
      "A primeira corda do violão (Mi4). Afine a corda fina por ele e as demais a partir dela.",
      "A oitava do Dó central (Dó5). Comum em diapasões médicos e didáticos, e boa referência para o ouvido.",
      "Tom científico ou «filosófico»: todo Dó é uma potência de dois. Referência de ensino e acústica.",
    ],
  },
  fr: {
    choose: "Choisissez un diapason",
    strikeAria: "Frapper le diapason {fork}",
    ringing: "Il résonne — approchez-le de l’oreille",
    idle: "Touchez le diapason pour le frapper",
    damp: "Étouffer le diapason",
    uses: [
      "Le diapason de concert international. Les orchestres s’y accordent, et les accordeurs de guitare aussi : la corde de La à vide sonne à 110 Hz, deux octaves plus bas.",
      "Un peu plus aigu, utilisé par de nombreux orchestres européens pour un son de cordes plus brillant.",
      "Le La de Verdi, préféré par certains musiciens pour sa chaleur. Voir l’accordeur 432 Hz.",
      "La première corde de la guitare (Mi4). Accordez la corde fine dessus, puis les autres à partir d’elle.",
      "L’octave du Do central (Do5). Courant pour les diapasons médicaux et pédagogiques, et bonne référence pour l’oreille.",
      "Diapason scientifique ou « philosophique » : tous les Do sont des puissances de deux. Référence en enseignement et en acoustique.",
    ],
  },
  de: {
    choose: "Wähle eine Stimmgabel",
    strikeAria: "Stimmgabel {fork} anschlagen",
    ringing: "Klingt — halte sie ans Ohr",
    idle: "Tippe auf die Gabel, um sie anzuschlagen",
    damp: "Gabel abdämpfen",
    uses: [
      "Der internationale Kammerton. Orchester stimmen danach, und Gitarrenstimmgeräte ebenso: Die leere A-Saite klingt mit 110 Hz, zwei Oktaven tiefer.",
      "Etwas höher, von vielen europäischen Orchestern verwendet, für einen helleren Streicherklang.",
      "Verdis A, von manchen Musikern wegen des wärmeren Klangs bevorzugt. Siehe das 432-Hz-Stimmgerät.",
      "Die hohe E-Saite der Gitarre (E4). Stimme die dünne Saite darauf und die übrigen von dort aus.",
      "Die Oktave des eingestrichenen C (C5). Häufig bei medizinischen und pädagogischen Gabeln, gute Hörreferenz.",
      "Wissenschaftliche oder „philosophische“ Stimmung: Jedes C ist eine Zweierpotenz. Referenz in Unterricht und Akustik.",
    ],
  },
};

// --------------------------------------------------------------- Chord quiz

export interface QuizUi {
  level: string;
  levels: { label: string; blurb: string }[];
  streak: string;
  best: string;
  question: string;
  diagram: string;
  hear: string;
  correct: string;
  wrong: string;
  notes: string;
  next: string;
  hint: string;
  revisit: string;
}

export const QUIZ_UI: Record<Locale, QuizUi> = {
  en: {
    level: "Level",
    levels: [], // English comes from QUIZ_LEVELS.
    streak: "Current streak",
    best: "Best streak",
    question: "What chord is this?",
    diagram: "Chord shape — name this chord",
    hear: "Hear it (H)",
    correct: "Correct.",
    wrong: "Not quite — it is {chord}.",
    notes: "Notes:",
    next: "Next chord",
    hint: "Pick a chord, or press 1–4. Strings run low to high, left to right; × is muted, ○ is open.",
    revisit: "Chords to revisit",
  },
  es: {
    level: "Nivel",
    levels: [
      { label: "Mayores y menores abiertos", blurb: "Los primeros acordes que todos aprenden" },
      { label: "Todos los abiertos", blurb: "Añade séptimas, sus y más" },
      { label: "Todo", blurb: "Cejillas y todas las cualidades" },
    ],
    streak: "Racha actual",
    best: "Mejor racha",
    question: "¿Qué acorde es este?",
    diagram: "Forma de acorde — nombra este acorde",
    hear: "Escúchalo (H)",
    correct: "¡Correcto!",
    wrong: "Casi — es {chord}.",
    notes: "Notas:",
    next: "Siguiente acorde",
    hint: "Elige un acorde o pulsa 1–4. Las cuerdas van de grave a aguda, de izquierda a derecha; × es muda, ○ es al aire.",
    revisit: "Acordes para repasar",
  },
  pt: {
    level: "Nível",
    levels: [
      { label: "Maiores e menores abertos", blurb: "Os primeiros acordes que todo mundo aprende" },
      { label: "Todos os abertos", blurb: "Inclui sétimas, sus e mais" },
      { label: "Tudo", blurb: "Pestanas e todas as qualidades" },
    ],
    streak: "Sequência atual",
    best: "Melhor sequência",
    question: "Que acorde é este?",
    diagram: "Forma de acorde — dê o nome deste acorde",
    hear: "Ouvir (H)",
    correct: "Certo!",
    wrong: "Quase — é {chord}.",
    notes: "Notas:",
    next: "Próximo acorde",
    hint: "Escolha um acorde ou aperte 1–4. As cordas vão do grave ao agudo, da esquerda para a direita; × é abafada, ○ é solta.",
    revisit: "Acordes para revisar",
  },
  fr: {
    level: "Niveau",
    levels: [
      { label: "Majeurs et mineurs ouverts", blurb: "Les premiers accords que tout le monde apprend" },
      { label: "Tous les accords ouverts", blurb: "Ajoute septièmes, sus et autres" },
      { label: "Tout", blurb: "Barrés et toutes les qualités" },
    ],
    streak: "Série en cours",
    best: "Meilleure série",
    question: "Quel est cet accord ?",
    diagram: "Forme d’accord — nommez cet accord",
    hear: "Écouter (H)",
    correct: "Exact !",
    wrong: "Presque — c’est {chord}.",
    notes: "Notes :",
    next: "Accord suivant",
    hint: "Choisissez un accord ou appuyez sur 1–4. Les cordes vont du grave à l’aigu, de gauche à droite ; × est étouffée, ○ est à vide.",
    revisit: "Accords à revoir",
  },
  de: {
    level: "Stufe",
    levels: [
      { label: "Offene Dur- und Moll-Akkorde", blurb: "Die ersten Akkorde, die jeder lernt" },
      { label: "Alle offenen Akkorde", blurb: "Mit Septakkorden, Sus und mehr" },
      { label: "Alles", blurb: "Barré-Griffe und alle Akkordarten" },
    ],
    streak: "Aktuelle Serie",
    best: "Beste Serie",
    question: "Welcher Akkord ist das?",
    diagram: "Akkordgriff — benenne diesen Akkord",
    hear: "Anhören (H)",
    correct: "Richtig!",
    wrong: "Fast — es ist {chord}.",
    notes: "Töne:",
    next: "Nächster Akkord",
    hint: "Wähle einen Akkord oder drücke 1–4. Die Saiten laufen von tief nach hoch, links nach rechts; × ist gedämpft, ○ ist leer.",
    revisit: "Akkorde zum Wiederholen",
  },
};
