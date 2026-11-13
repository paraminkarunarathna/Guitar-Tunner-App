import type { ToolPageCopy } from "./types";

export const toolPagesEs: Record<string, ToolPageCopy> = {
  "/tap-tempo": {
    metaTitle: "Contador de BPM — Tap Tempo online",
    metaDescription:
      "Contador de BPM gratis: toca al ritmo de cualquier canción y ve su tempo, la indicación italiana y el doble o la mitad. Practica después con el metrónomo.",
    title: "Contador de BPM (Tap Tempo)",
    description:
      "Toca el botón al ritmo de una canción y lee su tempo en pulsos por minuto. Con dos toques tienes una primera idea; con diez, un resultado estable.",
    label: "Contador de BPM",
    sections: [
      {
        heading: "Cómo averiguar los BPM de una canción",
        body: [
          {
            steps: [
              "Pon la canción, o tararea una que te sepas bien.",
              "Toca el botón —o pulsa **Espacio**— en cada pulso. Elige el pulso con el que marcarías el ritmo con el pie.",
              "Sigue entre ocho y diez toques. La lectura se estabiliza al promediar más datos.",
              "Si el número te parece demasiado rápido o lento, mira la mitad y el doble de tempo; después abre el metrónomo para practicar a esa velocidad.",
            ],
          },
        ],
      },
      {
        heading: "Qué significan los BPM",
        body: [
          "BPM son los pulsos por minuto: cuántos latidos regulares caben en sesenta segundos. A 60 BPM hay un pulso por segundo; a 120, dos. El tempo es el dato más útil para estudiar una canción, porque te permite bajar la velocidad de un pasaje difícil, tocarlo limpio y volver a subirla poco a poco.",
        ],
      },
      {
        heading: "Indicaciones de tempo y rangos de BPM",
        body: [
          "Antes de los metrónomos, los compositores describían la velocidad en italiano. Esas palabras siguen en las partituras y cada una corresponde a un rango de BPM. La herramienta te dice en cuál cae tu lectura.",
          { table: ["Indicación", "BPM"] },
        ],
      },
      {
        heading: "Consejos para tocar con precisión",
        body: [
          {
            list: [
              "**Toca justo en el pulso, no después.** Es normal reaccionar un poco tarde, pero como todos los toques se retrasan casi igual, los intervalos —y los BPM— salen bien.",
              "**Usa una parte estable.** Intros, redobles y puentes suelen cambiar el pulso. Una estrofa o un estribillo dan el tempo más fiel.",
              "**Empieza de cero con cada canción.** Una pausa de más de dos segundos y medio reinicia la cuenta; también puedes usar Reiniciar o Esc.",
              "**Los toques se miden al pulsar,** sin esperar a que levantes el dedo, así no hay retraso.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo funciona el tap tempo?",
        answer:
          "Cada vez que tocas, la página anota el instante exacto. Los BPM son el número de intervalos entre toques dividido por el tiempo total que abarcan, llevado a un minuto. Al promediar los últimos diez toques, un toque adelantado o atrasado apenas mueve el resultado.",
      },
      {
        question: "¿Cuántos toques necesito?",
        answer:
          "Con dos toques ya hay un número, pero es solo una primera idea. Entre ocho y diez toques dan una lectura estable en casi todas las canciones. Si la cifra sigue cambiando unos BPM, puede que la propia canción varíe de velocidad, como pasa en directo; el promedio es la respuesta honesta.",
      },
      {
        question: "¿Toco cada pulso o uno de cada dos?",
        answer:
          "Toca el pulso con el que moverías la cabeza o el pie, normalmente la negra. Si el resultado es justo el doble o la mitad de lo esperado, es cuestión de sensación, no un error: debajo de la lectura tienes la mitad y el doble de tempo.",
      },
      {
        question: "¿Por qué el número difiere del que veo en internet?",
        answer:
          "Las bases de datos suelen dar un único tempo redondeado, aunque la pista acelere un poco o se sienta a la mitad o al doble. Toca durante una estrofa y un estribillo y quédate con la cifra a la que puedas tocar cómodo.",
      },
      {
        question: "¿Cómo practico al tempo que he encontrado?",
        answer:
          "Usa los enlaces bajo la lectura: abren el metrónomo con los BPM ya puestos, o el entrenador de ritmo, que puntúa lo cerca del pulso que caen tus toques.",
      },
    ],
  },

  "/pitch-pipe": {
    metaTitle: "Diapasón de boca online — afina de oído",
    metaDescription:
      "Diapasón de boca gratis: notas sostenidas para guitarra, bajo, ukelele y violín, o las 12 notas cromáticas. Afina de oído, sin micrófono.",
    title: "Diapasón de boca online",
    description:
      "Elige tu instrumento y toca la nota de una cuerda: suena fija mientras afinas. Sin micrófono ni permisos.",
    label: "Diapasón de boca",
    sections: [
      {
        heading: "Cómo usar el diapasón de boca",
        body: [
          {
            steps: [
              "Elige tu instrumento en la fila superior.",
              "Toca la nota de la cuerda que quieres afinar. Suena hasta que la toques otra vez o elijas otra.",
              "Puntea la cuerda al aire y escucha cómo los dos sonidos «baten» entre sí.",
              "Gira la clavija despacio hasta que el batido se haga más lento y desaparezca. Acércate siempre a la nota desde abajo —subiendo— para que la cuerda se asiente.",
            ],
          },
        ],
      },
      {
        heading: "Notas y frecuencias",
        body: [
          "Todas las notas se calculan con La4 = 440 Hz en temperamento igual, los mismos objetivos que escucha el afinador de guitarra.",
          { table: ["Instrumento", "Notas (de grave a agudo)", "Frecuencias"] },
        ],
      },
      {
        heading: "Por qué merece la pena afinar de oído",
        body: [
          "Un afinador te dice dónde está la cuerda; tu oído te dice si suena bien con las demás. Quien afina de oído nota cuándo un acorde está algo desajustado y lo arregla en segundos, sin aparatos. Una nota de referencia es la forma más rápida de educar ese oído, porque el batido entre dos alturas cercanas es evidente en cuanto sabes escucharlo. Complétalo con el diapasón online, de sonido más puro y breve.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué es un diapasón de boca?",
        answer:
          "Es un pequeño instrumento de lengüeta que emite una sola nota de referencia. Los directores de coro lo usan para dar la nota inicial y los instrumentistas de cuerda para afinar de oído. Esta versión online hace lo mismo desde tu altavoz, con una nota para cada cuerda de los instrumentos habituales.",
      },
      {
        question: "¿Cómo afino la guitarra con él?",
        answer:
          "Haz sonar la nota de una cuerda —por ejemplo el La— y toca esa cuerda al aire a la vez. Si las alturas no coinciden oirás un vaivén lento, el batido. Gira la clavija hasta que se ralentice y desaparezca; los dos sonidos se funden en uno. Repite con cada cuerda, empezando por la sexta.",
      },
      {
        question: "¿Por qué apenas oigo las notas graves?",
        answer:
          "Los altavoces pequeños no mueven suficiente aire por debajo de unos 100 Hz, lo que incluye el Mi grave de la guitarra (82 Hz) y todas las cuerdas del bajo. Usa auriculares o afina con la misma nota una octava más arriba, que se oye bien.",
      },
      {
        question: "¿En qué se diferencia de un afinador?",
        answer:
          "Un afinador escucha tu instrumento y te dice cuánto te desvías. El diapasón de boca emite el objetivo y deja que juzgue tu oído. No necesita micrófono y entrena el oído; la mayoría de músicos usa ambos.",
      },
      {
        question: "¿Qué cambia el ajuste A4?",
        answer:
          "Fija el tono de concierto desde el que se miden todas las notas. 440 Hz es el estándar; 442 y 443 los usan algunas orquestas y 432 quien prefiere un sonido más cálido. Si tocas con una grabación u otro instrumento, iguala su tono; si no, déjalo en 440.",
      },
    ],
  },

  "/tuning-fork": {
    metaTitle: "Diapasón online — La 440, Mi, Do",
    metaDescription:
      "Diapasón virtual gratis: golpea un La 440, 442, 432, Mi 329 o Do 523 y escúchalo sonar y apagarse. Afina guitarra, violín o la voz.",
    title: "Diapasón online",
    description:
      "Golpea el diapasón y escucha cómo suena y se apaga. Úsalo como referencia pura para afinar una cuerda o tu voz.",
    label: "Diapasón online",
    sections: [
      {
        heading: "Los diapasones y para qué sirven",
        body: [{ table: ["Diapasón", "Frecuencia", "Uso habitual"] }],
      },
      {
        heading: "Cómo afinar con un diapasón",
        body: [
          {
            steps: [
              "Elige un diapasón y púlsalo para golpearlo. Suena unos diez segundos.",
              "Toca la cuerda correspondiente: el La con la cuerda La, el Mi con la primera.",
              "Escucha el batido: un pulso lento de volumen que indica que las dos alturas difieren unos hercios. Cuanto más lento, más cerca; cuando para, coinciden.",
              "Afina las demás cuerdas a partir de esa con el método del quinto traste, o hazlas sonar una a una en el diapasón de boca.",
            ],
          },
        ],
      },
      {
        heading: "¿Diapasón o afinador?",
        body: [
          "El afinador cromático muestra cuántos cents te pasas o te quedas cortos. El diapasón no te da nada que leer: te da un sonido limpio al que igualar, que se aprende más despacio pero forma el oído. Muchos profesores piden afinar de oído con el diapasón y comprobar luego con el afinador.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo funciona un diapasón?",
        answer:
          "Es una barra de acero en forma de U. Al golpearla, sus dos ramas oscilan a una frecuencia fija que depende de su longitud y rigidez. Produce una onda casi sinusoidal, con muy pocos armónicos, y por eso es una referencia tan limpia. Un diapasón de 440 Hz vibra 440 veces por segundo.",
      },
      {
        question: "¿Cómo afino la guitarra con un La 440?",
        answer:
          "Golpea el diapasón y toca la cuerda La al aire, que suena a 110 Hz, dos octavas por debajo. Giras la clavija hasta que el batido desaparece. Después afina las demás a partir del La con el método del quinto traste: el traste 5 de la sexta cuerda es un La, el traste 5 de la quinta es un Re, y así sucesivamente.",
      },
      {
        question: "¿Por qué se apaga el sonido?",
        answer:
          "Un diapasón real pierde energía por el aire y por tu mano, así que la nota decae en unos segundos. Este suena unos diez, con el «clang» inicial extinguiéndose casi al instante, como en uno de acero. Vuelve a tocar para golpear de nuevo o pulsa Silenciar para pararlo.",
      },
      {
        question: "¿Cuál debo usar?",
        answer:
          "El La 440 Hz para casi todo: es el estándar internacional. El Mi 329,63 Hz sirve para afinar la cuerda fina de la guitarra. El La 442 Hz va bien con orquestas que afinan alto, y el 432 Hz gusta a algunos músicos. Los diapasones de Do se usan en enseñanza y acústica.",
      },
      {
        question: "¿Es tan exacto como uno de verdad?",
        answer:
          "La altura se calcula, así que es exacta hasta donde lo es el reloj de audio de tu dispositivo: mejor que un diapasón barato, que puede desviarse varios cents y cambia algo con la temperatura. El timbre es sintético y no iguala el de uno de acero, pero lo que cuenta para afinar es la altura.",
      },
    ],
  },

  "/chord-quiz": {
    metaTitle: "Quiz de acordes de guitarra — nombra la forma",
    metaDescription:
      "Quiz de acordes de guitarra gratis: aparece un diagrama y debes nombrarlo. Empieza con acordes abiertos y sube a séptimas y cejillas. Con rachas y audio.",
    title: "Quiz de acordes de guitarra",
    description:
      "Mira el diagrama y nombra el acorde. Las respuestas incorrectas son acordes parecidos, porque esa es la destreza que importa.",
    label: "Quiz de acordes",
    sections: [
      {
        heading: "Cómo funciona el quiz",
        body: [
          {
            steps: [
              "Elige un nivel. Los acordes abiertos mayores y menores son el mejor punto de partida.",
              "Observa el diagrama y elige el nombre correcto entre cuatro opciones, o pulsa de 1 a 4.",
              "Al responder oyes el acorde y ves sus notas. Pulsa Siguiente, o N, para otro.",
              "Los acordes que fallas vuelven más a menudo hasta que se te quedan.",
            ],
          },
          "Los acordes se escriben con letras (C, Dm, G7), como en la mayoría de cifrados de guitarra: C = Do, D = Re, E = Mi, F = Fa, G = Sol, A = La, B = Si.",
        ],
      },
      {
        heading: "Consejos para aprender las formas",
        body: [
          {
            list: [
              "**Aprende por familias.** Las formas abiertas de Mi y de La están detrás de todos los acordes con cejilla. La biblioteca de acordes muestra cada una en todas las tonalidades.",
              "**Di las notas.** Cada respuesta enumera las notas del acorde. Un acorde es una receta, y conocerla hace memorable el nombre.",
              "**Toca también la forma.** Después de cada pregunta, reprodúcela en tu guitarra. El buscador de acordes funciona al revés: marcas una forma y te da el nombre.",
              "**Hazlo corto.** Diez preguntas al día valen más que una hora a la semana. Cuenta para tu racha de práctica.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo se lee un diagrama de acordes?",
        answer:
          "Las líneas verticales son las cuerdas, la más gruesa a la izquierda, y las horizontales son los trastes. Un punto indica dónde poner un dedo, una O sobre la cuerda significa tocarla al aire y una X, no tocarla. Si el diagrama empieza más arriba del primer traste, un número a su lado indica cuál.",
      },
      {
        question: "¿Para qué aprender los acordes a primera vista?",
        answer:
          "Reconocer una forma al instante permite leer un cifrado, identificar un acorde en las manos de otro guitarrista y encontrar el siguiente sin parar. Además hace que el mástil tenga sentido: ves que un menor es un mayor con un dedo movido.",
      },
      {
        question: "¿Qué significan los niveles?",
        answer:
          "Mayores y menores abiertos: los primeros acordes que todo el mundo aprende. Todos los abiertos: añade séptimas, sus y más. Todo: incluye cejillas y todas las cualidades.",
      },
      {
        question: "¿Qué son los acordes para repasar?",
        answer:
          "Cuando has respondido un acorde al menos tres veces con menos del 70 % de aciertos, aparece bajo el quiz y se muestra con más frecuencia. Tus resultados se guardan en este dispositivo, salvo que los muevas con el enlace de transferencia de progreso.",
      },
      {
        question: "¿Por qué dos acordes pueden sonar igual?",
        answer:
          "Algunos acordes contienen exactamente las mismas notas con nombres distintos, como C6 y Am7. El quiz nunca ofrece ambos en una misma pregunta, así que solo hay una respuesta correcta.",
      },
    ],
  },

  "/setlist-builder": {
    metaTitle: "Creador de setlist — canciones y afinaciones",
    metaDescription:
      "Creador de setlist gratis para guitarristas: tonalidad, BPM, cejilla y afinación por canción, avisos de reafinación, impresión y enlace para compartir.",
    title: "Creador de setlist",
    description:
      "Añade tus canciones con tonalidad, tempo, cejilla y afinación, y la lista te muestra dónde tendrás que reafinar en el escenario.",
    label: "Creador de setlist",
    sections: [
      {
        heading: "Cómo montar un setlist que funcione",
        body: [
          {
            steps: [
              "Añade cada canción con su tonalidad, tempo, afinación y duración. Lo que no sepas, déjalo en blanco.",
              "Ordénalas con las flechas. Verás aparecer avisos de reafinación entre canciones de distinta afinación.",
              "Prueba «Agrupar por afinación» para ver cuántas reafinaciones puedes quitar, y decide si el ritmo del concierto sigue funcionando.",
              "Imprímelo o copia el enlace para la banda.",
            ],
          },
        ],
      },
      {
        heading: "Cómo dosificar un concierto",
        body: [
          {
            list: [
              "**Abre fuerte, no rápido.** Una canción conocida a un tempo cómodo calma los nervios y a la sala.",
              "**Varía tempo y tonalidad.** Tres canciones a la misma velocidad y en el mismo tono se funden. Los campos de BPM y tonalidad lo hacen visible de un vistazo.",
              "**Pon las reafinaciones donde se habla.** Cambiar de afinación es más fácil mientras la banda presenta una canción o saluda. El diapasón de boca y el afinador sirven para ir rápido.",
              "**Conoce tu tempo.** Si no sabes los BPM de una canción, márcalos con el contador de BPM y anota el resultado.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo funciona el aviso de reafinación?",
        answer:
          "Cuando una canción necesita una afinación distinta a la anterior, la lista marca el cambio entre ambas. Menos reafinaciones significan menos pausas incómodas y menos cuerdas desajustadas tras un ajuste rápido. «Agrupar por afinación» junta las canciones de la misma afinación manteniendo su orden relativo y te dice cuántas reafinaciones ahorra.",
      },
      {
        question: "¿Se guarda mi setlist?",
        answer:
          "Sí, en este dispositivo, en el almacenamiento de tu navegador. No se sube nada. Para abrir la misma lista en otro dispositivo o mandársela a un compañero, usa Copiar enlace: la lista viaja dentro del propio enlace, en la parte tras el #, que los navegadores nunca envían a un servidor.",
      },
      {
        question: "¿Puedo imprimir el setlist para el escenario?",
        answer:
          "Pulsa Imprimir. La página oculta todo salvo la lista, en negro sobre blanco y con los avisos de reafinación. Si tocas con poca luz, usa una letra grande en los ajustes de impresión del navegador.",
      },
      {
        question: "¿Qué afinaciones puedo elegir?",
        answer:
          "Estándar, medio tono abajo, un tono abajo, Drop D, Drop C, DADGAD y las abiertas de Sol, Re, Mi, La y Do. Cada una enlaza con su afinador para que afines antes del concierto.",
      },
      {
        question: "¿Sirve para canciones con cejilla?",
        answer:
          "Sí. Indica el traste de la cejilla en cada canción. La cejilla no cambia la afinación, así que no cuenta como reafinación, pero es un objeto que hay que mover y conviene verlo en la lista.",
      },
    ],
  },
};
