import type { ToolPageCopy } from "./types";

export const testPagesEs: Record<string, ToolPageCopy> = {
  "/perfect-pitch-test": {
    metaTitle: "Test de oído absoluto — ¿Tienes oído perfecto?",
    metaDescription:
      "Test de oído absoluto gratis: escucha 12 notas sin referencia y nombra cada una. Descubre en dos minutos si tienes oído perfecto y reta a tus amigos.",
    title: "Test de oído absoluto",
    description:
      "Doce notas, una a una, sin nota de referencia con la que comparar. Nombra cada una y descubre si tienes oído absoluto (también llamado oído perfecto).",
    label: "Test de oído absoluto",
    sections: [
      {
        heading: "Cómo funciona el test",
        body: [
          "El test toca 12 notas elegidas al azar en tres octavas, de Do3 a Si5: el registro de una guitarra desde las cuerdas centrales hasta el traste 12 de la primera. Respondes con el nombre de la nota (Do, Do♯/Re♭, Re…); la octava no importa.",
          "Dos detalles impiden que se convierta en un test de intervalos. Antes de cada nota suena una ráfaga breve de tonos aleatorios que borra el recuerdo de la anterior, y dos notas seguidas nunca comparten nombre ni están a menos de tres semitonos. Además, el timbre alterna entre una cuerda pulsada y un tono más estable, porque quien tiene oído absoluto reconoce la nota sea cual sea el instrumento.",
          "Adivinando se acierta una nota de cada doce. Cualquier resultado claramente superior indica que algunas notas están fijadas en tu memoria.",
        ],
      },
      {
        heading: "Qué significa tu resultado",
        body: [{ table: ["Aciertos", "Resultado"] }],
      },
      {
        heading: "Oído absoluto frente a oído relativo",
        body: [
          "El oído absoluto es raro y no hace falta para ser un gran músico: la mayoría de los grandes intérpretes no lo tienen. Lo que sí tienen es un excelente **oído relativo**: oyen que una melodía sube una tercera mayor, que un acorde es menor o que una cuerda está unos cents baja respecto a la de al lado.",
          "El oído relativo se entrena a cualquier edad. El test de oído musical de esta misma serie mide lo finamente que distingues la afinación, que es justo la habilidad que permite afinar de oído.",
        ],
      },
      {
        heading: "Consejos para un resultado justo",
        body: [
          {
            list: [
              "Hazlo en silencio. La música de fondo es una nota de referencia y falsea el resultado.",
              "Responde por instinto. El oído absoluto es inmediato; deducir la nota a partir de una canción es otra habilidad.",
              "No tararees ni toques nada entre notas: para eso están los tonos aleatorios.",
              "Repítelo otro día. Una sola ronda de 12 notas tiene algo de suerte, y tu mejor resultado se guarda.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo sé si tengo oído absoluto?",
        answer:
          "Quien tiene oído absoluto nombra una nota al instante y sin esfuerzo, como quien nombra un color: sin nota de referencia y sin tararear una canción conocida. Si sacas 11 o 12 de 12 en un test así, con rapidez y con distintos timbres, es muy probable que lo tengas. Los resultados intermedios suelen indicar buena memoria tonal más que oído absoluto.",
      },
      {
        question: "¿Qué tan raro es el oído absoluto?",
        answer:
          "Se suele estimar en una de cada 10.000 personas. Es mucho más frecuente en músicos que empezaron a estudiar en la primera infancia, y algunos estudios encuentran tasas más altas entre hablantes de lenguas tonales que también empezaron la música de pequeños.",
      },
      {
        question: "¿En qué se diferencian el oído absoluto y el relativo?",
        answer:
          "El oído absoluto es nombrar una nota sin referencia. El relativo es oír la distancia entre notas, por ejemplo saber que la segunda está una quinta por encima de la primera. El oído relativo es el que te permite tocar de oído, transportar y afinar la guitarra consigo misma, y casi cualquiera puede entrenarlo.",
      },
      {
        question: "¿Se puede aprender el oído absoluto de adulto?",
        answer:
          "Con práctica constante los adultos mejoran claramente al nombrar notas, y algunos estudios de entrenamiento muestran grandes avances. Si eso equivale al oído absoluto espontáneo de quien lo tiene desde niño sigue en debate. Para un guitarrista, entrenar el oído relativo rinde mucho más.",
      },
      {
        question: "¿Por qué suenan pitidos aleatorios entre notas?",
        answer:
          "Sin ellos, cualquiera con buen oído relativo podría oír el intervalo desde la nota anterior y deducir la respuesta. La ráfaga de tonos aleatorios y desafinados borra esa memoria a corto plazo, así que el test mide la memoria de las notas, no el oído para los intervalos.",
      },
    ],
  },

  "/tone-deaf-test": {
    metaTitle: "Test de oído musical — ¿Eres desafinado?",
    metaDescription:
      "Test de oído musical gratis: ¿el segundo tono es más agudo o más grave? Se adapta hasta encontrar el menor cambio de afinación que oyes, en dos minutos.",
    title: "Test de oído musical",
    description:
      "Suenan dos tonos. ¿El segundo era más agudo o más grave? La diferencia se reduce cada vez que aciertas, hasta encontrar el cambio de afinación más pequeño que oyes.",
    label: "Test de oído musical",
    sections: [
      {
        heading: "Cómo funciona el test",
        body: [
          "Cada intento toca dos tonos cortos alrededor de una nota central aleatoria, entre Mi4 y Mi5. Tú dices si el segundo era más agudo o más grave. Los primeros pares están a un semitono (100 cents, la distancia entre dos trastes), algo que casi todo el mundo oye sin problema.",
          "Tras dos aciertos seguidos la diferencia se reduce un 30 %; tras un fallo crece un 40 %. El test termina después de ocho cambios de sentido y da la media geométrica de los seis últimos. Esa cifra es tu **umbral de discriminación tonal**: el cambio más pequeño que oyes de forma fiable.",
        ],
      },
      {
        heading: "Qué significa tu resultado",
        body: [
          { table: ["Umbral", "Resultado"] },
          "Cuanto más bajo, mejor. Como referencia, un afinador suele dar una cuerda por afinada dentro de ±5 cents. Si distingues 10 cents o menos, puedes afinar bien de oído.",
        ],
      },
      {
        heading: "Qué es ser «desafinado» de verdad",
        body: [
          "La amusia congénita es una dificultad de por vida para percibir la altura de los sonidos que no se debe a pérdida auditiva ni a falta de contacto con la música. Quien la tiene a menudo no detecta una nota falsa en una melodía conocida, y los tests de discriminación tonal como este son una de las formas de detectarla. Aun así, un test en el navegador no diagnostica nada: los altavoces, el ruido y la atención influyen.",
          "La mayoría de quienes se consideran desafinados oyen la afinación con normalidad; lo que les falta es entrenar la voz. Si es tu caso, canta frente al detector de tono vocal y mira la aguja: ver si estás alto o bajo es como el oído y la voz aprenden a ponerse de acuerdo.",
        ],
      },
      {
        heading: "Cómo mejorar tu resultado",
        body: [
          {
            list: [
              "Usa auriculares y busca una habitación tranquila. El ventilador y el tráfico tapan los cambios pequeños.",
              "Escucha los dos tonos completos antes de responder. Pulsa R para repetirlos.",
              "No le des vueltas a las dudas: un intento al azar no pasa nada, el método está pensado para absorberlo.",
              "Entrena entre intentos: afina una cuerda contra un diapasón y escucha la ondulación lenta (los batidos) que desaparece cuando las dos notas coinciden.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo sé si soy desafinado?",
        answer:
          "La verdadera sordera tonal (amusia congénita) supone una dificultad real para oír cambios de altura, normalmente de menos de un semitono. Si distingues cuál de dos tonos es más agudo cuando están a menos de medio semitono (50 cents), no eres desafinado, aunque no te guste cómo cantas.",
      },
      {
        question: "¿Cuánta gente es realmente desafinada?",
        answer:
          "Las estimaciones de amusia congénita van del 1,5 % al 4 % de la población. Muchas más personas creen ser desafinadas de las que lo son: la mayoría oye perfectamente y solo le falta entrenar la voz.",
      },
      {
        question: "¿Qué es un cent?",
        answer:
          "Un cent es la centésima parte de un semitono. Un semitono es la distancia entre dos trastes contiguos de la guitarra, así que equivale a 100 cents. Los afinadores muestran cents porque una cuerda desviada solo 5 o 10 cents ya puede sonar mal en un acorde.",
      },
      {
        question: "No canto afinado. ¿Significa que soy desafinado de oído?",
        answer:
          "Normalmente no. Cantar afinado requiere oír la altura y controlar la voz, y la mayoría de quienes cantan desafinado tienen lo primero pero aún no lo segundo. Si este test te da un buen resultado, el problema es de práctica vocal, no de oído.",
      },
      {
        question: "¿Por qué cambia la dificultad todo el rato?",
        answer:
          "Usa una escalera adaptativa, un método habitual en la investigación auditiva. Dos aciertos seguidos acercan el siguiente par; un fallo lo separa. Se estabiliza donde aciertas un 71 % de las veces, y el resultado es la media de los puntos de giro.",
      },
    ],
  },

  "/hearing-age-test": {
    metaTitle: "Test de edad auditiva — ¿Hasta dónde oyes?",
    metaDescription:
      "Test de edad auditiva online y gratis: tonos de 8 a 20 kHz muestran la frecuencia más aguda que oyes y la edad de tus oídos. Compártelo y reta a un amigo.",
    title: "Test de edad auditiva",
    description:
      "Tonos agudos que suben de 8 kHz a 20 kHz. Indica cuáles oyes y descubre la frecuencia más alta que captan tus oídos, y la edad que suele corresponderle.",
    label: "Test de edad auditiva",
    sections: [
      {
        heading: "Tabla de edad auditiva",
        body: [
          "La frecuencia más aguda que oímos baja con los años (presbiacusia), así que permite estimar a grandes rasgos la edad de tus oídos. Son cifras orientativas: la exposición al ruido puede envejecer el oído mucho más rápido que los cumpleaños.",
          { table: ["Tono más agudo oído", "Típico de"] },
        ],
      },
      {
        heading: "Cómo funciona el test",
        body: [
          {
            steps: [
              "**Ajusta el volumen.** Suena un tono de 1 kHz; ponlo a un nivel bajo y cómodo. Todos los tonos siguientes suenan al mismo nivel.",
              "**Sube.** Tonos puros de dos segundos y medio, de 8 kHz a 20 kHz. Cada uno entra y sale de forma suave, porque un arranque brusco produce un clic que se oiría aunque el tono no.",
              "**Para en tu límite.** El primer tono que no oyes termina el test. Tu resultado es el más agudo que sí oíste.",
              "**Prueba trampa.** Uno de los pasos es silencio. Si dices que lo oíste, el resultado se marca como poco fiable y no se puede compartir.",
            ],
          },
        ],
      },
      {
        heading: "Por qué se pierde el oído agudo",
        body: [
          "El oído interno ordena el sonido por frecuencias a lo largo de la cóclea, y las células ciliadas que responden a los agudos están a la entrada, por donde pasa todo sonido. Son las primeras en desgastarse, por la edad y por la música alta, los conciertos o las herramientas ruidosas. No se regeneran, por eso el techo de frecuencias baja con los años y rara vez se recupera.",
          "Para un músico es un buen motivo para usar tapones en ensayos y conciertos. Los tapones para músicos reducen el volumen por igual en todas las frecuencias: la banda sigue sonando como la banda, solo que más baja.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cuál es el rango normal de audición?",
        answer:
          "El rango de manual es de 20 Hz a 20 kHz, pero solo los niños llegan al máximo. El límite superior baja con la edad: la mayoría de los adultos de treinta y tantos dejan de oír hacia 16–17 kHz, y la mayoría de los mayores de 50, hacia 12–14 kHz.",
      },
      {
        question: "¿Es un test auditivo médico?",
        answer:
          "No. Solo comprueba la parte más alta de tu rango, con altavoces sin calibrar. La voz y la música están muy por debajo de 8 kHz, así que un resultado bajo dice poco de tu audición diaria. Si notas voces apagadas, pitidos o pérdida de audición, consulta a un otorrino o a un audiólogo.",
      },
      {
        question: "¿Por qué no oigo los tonos más agudos en el móvil?",
        answer:
          "Muchos altavoces de móvil y portátil caen en picado por encima de unos 15 kHz, y algunos auriculares y códecs Bluetooth también recortan los agudos. Los auriculares con cable dan el resultado más fiel. Si no oyes ni 8 kHz, casi seguro es el volumen o el altavoz.",
      },
      {
        question: "¿Por qué hay un tono en silencio?",
        answer:
          "Uno de los pasos no reproduce nada. Si dices que lo oíste, el test sabe que estabas adivinando y no comparte el resultado como si fuera real. Pulsar «Lo oigo» en todos los tonos es la forma más fácil de inflar el resultado, y la prueba trampa lo evita.",
      },
      {
        question: "¿Debo subir el volumen para oír los tonos agudos?",
        answer:
          "No. Ajusta un nivel cómodo con el tono de 1 kHz y déjalo así. Subir mucho las frecuencias altas puede dañar justo la audición que estás midiendo.",
      },
    ],
  },

  "/music-tests": {
    metaTitle: "Tests musicales online — Pon a prueba tu oído",
    metaDescription:
      "Tests musicales gratis: comprueba si tienes oído absoluto, si eres desafinado y cuál es tu edad auditiva. Dos minutos cada uno; luego reta a tus amigos.",
    title: "Tests musicales",
    description:
      "Tres pruebas rápidas para tus oídos: oído absoluto, oído musical y edad auditiva. Cada una dura unos dos minutos, funciona en el navegador y te da un resultado para compartir.",
    label: "Tests musicales",
    sections: [
      {
        heading: "Tres tests, tres habilidades distintas",
        body: [
          "El **test de oído absoluto** comprueba si puedes nombrar una nota sin nada con que compararla, una capacidad rara que se suele estimar en una persona de cada diez mil. El **test de oído musical** mide el cambio de afinación más pequeño que oyes, la habilidad que permite afinar y cantar afinado. El **test de edad auditiva** busca el techo de tu rango de audición, que baja con la edad y el ruido.",
          "Ninguno es una prueba médica. Son comprobaciones rápidas y honestas, con el método explicado en cada página, para que sepas qué significa tu número antes de compartirlo.",
        ],
      },
      {
        heading: "Cómo retar a un amigo",
        body: [
          "Al terminar un test, pulsa «Retar a un amigo». El enlace abre el mismo test con tu resultado como marca a batir y, al final, le dice si te ha ganado. «Compartir resultado» envía un enlace con una imagen de tu puntuación.",
          "Tus mejores resultados se guardan en tu propio navegador: no hay registro y no se sube nada.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Son gratis estos tests musicales?",
        answer: "Sí. Todos funcionan en el navegador sin registro, y tus resultados se guardan en tu dispositivo. No se sube nada.",
      },
      {
        question: "¿Necesito auriculares?",
        answer:
          "Ayudan en los tres, y son casi imprescindibles para el test de edad auditiva, porque muchos altavoces de móvil y portátil no reproducen frecuencias muy altas. El test de oído absoluto funciona bien con altavoces.",
      },
      {
        question: "¿Qué test dice más sobre la capacidad musical?",
        answer:
          "El test de oído musical. Oír pequeñas diferencias de afinación es lo que permite afinar de oído y cantar o tocar afinado. El oído absoluto es una memoria de notas poco común que la mayoría de los buenos músicos no tiene, y el oído agudo habla de la edad de tus oídos, no de tu musicalidad.",
      },
    ],
  },
};
