import type { ToolPageCopy } from "./types";

export const testPagesDe: Record<string, ToolPageCopy> = {
  "/perfect-pitch-test": {
    metaTitle: "Absolutes Gehör Test — Hast du es?",
    metaDescription:
      "Kostenloser Test für absolutes Gehör: Hör 12 Töne ohne Referenz und benenne jeden. Finde in zwei Minuten heraus, ob du das absolute Gehör hast.",
    title: "Absolutes-Gehör-Test",
    description:
      "Zwölf Töne, einer nach dem anderen, ohne Referenzton zum Vergleichen. Benenne jeden und finde heraus, ob du ein absolutes Gehör hast.",
    label: "Absolutes-Gehör-Test",
    sections: [
      {
        heading: "So funktioniert der Test",
        body: [
          "Der Test spielt 12 zufällige Töne aus drei Oktaven, von C3 bis H5 – der Umfang einer Gitarre von den mittleren Saiten bis zum 12. Bund der hohen E-Saite. Du antwortest mit dem Tonnamen (C, Cis/Des, D …); die Oktave spielt keine Rolle.",
          "Zwei Dinge verhindern, dass daraus ein Intervalltest wird. Vor jedem Ton löscht ein kurzer Schwall zufälliger Töne die Erinnerung an den vorigen, und zwei aufeinanderfolgende Töne haben nie denselben Namen und liegen nie weniger als drei Halbtöne auseinander. Außerdem wechselt die Klangfarbe zwischen gezupfter Saite und gehaltenem Ton, denn Menschen mit absolutem Gehör erkennen Töne unabhängig vom Instrument.",
          "Wer rät, trifft im Schnitt einen von zwölf. Alles deutlich darüber bedeutet, dass einige Töne in deinem Gedächtnis verankert sind.",
        ],
      },
      {
        heading: "Was dein Ergebnis bedeutet",
        body: [{ table: ["Treffer", "Ergebnis"] }],
      },
      {
        heading: "Absolutes und relatives Gehör",
        body: [
          "Das absolute Gehör ist selten und keine Voraussetzung, um ein sehr guter Musiker zu sein – die meisten großen Instrumentalisten haben es nicht. Was sie haben, ist ein ausgezeichnetes **relatives Gehör**: Sie hören, dass eine Melodie eine große Terz steigt, dass ein Akkord Moll ist oder dass eine Saite ein paar Cent tiefer liegt als die daneben.",
          "Das relative Gehör lässt sich in jedem Alter trainieren. Der Tontaub-Test aus derselben Reihe misst, wie fein du Tonhöhenunterschiede hörst – genau die Fähigkeit, mit der man nach Gehör stimmt.",
        ],
      },
      {
        heading: "Tipps für ein faires Ergebnis",
        body: [
          {
            list: [
              "Mach den Test in Ruhe. Hintergrundmusik ist ein Referenzton und verfälscht das Ergebnis.",
              "Antworte aus dem Bauch heraus. Absolutes Gehör ist sofort da; einen Ton aus einem Lied herzuleiten ist eine andere Fähigkeit.",
              "Summ oder spiel zwischen den Tönen nichts – genau das sollen die Zufallstöne verhindern.",
              "Wiederhole ihn an einem anderen Tag. Eine Runde mit 12 Tönen hat etwas Glück im Spiel, und deine Bestleistung wird gespeichert.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Woran erkenne ich, ob ich ein absolutes Gehör habe?",
        answer:
          "Menschen mit absolutem Gehör benennen einen Ton sofort und mühelos, so wie man eine Farbe benennt – ohne Referenz und ohne ein bekanntes Lied mitzusummen. Wenn du in einem Test wie diesem 11 oder 12 von 12 schaffst, schnell und bei verschiedenen Klangfarben, hast du es sehr wahrscheinlich. Mittlere Ergebnisse sprechen eher für ein gutes Tongedächtnis.",
      },
      {
        question: "Wie selten ist das absolute Gehör?",
        answer:
          "Es wird oft auf etwa einen von 10.000 Menschen geschätzt. Viel häufiger ist es bei Musikern, die schon in früher Kindheit begonnen haben, und einige Studien finden höhere Raten bei Sprechern von Tonsprachen, die ebenfalls früh mit Musik angefangen haben.",
      },
      {
        question: "Was ist der Unterschied zwischen absolutem und relativem Gehör?",
        answer:
          "Absolutes Gehör heißt, einen Ton ohne Referenz zu benennen. Relatives Gehör heißt, den Abstand zwischen Tönen zu hören – etwa zu wissen, dass der zweite eine Quinte über dem ersten liegt. Das relative Gehör lässt dich nach Gehör spielen, transponieren und die Gitarre in sich stimmen, und fast jeder kann es trainieren.",
      },
      {
        question: "Kann man das absolute Gehör als Erwachsener lernen?",
        answer:
          "Mit regelmäßigem Üben werden Erwachsene beim Benennen von Tönen deutlich besser, und einige Trainingsstudien berichten von großen Fortschritten. Ob das dasselbe ist wie das mühelose absolute Gehör von Menschen, die es seit der Kindheit haben, ist umstritten. Für Gitarristen bringt Training des relativen Gehörs deutlich mehr.",
      },
      {
        question: "Warum kommen zwischen den Tönen zufällige Pieptöne?",
        answer:
          "Ohne sie könnte jeder mit gutem relativem Gehör das Intervall zum vorigen Ton hören und die Antwort ableiten. Der Schwall zufälliger, verstimmter Töne löscht dieses Kurzzeitgedächtnis – so misst der Test das Tongedächtnis, nicht das Intervallhören.",
      },
    ],
  },

  "/tone-deaf-test": {
    metaTitle: "Tontaub-Test — Bin ich unmusikalisch?",
    metaDescription:
      "Kostenloser Tontaub-Test: Ist der zweite Ton höher oder tiefer? Er passt sich an und findet den kleinsten Tonhöhenunterschied, den du hörst – in Cent.",
    title: "Tontaub-Test",
    description:
      "Zwei Töne. War der zweite höher oder tiefer? Der Abstand wird mit jeder richtigen Antwort kleiner, bis der kleinste Tonhöhenunterschied gefunden ist, den du hörst.",
    label: "Tontaub-Test",
    sections: [
      {
        heading: "So funktioniert der Test",
        body: [
          "Jeder Durchgang spielt zwei kurze Töne um eine zufällige Mitte zwischen E4 und E5. Du sagst, ob der zweite höher oder tiefer war. Die ersten Paare liegen einen Halbton auseinander (100 Cent, der Abstand zwischen zwei Bünden), was fast jeder leicht hört.",
          "Nach zwei richtigen Antworten in Folge schrumpft der Abstand um 30 %, nach einer falschen wächst er um 40 %. Der Test endet nach acht Richtungswechseln und gibt das geometrische Mittel der letzten sechs aus. Diese Zahl ist deine **Unterschiedsschwelle für Tonhöhen**: die kleinste Änderung, die du zuverlässig hörst.",
        ],
      },
      {
        heading: "Was dein Ergebnis bedeutet",
        body: [
          { table: ["Schwelle", "Ergebnis"] },
          "Je niedriger, desto besser. Zum Vergleich: Ein Stimmgerät zeigt eine Saite meist innerhalb von ±5 Cent als gestimmt an. Wer 10 Cent oder weniger hört, kann gut nach Gehör stimmen.",
        ],
      },
      {
        heading: "Was echte Tontaubheit ist",
        body: [
          "Angeborene Amusie ist eine lebenslange Schwierigkeit, Tonhöhen wahrzunehmen, die weder von Hörverlust noch von fehlender Musikerfahrung kommt. Betroffene bemerken oft keinen falschen Ton in einer bekannten Melodie, und Unterscheidungstests wie dieser sind eine Möglichkeit, sie zu erkennen. Ein Browsertest stellt aber keine Diagnose: Lautsprecher, Lärm und Aufmerksamkeit beeinflussen das Ergebnis.",
          "Die meisten, die sich für unmusikalisch halten, hören Tonhöhen ganz normal – ihnen fehlt Gesangstraining. Wenn das auf dich zutrifft, sing in den Stimm-Tonhöhendetektor und beobachte die Nadel: Zu sehen, ob du zu hoch oder zu tief bist, bringt Ohr und Stimme zusammen.",
        ],
      },
      {
        heading: "So wird dein Ergebnis besser",
        body: [
          {
            list: [
              "Nutz Kopfhörer und einen ruhigen Raum. Lüfter und Verkehr überdecken kleine Unterschiede.",
              "Hör beide Töne ganz, bevor du antwortest. Mit R spielst du sie nochmal.",
              "Grübel nicht bei knappen Fällen – mal zu raten ist kein Problem, das Verfahren fängt das ab.",
              "Üb zwischen den Versuchen: Stimm eine Saite nach einer Stimmgabel und hör auf das langsame Wabern (die Schwebung), das verschwindet, wenn beide Töne übereinstimmen.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Woran erkenne ich, ob ich tontaub bin?",
        answer:
          "Echte Tontaubheit (angeborene Amusie) bedeutet, Tonhöhenänderungen wirklich schlecht zu hören, meist alles unter einem Halbton. Wenn du unterscheiden kannst, welcher von zwei Tönen höher ist, obwohl sie weniger als einen halben Halbton (50 Cent) auseinanderliegen, bist du nicht tontaub – auch wenn dir dein Gesang nicht gefällt.",
      },
      {
        question: "Wie viele Menschen sind wirklich tontaub?",
        answer:
          "Schätzungen für angeborene Amusie liegen bei 1,5 bis 4 % der Bevölkerung. Viel mehr Menschen halten sich für tontaub, als es tatsächlich sind: Die meisten hören völlig normal und müssten nur ihre Stimme trainieren.",
      },
      {
        question: "Was ist ein Cent?",
        answer:
          "Ein Cent ist ein Hundertstel Halbton. Ein Halbton ist der Abstand zwischen zwei benachbarten Bünden der Gitarre, also 100 Cent. Stimmgeräte zeigen Cent an, weil eine Saite schon bei 5 bis 10 Cent Abweichung im Akkord schief klingen kann.",
      },
      {
        question: "Ich singe schief. Heißt das, ich bin tontaub?",
        answer:
          "Meistens nicht. Sauber singen braucht Tonhöhengehör und Stimmkontrolle, und die meisten, die schief singen, haben das Erste, aber noch nicht das Zweite. Wenn dieser Test gut ausfällt, ist es eine Frage des Stimmtrainings, nicht des Gehörs.",
      },
      {
        question: "Warum ändert sich die Schwierigkeit ständig?",
        answer:
          "Der Test nutzt ein adaptives Treppenverfahren, eine Standardmethode der Hörforschung. Zwei richtige Antworten in Folge rücken das nächste Paar näher zusammen, eine falsche weiter auseinander. Es pendelt sich dort ein, wo du in etwa 71 % der Fälle richtig liegst, und das Ergebnis ist der Mittelwert der Umkehrpunkte.",
      },
    ],
  },

  "/hearing-age-test": {
    metaTitle: "Höralter-Test — Wie hoch kannst du hören?",
    metaDescription:
      "Kostenloser Online-Hörtest: Töne von 8 bis 20 kHz zeigen die höchste Frequenz, die du hörst, und wie alt deine Ohren sind. Teilen und Freunde fordern.",
    title: "Höralter-Test",
    description:
      "Hohe Töne steigen von 8 kHz bis 20 kHz. Sag, welche du hörst, und finde die höchste Frequenz, die deine Ohren noch wahrnehmen – und das typische Alter dazu.",
    label: "Höralter-Test",
    sections: [
      {
        heading: "Höralter-Tabelle",
        body: [
          "Die höchste hörbare Frequenz sinkt mit den Jahren (Presbyakusis) und erlaubt so eine grobe Schätzung des Alters deiner Ohren. Es sind Faustwerte: Lärmbelastung kann das Gehör viel schneller altern lassen als Geburtstage.",
          { table: ["Höchster gehörter Ton", "Typisch für"] },
        ],
      },
      {
        heading: "So funktioniert der Test",
        body: [
          {
            steps: [
              "**Lautstärke einstellen.** Ein 1-kHz-Ton erklingt; stell ihn angenehm leise ein. Alle folgenden Töne spielen auf demselben Pegel.",
              "**Steigen.** Reine Töne von zweieinhalb Sekunden, von 8 kHz bis 20 kHz. Jeder wird sanft ein- und ausgeblendet, denn ein abrupter Einsatz erzeugt ein Klicken, das man auch dann hört, wenn der Ton selbst unhörbar ist.",
              "**An deiner Grenze stoppen.** Der erste Ton, den du nicht hörst, beendet den Test. Dein Ergebnis ist der höchste, den du gehört hast.",
              "**Kontrolldurchgang.** Ein Schritt ist Stille. Gibst du an, ihn zu hören, wird das Ergebnis als unzuverlässig markiert und lässt sich nicht teilen.",
            ],
          },
        ],
      },
      {
        heading: "Warum hohe Töne verloren gehen",
        body: [
          "Das Innenohr sortiert Schall entlang der Hörschnecke nach Frequenz, und die Haarzellen für die höchsten Töne sitzen am Eingang, an dem jeder Schall vorbeikommt. Sie verschleißen zuerst – durch das Alter, laute Musik, Konzerte und Maschinen. Sie wachsen nicht nach, deshalb sinkt die obere Grenze im Lauf des Lebens und kommt selten zurück.",
          "Für Musiker ein guter Grund, bei Proben und Konzerten Gehörschutz zu tragen. Musiker-Gehörschutz dämpft alle Frequenzen gleichmäßig: Die Band klingt weiter wie die Band, nur leiser.",
        ],
      },
    ],
    faqs: [
      {
        question: "Was ist der normale Hörbereich?",
        answer:
          "Laut Lehrbuch reicht er von 20 Hz bis 20 kHz, aber nur Kinder erreichen die Obergrenze. Sie sinkt mit dem Alter: Die meisten Erwachsenen um die dreißig hören bis etwa 16–17 kHz, die meisten über 50 bis etwa 12–14 kHz.",
      },
      {
        question: "Ist das ein medizinischer Hörtest?",
        answer:
          "Nein. Er prüft nur das obere Ende deines Hörbereichs, über nicht kalibrierte Lautsprecher. Sprache und Musik liegen weit unter 8 kHz, ein niedriges Ergebnis sagt also wenig über dein Alltagshören. Wenn dir Stimmen dumpf vorkommen, du Ohrgeräusche hast oder schlechter hörst, geh zum HNO-Arzt oder Hörakustiker.",
      },
      {
        question: "Warum höre ich die höchsten Töne am Handy nicht?",
        answer:
          "Viele Handy- und Laptop-Lautsprecher fallen oberhalb von etwa 15 kHz steil ab, und manche Bluetooth-Kopfhörer und -Codecs schneiden die Höhen ebenfalls ab. Kabelkopfhörer liefern das genaueste Ergebnis. Wenn du nicht einmal 8 kHz hörst, liegt es fast sicher an Lautstärke oder Lautsprecher.",
      },
      {
        question: "Warum gibt es einen stillen Ton?",
        answer:
          "Ein Schritt spielt gar nichts. Gibst du an, ihn gehört zu haben, weiß der Test, dass du geraten hast, und teilt das Ergebnis nicht, als wäre es echt. Bei jedem Ton „Ich höre ihn“ zu drücken ist der einfachste Weg, das Ergebnis zu schönen – der Kontrolldurchgang verhindert das.",
      },
      {
        question: "Soll ich lauter drehen, um die hohen Töne zu hören?",
        answer:
          "Nein. Stell mit dem 1-kHz-Ton eine angenehme Lautstärke ein und lass sie so. Laut aufgedrehte hohe Frequenzen können genau das Gehör schädigen, das du testest.",
      },
    ],
  },

  "/music-tests": {
    metaTitle: "Musiktests online — Teste dein Gehör",
    metaDescription:
      "Kostenlose Musiktests: Hast du ein absolutes Gehör, bist du tontaub, wie alt sind deine Ohren? Je zwei Minuten – danach Freunde herausfordern.",
    title: "Musiktests",
    description:
      "Drei schnelle Tests für deine Ohren: absolutes Gehör, Tontaubheit und Höralter. Jeder dauert etwa zwei Minuten, läuft im Browser und liefert ein Ergebnis zum Teilen.",
    label: "Musiktests",
    sections: [
      {
        heading: "Drei Tests, drei verschiedene Fähigkeiten",
        body: [
          "Der **Absolutes-Gehör-Test** prüft, ob du einen Ton ohne Vergleich benennen kannst – eine seltene Fähigkeit, oft auf einen von zehntausend Menschen geschätzt. Der **Tontaub-Test** misst den kleinsten Tonhöhenunterschied, den du hörst, also die Fähigkeit hinter sauberem Stimmen und Singen. Der **Höralter-Test** findet die Obergrenze deines Hörbereichs, die mit Alter und Lärm sinkt.",
          "Keiner davon ist ein medizinischer Test. Es sind schnelle, ehrliche Checks mit erklärter Methode auf jeder Seite, damit du weißt, was deine Zahl bedeutet, bevor du sie teilst.",
        ],
      },
      {
        heading: "So forderst du einen Freund heraus",
        body: [
          "Tippe am Ende eines Tests auf „Freund herausfordern“. Der Link öffnet denselben Test mit deinem Ergebnis als Messlatte und verrät am Ende, wer gewonnen hat. „Ergebnis teilen“ schickt einen Link mit einem Bild deines Ergebnisses.",
          "Deine Bestleistungen werden in deinem eigenen Browser gespeichert: keine Anmeldung, nichts wird hochgeladen.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sind die Musiktests kostenlos?",
        answer: "Ja. Alle laufen ohne Anmeldung im Browser, und deine Ergebnisse bleiben auf deinem Gerät. Nichts wird hochgeladen.",
      },
      {
        question: "Brauche ich Kopfhörer?",
        answer:
          "Sie helfen bei allen dreien und sind beim Höralter-Test fast Pflicht, weil viele Handy- und Laptop-Lautsprecher sehr hohe Frequenzen nicht wiedergeben. Der Absolutes-Gehör-Test funktioniert gut über Lautsprecher.",
      },
      {
        question: "Welcher Test sagt am meisten über Musikalität?",
        answer:
          "Der Tontaub-Test. Kleine Tonhöhenunterschiede zu hören ist das, was Stimmen nach Gehör und sauberes Singen und Spielen ermöglicht. Das absolute Gehör ist ein seltenes Tongedächtnis, das die meisten guten Musiker nicht haben, und das Hören hoher Töne verrät das Alter deiner Ohren, nicht deine Musikalität.",
      },
    ],
  },
};
