import type { ToolPageCopy } from "./types";

export const toolPagesDe: Record<string, ToolPageCopy> = {
  "/tap-tempo": {
    metaTitle: "BPM-Zähler — Tap Tempo online",
    metaDescription:
      "Kostenloser BPM-Zähler: Tippe im Takt eines Songs und sieh Tempo, italienische Tempobezeichnung sowie halbes und doppeltes Tempo. Dann im Metronom üben.",
    title: "BPM-Zähler (Tap Tempo)",
    description:
      "Tippe im Takt eines Songs auf die Fläche und lies das Tempo in Schlägen pro Minute ab. Zwei Tipper geben eine erste Idee, zehn ein stabiles Ergebnis.",
    label: "BPM-Zähler",
    sections: [
      {
        heading: "So findest du das BPM eines Songs",
        body: [
          {
            steps: [
              "Starte den Song oder summe einen, den du gut kennst.",
              "Tippe auf die Fläche — oder drücke die **Leertaste** — auf jeden Schlag. Wähle den Puls, zu dem du mit dem Fuß mitwippen würdest.",
              "Mach acht bis zehn Tipper. Der Wert wird stabiler, je mehr er mittelt.",
              "Wirkt die Zahl zu schnell oder zu langsam, schau auf das halbe und doppelte Tempo; öffne dann das Metronom, um in dieser Geschwindigkeit zu üben.",
            ],
          },
        ],
      },
      {
        heading: "Was BPM bedeutet",
        body: [
          "BPM steht für Beats per Minute, Schläge pro Minute: wie viele gleichmäßige Pulse in sechzig Sekunden passen. Bei 60 BPM ist es ein Schlag pro Sekunde, bei 120 sind es zwei. Das Tempo ist die nützlichste Zahl zum Üben eines Songs, denn damit kannst du eine schwere Stelle verlangsamen, sauber spielen und in kleinen Schritten wieder steigern.",
        ],
      },
      {
        heading: "Tempobezeichnungen und BPM-Bereiche",
        body: [
          "Vor den Metronomen beschrieben Komponisten die Geschwindigkeit auf Italienisch. Diese Wörter stehen noch heute in den Noten, und jedes entspricht einem BPM-Bereich. Das Tool zeigt, in welchen dein Wert fällt.",
          { table: ["Bezeichnung", "BPM"] },
        ],
      },
      {
        heading: "Tipps für genaues Tippen",
        body: [
          {
            list: [
              "**Tippe auf den Schlag, nicht danach.** Etwas zu spät zu reagieren ist normal, aber weil alle Tipper ungefähr gleich spät sind, stimmen die Abstände — und damit das BPM.",
              "**Nimm einen stabilen Abschnitt.** Intros, Fills und Breaks verändern oft den Puls. Eine Strophe oder ein Refrain liefert das ehrlichste Tempo.",
              "**Fang bei jedem Song neu an.** Eine Pause von mehr als zweieinhalb Sekunden setzt die Zählung zurück; auch Zurücksetzen oder Esc tun das.",
              "**Tipper werden beim Drücken gemessen,** ohne auf das Loslassen zu warten — es gibt keine Verzögerung.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Wie funktioniert Tap Tempo?",
        answer:
          "Bei jedem Tipper notiert die Seite den genauen Zeitpunkt. Das BPM ergibt sich aus der Zahl der Abstände zwischen den Tippern geteilt durch die Gesamtzeit, auf eine Minute hochgerechnet. Weil über die letzten zehn Tipper gemittelt wird, verschiebt ein zu früher oder zu später Tipper das Ergebnis kaum.",
      },
      {
        question: "Wie viele Tipper brauche ich?",
        answer:
          "Mit zwei Tippern gibt es eine Zahl, aber sie ist nur eine erste Schätzung. Acht bis zehn Tipper liefern bei den meisten Songs einen stabilen Wert. Schwankt die Zahl weiter um einige BPM, kann der Song selbst im Tempo driften, wie es live vorkommt; der Durchschnitt ist dann die ehrliche Antwort.",
      },
      {
        question: "Soll ich jeden Schlag oder jeden zweiten tippen?",
        answer:
          "Tippe den Puls, zu dem du nicken oder mit dem Fuß wippen würdest, meist die Viertelnote. Ist das Ergebnis genau doppelt oder halb so groß wie erwartet, ist das eine Frage des Gefühls, kein Fehler: Halb- und Doppeltempo stehen unter dem Wert.",
      },
      {
        question: "Warum weicht die Zahl von der ab, die ich online sehe?",
        answer:
          "Datenbanken nennen oft ein einziges gerundetes Tempo, auch wenn der Titel etwas anzieht oder im halben oder doppelten Tempo empfunden wird. Tippe über eine Strophe und einen Refrain und nimm den Wert, bei dem du bequem spielen kannst.",
      },
      {
        question: "Wie übe ich im gefundenen Tempo?",
        answer:
          "Nutze die Links unter dem Wert: Sie öffnen das Metronom mit eingestelltem BPM oder den Rhythmustrainer, der bewertet, wie nah deine Tipper am Schlag liegen.",
      },
    ],
  },

  "/pitch-pipe": {
    metaTitle: "Stimmpfeife online — nach Gehör stimmen",
    metaDescription:
      "Kostenlose Stimmpfeife: gehaltene Töne für Gitarre, Bass, Ukulele und Geige oder alle 12 chromatischen Töne. Nach Gehör stimmen, ohne Mikrofon.",
    title: "Stimmpfeife online",
    description:
      "Wähle dein Instrument und tippe den Ton einer Saite an: Er bleibt konstant, während du stimmst. Ohne Mikrofon und ohne Berechtigungen.",
    label: "Stimmpfeife",
    sections: [
      {
        heading: "So benutzt du die Stimmpfeife",
        body: [
          {
            steps: [
              "Wähle oben dein Instrument.",
              "Tippe den Ton der Saite an, die du stimmen willst. Er klingt, bis du ihn erneut antippst oder einen anderen wählst.",
              "Zupfe die leere Saite und achte darauf, wie die beiden Töne gegeneinander „schweben“.",
              "Drehe den Wirbel langsam, bis die Schwebung langsamer wird und verschwindet. Nähere dich dem Ton immer von unten — stimme hinauf —, damit die Saite stabil bleibt.",
            ],
          },
        ],
      },
      {
        heading: "Töne und Frequenzen",
        body: [
          "Alle Töne sind mit A4 = 440 Hz in gleichstufiger Stimmung berechnet, also mit denselben Zielen, auf die das Gitarrenstimmgerät hört.",
          { table: ["Instrument", "Töne (tief nach hoch)", "Frequenzen"] },
        ],
      },
      {
        heading: "Warum sich Stimmen nach Gehör lohnt",
        body: [
          "Ein Stimmgerät sagt dir, wo die Saite steht; dein Ohr sagt dir, ob sie mit den anderen gut klingt. Wer nach Gehör stimmt, bemerkt, wenn ein Akkord leicht verstimmt ist, und korrigiert es in Sekunden ohne Gerät. Ein Referenzton ist der schnellste Weg, dieses Gehör zu schulen, denn die Schwebung zwischen zwei nahen Tonhöhen ist unüberhörbar, sobald du weißt, worauf du achten musst. Ergänze ihn mit der Online-Stimmgabel, deren Ton reiner und kürzer ist.",
        ],
      },
    ],
    faqs: [
      {
        question: "Was ist eine Stimmpfeife?",
        answer:
          "Eine Stimmpfeife ist ein kleines Zungeninstrument, das jeweils einen Referenzton erzeugt. Chorleiter geben damit den Starton, Streicher stimmen damit nach Gehör. Diese Online-Version tut dasselbe über deinen Lautsprecher, mit einem Ton für jede Saite der gängigen Instrumente.",
      },
      {
        question: "Wie stimme ich eine Gitarre damit?",
        answer:
          "Lass den Ton einer Saite erklingen — zum Beispiel das A — und spiele gleichzeitig die leere Saite. Weichen die Tonhöhen voneinander ab, hörst du ein langsames Auf und Ab, die Schwebung. Drehe den Wirbel, bis sie langsamer wird und verschwindet; beide Töne verschmelzen. Wiederhole das für jede Saite, beginnend mit der tiefen E-Saite.",
      },
      {
        question: "Warum höre ich die tiefen Töne kaum?",
        answer:
          "Kleine Lautsprecher bewegen unter etwa 100 Hz nicht genug Luft, darunter das tiefe E der Gitarre (82 Hz) und alle Basssaiten. Nimm Kopfhörer oder stimme nach demselben Ton eine Oktave höher, den du gut hörst.",
      },
      {
        question: "Was ist der Unterschied zu einem Stimmgerät?",
        answer:
          "Ein Stimmgerät hört dein Instrument ab und zeigt, wie weit du daneben liegst. Die Stimmpfeife spielt das Ziel und überlässt dein Ohr das Urteil. Sie braucht kein Mikrofon und schult das Gehör; die meisten Musiker nutzen beides.",
      },
      {
        question: "Was bewirkt die A4-Einstellung?",
        answer:
          "Sie legt den Kammerton fest, von dem aus alle Töne gemessen werden. 440 Hz ist der Standard; 442 und 443 verwenden manche Orchester, 432 wer einen wärmeren Klang mag. Spielst du mit einer Aufnahme oder einem anderen Instrument, gleiche dich an; sonst lass 440 stehen.",
      },
    ],
  },

  "/tuning-fork": {
    metaTitle: "Stimmgabel online — A440, E, C",
    metaDescription:
      "Kostenlose virtuelle Stimmgabel: Schlage A 440, 442, 432, E 329 oder C 523 an und höre sie klingen und abklingen. Gitarre, Geige oder Stimme stimmen.",
    title: "Stimmgabel online",
    description:
      "Schlage die Gabel an und höre sie klingen und abklingen. Nutze sie als reine Referenz, um eine Saite oder deine Stimme zu stimmen.",
    label: "Stimmgabel online",
    sections: [
      {
        heading: "Die Gabeln und wofür sie dienen",
        body: [{ table: ["Gabel", "Frequenz", "Typische Verwendung"] }],
      },
      {
        heading: "So stimmst du mit einer Stimmgabel",
        body: [
          {
            steps: [
              "Wähle eine Gabel und tippe sie an, um sie anzuschlagen. Sie klingt etwa zehn Sekunden.",
              "Spiele die passende Saite: das A mit der A-Saite, das E mit der hohen E-Saite.",
              "Höre auf die Schwebung: ein langsames Pulsieren der Lautstärke, das zeigt, dass beide Tonhöhen um einige Hertz abweichen. Je langsamer, desto näher; wenn sie aufhört, stimmen sie überein.",
              "Stimme die übrigen Saiten von dort aus nach der Methode des fünften Bundes oder lass sie einzeln auf der Stimmpfeife erklingen.",
            ],
          },
        ],
      },
      {
        heading: "Stimmgabel oder Stimmgerät?",
        body: [
          "Das chromatische Stimmgerät zeigt, um wie viele Cent du zu hoch oder zu tief bist. Die Stimmgabel gibt dir nichts zum Ablesen, sondern einen klaren Ton zum Angleichen — das lernt sich langsamer, schult aber das Gehör. Viele Lehrer lassen nach Gehör mit der Gabel stimmen und danach mit dem Stimmgerät kontrollieren.",
        ],
      },
    ],
    faqs: [
      {
        question: "Wie funktioniert eine Stimmgabel?",
        answer:
          "Eine Stimmgabel ist ein U-förmiger Stahlstab. Angeschlagen schwingen ihre beiden Zinken mit einer festen Frequenz, die von Länge und Steifigkeit abhängt. Sie erzeugt eine fast reine Sinuswelle mit sehr wenigen Obertönen, deshalb ist sie eine so saubere Referenz. Eine 440-Hz-Gabel schwingt 440-mal pro Sekunde.",
      },
      {
        question: "Wie stimme ich die Gitarre mit einer A440-Gabel?",
        answer:
          "Schlage die Gabel an und spiele die leere A-Saite, die mit 110 Hz zwei Oktaven tiefer klingt. Drehe den Wirbel, bis die Schwebung verschwindet. Stimme dann die übrigen Saiten vom A aus nach der Methode des fünften Bundes: Der 5. Bund der tiefen E-Saite ist ein A, der 5. Bund der A-Saite ein D und so weiter.",
      },
      {
        question: "Warum klingt der Ton ab?",
        answer:
          "Eine echte Gabel verliert Energie an die Luft und an deine Hand, deshalb klingt der Ton nach einigen Sekunden ab. Diese hier klingt etwa zehn Sekunden, wobei das kurze „Klirren“ beim Anschlag fast sofort verschwindet, wie bei einer Stahlgabel. Tippe erneut zum Anschlagen oder drücke Abdämpfen, um sie zu stoppen.",
      },
      {
        question: "Welche Gabel soll ich nehmen?",
        answer:
          "Das A mit 440 Hz für fast alles: Es ist der internationale Standard. Das E mit 329,63 Hz dient zum Stimmen der hohen E-Saite der Gitarre. A mit 442 Hz passt zu Orchestern, die höher stimmen, und 432 Hz mögen manche Musiker. C-Gabeln werden in Unterricht und Akustik eingesetzt.",
      },
      {
        question: "Ist sie so genau wie eine echte Stimmgabel?",
        answer:
          "Die Tonhöhe wird berechnet und ist damit so genau wie die Audio-Uhr deines Geräts — besser als eine billige Gabel, die um mehrere Cent danebenliegen kann und sich mit der Temperatur leicht ändert. Der Klang ist synthetisch und kommt dem von Stahl nicht ganz gleich, aber zum Stimmen zählt die Tonhöhe.",
      },
    ],
  },

  "/chord-quiz": {
    metaTitle: "Gitarren-Akkorde-Quiz — Griff benennen",
    metaDescription:
      "Kostenloses Gitarren-Akkorde-Quiz: Ein Griffbild erscheint, du benennst es. Erst offene Akkorde, dann Septakkorde und Barré. Mit Serien und Audio.",
    title: "Gitarren-Akkorde-Quiz",
    description:
      "Schau auf das Griffbild und nenne den Akkord. Die falschen Antworten sind ähnliche Akkorde, denn genau diese Fähigkeit zählt.",
    label: "Akkorde-Quiz",
    sections: [
      {
        heading: "So funktioniert das Quiz",
        body: [
          {
            steps: [
              "Wähle eine Stufe. Offene Dur- und Moll-Akkorde sind der beste Einstieg.",
              "Betrachte das Griffbild und wähle den richtigen Namen aus vier Antworten, oder drücke 1 bis 4.",
              "Nach deiner Antwort hörst du den Akkord und siehst seine Töne. Drücke Weiter oder N für den nächsten.",
              "Akkorde, die du verfehlst, kommen häufiger wieder, bis sie sitzen.",
            ],
          },
          "Akkorde werden mit Buchstaben geschrieben (C, Dm, G7), wie in den meisten Gitarrennoten. Beachte die deutsche Notation: Das englische „B“ (B♭) heißt hier **B**, das natürliche B heißt **H**.",
        ],
      },
      {
        heading: "Tipps zum Lernen der Griffe",
        body: [
          {
            list: [
              "**Lerne in Familien.** Die offenen E- und A-Griffe stecken hinter allen Barré-Akkorden. Die Akkordbibliothek zeigt jeden in allen Tonarten.",
              "**Sprich die Töne mit.** Jede Antwort listet die Töne des Akkords. Ein Akkord ist ein Rezept, und wer es kennt, behält den Namen.",
              "**Spiele den Griff auch.** Greife ihn nach jeder Frage auf deiner Gitarre. Der Akkordfinder arbeitet umgekehrt: Du setzt einen Griff, er nennt den Namen.",
              "**Halte es kurz.** Zehn Fragen am Tag bringen mehr als eine Stunde pro Woche. Es zählt für deine Übungsserie.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Wie liest man ein Akkorddiagramm?",
        answer:
          "Die senkrechten Linien sind die Saiten, die dickste links, die waagerechten Linien die Bünde. Ein Punkt zeigt, wo ein Finger hinkommt, ein O über der Saite heißt leer spielen, ein X nicht spielen. Beginnt das Diagramm weiter oben als der erste Bund, nennt eine Zahl daneben den Bund.",
      },
      {
        question: "Warum Akkorde auf einen Blick lernen?",
        answer:
          "Wer einen Griff sofort erkennt, kann Akkordblätter lesen, einen Akkord in den Händen eines anderen Gitarristen erkennen und den nächsten ohne Pause finden. Außerdem ergibt das Griffbrett Sinn: Du siehst, dass ein Moll-Akkord ein Dur-Akkord mit einem verschobenen Finger ist.",
      },
      {
        question: "Was bedeuten die Stufen?",
        answer:
          "Offene Dur- und Moll-Akkorde: die ersten Akkorde, die jeder lernt. Alle offenen Akkorde: mit Septakkorden, Sus und mehr. Alles: Barré-Griffe und alle Akkordarten.",
      },
      {
        question: "Was sind die Akkorde zum Wiederholen?",
        answer:
          "Hast du einen Akkord mindestens dreimal mit weniger als 70 % richtig beantwortet, erscheint er unter dem Quiz und kommt häufiger vor. Deine Ergebnisse bleiben auf diesem Gerät, außer du überträgst sie mit dem Link zur Fortschrittsübertragung.",
      },
      {
        question: "Warum können zwei Akkorde gleich klingen?",
        answer:
          "Manche Akkorde enthalten genau dieselben Töne unter verschiedenen Namen, etwa C6 und Am7. Das Quiz bietet nie beide in derselben Frage an, es gibt also immer nur eine richtige Antwort.",
      },
    ],
  },

  "/setlist-builder": {
    metaTitle: "Setlist erstellen — Songs, Tonarten, Stimmung",
    metaDescription:
      "Kostenlos Setlists für Gitarristen erstellen: Tonart, BPM, Kapodaster und Stimmung pro Song, Umstimm-Hinweise, Drucken und Teilen per Link.",
    title: "Setlist erstellen",
    description:
      "Füge deine Songs mit Tonart, Tempo, Kapodaster und Stimmung hinzu, und die Liste zeigt dir, wo du auf der Bühne umstimmen musst.",
    label: "Setlist-Ersteller",
    sections: [
      {
        heading: "So baust du eine Setlist, die funktioniert",
        body: [
          {
            steps: [
              "Füge jeden Song mit Tonart, Tempo, Stimmung und Länge hinzu. Was du nicht weißt, lass leer.",
              "Sortiere mit den Pfeilen. Zwischen Songs mit unterschiedlicher Stimmung erscheinen Umstimm-Hinweise.",
              "Probiere „Nach Stimmung gruppieren“, um zu sehen, wie viele Umstimmungen wegfallen, und entscheide, ob der Fluss des Auftritts noch passt.",
              "Drucke sie aus oder kopiere den Link für die Band.",
            ],
          },
        ],
      },
      {
        heading: "Einen Auftritt dosieren",
        body: [
          {
            list: [
              "**Starte stark, nicht schnell.** Ein bekannter Song in bequemem Tempo beruhigt die Nerven und den Saal.",
              "**Variiere Tempo und Tonart.** Drei Songs im gleichen Tempo in der gleichen Tonart verschwimmen. Die Felder BPM und Tonart machen das auf einen Blick sichtbar.",
              "**Lege Umstimmungen dorthin, wo geredet wird.** Das Wechseln der Stimmung ist leichter, während die Band einen Song ansagt oder sich bedankt. Stimmpfeife und Stimmgerät helfen, schnell zu sein.",
              "**Kenne dein Tempo.** Kennst du das BPM eines Songs nicht, tippe es mit dem BPM-Zähler und trage das Ergebnis ein.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Wie funktioniert der Umstimm-Hinweis?",
        answer:
          "Braucht ein Song eine andere Stimmung als der vorherige, markiert die Liste den Wechsel dazwischen. Weniger Umstimmungen bedeuten weniger peinliche Pausen und weniger verstimmte Saiten nach schnellem Nachstimmen. „Nach Stimmung gruppieren“ rückt Songs gleicher Stimmung zusammen, behält ihre relative Reihenfolge bei und zeigt, wie viele Umstimmungen das spart.",
      },
      {
        question: "Wird meine Setlist gespeichert?",
        answer:
          "Ja, auf diesem Gerät, im Speicher deines Browsers. Es wird nichts hochgeladen. Um dieselbe Liste auf einem anderen Gerät zu öffnen oder an einen Bandkollegen zu schicken, nutze Link kopieren: Die Liste steckt im Link selbst, im Teil nach dem #, den Browser nie an einen Server senden.",
      },
      {
        question: "Kann ich die Setlist für die Bühne drucken?",
        answer:
          "Drücke Drucken. Die Seite blendet alles außer der Liste aus, schwarz auf weiß und mit den Umstimm-Hinweisen. Spielst du bei wenig Licht, wähle in den Druckeinstellungen deines Browsers eine große Schrift.",
      },
      {
        question: "Welche Stimmungen kann ich wählen?",
        answer:
          "Standard, Halbton tiefer, Ganzton tiefer, Drop D, Drop C, DADGAD und die offenen Stimmungen in G, D, E, A und C. Jede verlinkt auf das passende Stimmgerät, damit du vor dem Auftritt stimmen kannst.",
      },
      {
        question: "Funktioniert es für Songs mit Kapodaster?",
        answer:
          "Ja. Trage den Kapodaster-Bund pro Song ein. Der Kapodaster ändert die Stimmung nicht, zählt also nicht als Umstimmung, ist aber ein Gegenstand, den man umsetzen muss — gut, ihn in der Liste zu sehen.",
      },
    ],
  },
};
