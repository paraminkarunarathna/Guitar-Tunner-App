import type { ToolPageCopy } from "./types";

export const toolPagesFr: Record<string, ToolPageCopy> = {
  "/tap-tempo": {
    metaTitle: "Compteur de BPM — Tap Tempo en ligne",
    metaDescription:
      "Compteur de BPM gratuit : tapez en rythme sur n’importe quel morceau et lisez son tempo, l’indication italienne et le double tempo. Puis travaillez au métronome.",
    title: "Compteur de BPM (Tap Tempo)",
    description:
      "Tapez sur le bouton en rythme avec un morceau et lisez son tempo en battements par minute. Deux appuis donnent une idée ; dix donnent un résultat stable.",
    label: "Compteur de BPM",
    sections: [
      {
        heading: "Comment trouver le BPM d’un morceau",
        body: [
          {
            steps: [
              "Lancez le morceau, ou chantonnez-en un que vous connaissez bien.",
              "Tapez sur le bouton — ou appuyez sur **Espace** — à chaque temps. Choisissez la pulsation sur laquelle vous battriez la mesure du pied.",
              "Continuez huit à dix appuis. La lecture se stabilise à mesure que la moyenne se précise.",
              "Si le chiffre paraît trop rapide ou trop lent, regardez le demi-tempo et le double tempo ; ouvrez ensuite le métronome pour travailler à cette vitesse.",
            ],
          },
        ],
      },
      {
        heading: "Ce que signifie BPM",
        body: [
          "BPM signifie battements par minute : combien de pulsations régulières tiennent en soixante secondes. À 60 BPM, il y a un temps par seconde ; à 120, deux. Le tempo est le chiffre le plus utile pour travailler un morceau : il permet de ralentir un passage difficile, de le jouer proprement, puis de remonter par petits paliers.",
        ],
      },
      {
        heading: "Indications de tempo et plages de BPM",
        body: [
          "Avant les métronomes, les compositeurs décrivaient la vitesse en italien. Ces mots figurent encore sur les partitions, et chacun correspond à une plage de BPM. L’outil indique celle de votre lecture.",
          { table: ["Indication", "BPM"] },
        ],
      },
      {
        heading: "Conseils pour taper avec précision",
        body: [
          {
            list: [
              "**Tapez sur le temps, pas après.** Réagir un peu en retard est naturel, mais comme tous les appuis sont retardés à peu près pareil, les intervalles — et donc le BPM — restent justes.",
              "**Choisissez un passage stable.** Intros, breaks et ponts changent souvent la pulsation. Un couplet ou un refrain donne le tempo le plus fidèle.",
              "**Repartez de zéro à chaque morceau.** Une pause de plus de deux secondes et demie relance le comptage ; Réinitialiser ou Échap le font aussi.",
              "**Les appuis sont mesurés à l’enfoncement,** sans attendre que vous releviez le doigt : aucun délai.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Comment fonctionne le tap tempo ?",
        answer:
          "À chaque appui, la page note l’instant exact. Le BPM est le nombre d’intervalles entre les appuis divisé par la durée totale qu’ils couvrent, ramené à une minute. En faisant la moyenne des dix derniers appuis, un appui trop tôt ou trop tard déplace à peine le résultat.",
      },
      {
        question: "Combien d’appuis faut-il ?",
        answer:
          "Deux appuis donnent un chiffre, mais ce n’est qu’une première estimation. Huit à dix appuis suffisent pour une lecture stable sur la plupart des morceaux. Si le chiffre varie encore de quelques BPM, le morceau lui-même peut fluctuer, comme en concert ; la moyenne est alors la réponse honnête.",
      },
      {
        question: "Faut-il taper chaque temps ou un sur deux ?",
        answer:
          "Tapez la pulsation sur laquelle vous hocheriez la tête ou battriez du pied, en général la noire. Si le résultat est exactement le double ou la moitié de ce que vous attendiez, c’est une question de ressenti, pas une erreur : le demi-tempo et le double tempo sont affichés sous la lecture.",
      },
      {
        question: "Pourquoi le chiffre diffère-t-il de celui que je vois en ligne ?",
        answer:
          "Les bases de données donnent souvent un seul tempo arrondi, même si le titre accélère légèrement ou se ressent à moitié ou au double. Tapez sur un couplet et un refrain, puis retenez le chiffre auquel vous jouez confortablement.",
      },
      {
        question: "Comment travailler au tempo trouvé ?",
        answer:
          "Utilisez les liens sous la lecture : ils ouvrent le métronome avec le BPM déjà réglé, ou l’entraîneur de rythme, qui note la proximité de vos appuis avec le temps.",
      },
    ],
  },

  "/pitch-pipe": {
    metaTitle: "Diapason à bouche en ligne — à l’oreille",
    metaDescription:
      "Diapason à bouche gratuit : notes tenues pour guitare, basse, ukulélé et violon, ou les 12 notes chromatiques. Accordez à l’oreille, sans micro.",
    title: "Diapason à bouche en ligne",
    description:
      "Choisissez votre instrument et touchez la note d’une corde : elle reste fixe pendant que vous accordez. Sans micro ni autorisation.",
    label: "Diapason à bouche",
    sections: [
      {
        heading: "Comment utiliser le diapason à bouche",
        body: [
          {
            steps: [
              "Choisissez votre instrument dans la rangée du haut.",
              "Touchez la note de la corde à accorder. Elle sonne jusqu’à ce que vous la touchiez de nouveau ou en choisissiez une autre.",
              "Pincez la corde à vide et écoutez les deux sons « battre » l’un contre l’autre.",
              "Tournez la mécanique doucement jusqu’à ce que les battements ralentissent et disparaissent. Approchez toujours la note par en dessous — en montant — pour que la corde se stabilise.",
            ],
          },
        ],
      },
      {
        heading: "Notes et fréquences",
        body: [
          "Toutes les notes sont calculées avec La4 = 440 Hz en tempérament égal, les mêmes cibles que celles écoutées par l’accordeur de guitare.",
          { table: ["Instrument", "Notes (du grave à l’aigu)", "Fréquences"] },
        ],
      },
      {
        heading: "Pourquoi apprendre à accorder à l’oreille",
        body: [
          "Un accordeur vous dit où se trouve la corde ; votre oreille vous dit si elle sonne juste avec les autres. Ceux qui accordent à l’oreille remarquent qu’un accord est un peu faux et le corrigent en quelques secondes, sans appareil. Une note de référence est le moyen le plus rapide de former cette oreille, car les battements entre deux hauteurs proches deviennent évidents dès qu’on sait les écouter. Complétez avec le diapason en ligne, au son plus pur et plus bref.",
        ],
      },
    ],
    faqs: [
      {
        question: "Qu’est-ce qu’un diapason à bouche ?",
        answer:
          "C’est un petit instrument à anche qui émet une seule note de référence. Les chefs de chœur s’en servent pour donner la note de départ, et les cordistes pour accorder à l’oreille. Cette version en ligne fait la même chose depuis votre haut-parleur, avec une note pour chaque corde des instruments courants.",
      },
      {
        question: "Comment accorder une guitare avec ?",
        answer:
          "Faites sonner la note d’une corde — par exemple le La — et jouez cette corde à vide en même temps. Si les hauteurs diffèrent, vous entendez un va-et-vient lent : les battements. Tournez la mécanique jusqu’à ce qu’ils ralentissent et disparaissent ; les deux sons n’en font plus qu’un. Répétez pour chaque corde, en commençant par la sixième.",
      },
      {
        question: "Pourquoi entends-je à peine les notes graves ?",
        answer:
          "Les petits haut-parleurs ne déplacent pas assez d’air sous environ 100 Hz, ce qui inclut le Mi grave de la guitare (82 Hz) et toutes les cordes de basse. Utilisez un casque, ou accordez sur la même note une octave plus haut, bien audible.",
      },
      {
        question: "Quelle différence avec un accordeur ?",
        answer:
          "Un accordeur écoute votre instrument et indique de combien vous êtes éloigné. Le diapason à bouche joue la cible et laisse l’oreille juger. Il n’exige aucun micro et entraîne l’oreille ; la plupart des musiciens utilisent les deux.",
      },
      {
        question: "Que change le réglage A4 ?",
        answer:
          "Il fixe le diapason de concert à partir duquel toutes les notes sont mesurées. 440 Hz est la norme ; 442 et 443 sont utilisés par certains orchestres, et 432 par ceux qui préfèrent un son plus chaud. Si vous jouez avec un enregistrement ou un autre instrument, alignez-vous sur lui ; sinon, laissez 440.",
      },
    ],
  },

  "/tuning-fork": {
    metaTitle: "Diapason en ligne — La 440, Mi, Do",
    metaDescription:
      "Diapason virtuel gratuit : frappez un La 440, 442, 432, Mi 329 ou Do 523 et écoutez-le résonner puis s’éteindre. Accordez guitare, violon ou voix.",
    title: "Diapason en ligne",
    description:
      "Frappez le diapason et écoutez-le résonner puis s’éteindre. Servez-vous-en comme référence pure pour accorder une corde ou votre voix.",
    label: "Diapason en ligne",
    sections: [
      {
        heading: "Les diapasons et leur usage",
        body: [{ table: ["Diapason", "Fréquence", "Usage courant"] }],
      },
      {
        heading: "Comment accorder avec un diapason",
        body: [
          {
            steps: [
              "Choisissez un diapason et touchez-le pour le frapper. Il résonne environ dix secondes.",
              "Jouez la corde correspondante : le La avec la corde de La, le Mi avec la première corde.",
              "Écoutez les battements : une pulsation lente du volume, signe que les deux hauteurs diffèrent de quelques hertz. Plus elle est lente, plus vous êtes proche ; quand elle s’arrête, les deux se confondent.",
              "Accordez les autres cordes à partir de celle-ci avec la méthode de la case 5, ou faites-les sonner une à une sur le diapason à bouche.",
            ],
          },
        ],
      },
      {
        heading: "Diapason ou accordeur ?",
        body: [
          "L’accordeur chromatique affiche de combien de cents vous êtes trop haut ou trop bas. Le diapason ne vous donne rien à lire : il offre un son net sur lequel vous caler, plus long à maîtriser mais formateur pour l’oreille. Beaucoup de professeurs demandent d’accorder à l’oreille avec le diapason, puis de vérifier à l’accordeur.",
        ],
      },
    ],
    faqs: [
      {
        question: "Comment fonctionne un diapason ?",
        answer:
          "C’est une barre d’acier en forme de U. Frappée, ses deux branches oscillent à une fréquence fixe, déterminée par leur longueur et leur rigidité. Il produit une onde presque sinusoïdale, avec très peu d’harmoniques, ce qui en fait une référence très nette. Un diapason de 440 Hz vibre 440 fois par seconde.",
      },
      {
        question: "Comment accorder une guitare avec un La 440 ?",
        answer:
          "Frappez le diapason et jouez la corde de La à vide, qui sonne à 110 Hz, deux octaves plus bas. Tournez la mécanique jusqu’à ce que les battements disparaissent. Accordez ensuite les autres cordes à partir du La avec la méthode de la case 5 : la case 5 de la sixième corde est un La, la case 5 de la cinquième est un Ré, et ainsi de suite.",
      },
      {
        question: "Pourquoi le son s’éteint-il ?",
        answer:
          "Un vrai diapason perd de l’énergie dans l’air et dans votre main, et la note décroît donc en quelques secondes. Celui-ci résonne environ dix secondes, le « clang » initial s’éteignant presque aussitôt, comme sur un diapason en acier. Touchez-le de nouveau pour le refrapper, ou appuyez sur Étouffer pour l’arrêter.",
      },
      {
        question: "Lequel utiliser ?",
        answer:
          "Le La 440 Hz pour presque tout : c’est la norme internationale. Le Mi 329,63 Hz sert à accorder la corde fine de la guitare. Le La 442 Hz convient aux orchestres qui accordent haut, et le 432 Hz plaît à certains musiciens. Les diapasons de Do servent en enseignement et en acoustique.",
      },
      {
        question: "Est-il aussi précis qu’un vrai diapason ?",
        answer:
          "La hauteur est calculée ; elle est donc exacte à la précision de l’horloge audio de votre appareil, mieux qu’un diapason bon marché qui peut s’écarter de plusieurs cents et varie un peu avec la température. Le timbre est synthétique et n’égale pas celui de l’acier, mais c’est la hauteur qui compte pour accorder.",
      },
    ],
  },

  "/chord-quiz": {
    metaTitle: "Quiz d’accords de guitare — nommez la forme",
    metaDescription:
      "Quiz d’accords de guitare gratuit : un diagramme apparaît, nommez-le. Accords ouverts, puis septièmes et barrés. Séries, accords à revoir et audio.",
    title: "Quiz d’accords de guitare",
    description:
      "Regardez le diagramme, nommez l’accord. Les mauvaises réponses sont des accords qui se ressemblent, car c’est la compétence qui compte.",
    label: "Quiz d’accords",
    sections: [
      {
        heading: "Comment fonctionne le quiz",
        body: [
          {
            steps: [
              "Choisissez un niveau. Les accords ouverts majeurs et mineurs sont le meilleur point de départ.",
              "Étudiez le diagramme et choisissez le bon nom parmi quatre, ou appuyez sur 1 à 4.",
              "Après votre réponse, vous entendez l’accord et voyez ses notes. Appuyez sur Suivant, ou N, pour un autre.",
              "Les accords que vous ratez reviennent plus souvent jusqu’à ce qu’ils soient acquis.",
            ],
          },
          "Les accords sont notés en lettres (C, Dm, G7), comme sur la plupart des grilles : C = Do, D = Ré, E = Mi, F = Fa, G = Sol, A = La, B = Si.",
        ],
      },
      {
        heading: "Conseils pour apprendre les formes",
        body: [
          {
            list: [
              "**Apprenez par familles.** Les formes ouvertes de Mi et de La sous-tendent tous les accords barrés. La bibliothèque d’accords montre chacune dans toutes les tonalités.",
              "**Dites les notes.** Chaque réponse liste les notes de l’accord. Un accord est une recette, et la connaître rend le nom mémorable.",
              "**Jouez aussi la forme.** Après chaque question, reproduisez-la sur votre guitare. Le chercheur d’accords fait l’inverse : vous posez une forme, il donne le nom.",
              "**Restez bref.** Dix questions par jour valent mieux qu’une heure par semaine. Cela compte pour votre série de pratique.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Comment lire un diagramme d’accord ?",
        answer:
          "Les lignes verticales sont les cordes, la plus grosse à gauche, et les lignes horizontales les cases. Un point indique où poser un doigt, un O au-dessus d’une corde signifie la jouer à vide, un X ne pas la jouer. Si le diagramme commence plus haut que la première case, un chiffre à côté indique laquelle.",
      },
      {
        question: "Pourquoi apprendre les accords au premier coup d’œil ?",
        answer:
          "Reconnaître une forme instantanément permet de lire une grille, d’identifier un accord dans les mains d’un autre guitariste et de trouver le suivant sans s’arrêter. Le manche prend aussi du sens : un mineur n’est qu’un majeur dont un doigt a bougé.",
      },
      {
        question: "Que signifient les niveaux ?",
        answer:
          "Majeurs et mineurs ouverts : les premiers accords que tout le monde apprend. Tous les accords ouverts : ajoute septièmes, sus et autres. Tout : inclut les barrés et toutes les qualités.",
      },
      {
        question: "Que sont les accords à revoir ?",
        answer:
          "Quand vous avez répondu à un accord au moins trois fois avec moins de 70 % de réussite, il apparaît sous le quiz et revient plus souvent. Vos résultats restent sur cet appareil, sauf si vous les déplacez avec le lien de transfert de progression.",
      },
      {
        question: "Pourquoi deux accords peuvent-ils sonner pareil ?",
        answer:
          "Certains accords contiennent exactement les mêmes notes sous des noms différents, comme C6 et Am7. Le quiz ne propose jamais les deux dans la même question : il n’y a donc qu’une seule bonne réponse.",
      },
    ],
  },

  "/setlist-builder": {
    metaTitle: "Créateur de setlist — morceaux et accordages",
    metaDescription:
      "Créateur de setlist gratuit pour guitaristes : tonalité, BPM, capodastre et accordage par morceau, alertes de réaccordage, impression et lien de partage.",
    title: "Créateur de setlist",
    description:
      "Ajoutez vos morceaux avec tonalité, tempo, capodastre et accordage : la liste vous montre où il faudra réaccorder sur scène.",
    label: "Créateur de setlist",
    sections: [
      {
        heading: "Comment construire une setlist qui fonctionne",
        body: [
          {
            steps: [
              "Ajoutez chaque morceau avec sa tonalité, son tempo, son accordage et sa durée. Laissez vide ce que vous ignorez.",
              "Ordonnez-les avec les flèches. Des alertes de réaccordage apparaissent entre les morceaux d’accordages différents.",
              "Essayez « Regrouper par accordage » pour voir combien de réaccordages disparaissent, et jugez si le fil du concert tient encore.",
              "Imprimez-la ou copiez le lien pour le groupe.",
            ],
          },
        ],
      },
      {
        heading: "Doser un concert",
        body: [
          {
            list: [
              "**Ouvrez fort, pas vite.** Un morceau connu à un tempo confortable calme les nerfs et la salle.",
              "**Variez tempo et tonalité.** Trois morceaux à la même vitesse dans la même tonalité se confondent. Les champs BPM et tonalité le rendent visible d’un coup d’œil.",
              "**Placez les réaccordages là où l’on parle.** Changer d’accordage est plus facile pendant que le groupe présente un morceau ou remercie le public. Le diapason à bouche et l’accordeur aident à aller vite.",
              "**Connaissez votre tempo.** Si vous ignorez le BPM d’un morceau, tapez-le avec le compteur de BPM et notez le résultat.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Comment fonctionne l’alerte de réaccordage ?",
        answer:
          "Chaque fois qu’un morceau demande un autre accordage que le précédent, la liste marque le changement entre les deux. Moins de réaccordages, ce sont moins de pauses gênantes et moins de cordes qui bougent après un réglage rapide. « Regrouper par accordage » rassemble les morceaux de même accordage en conservant leur ordre relatif et indique combien de réaccordages sont économisés.",
      },
      {
        question: "Ma setlist est-elle enregistrée ?",
        answer:
          "Oui, sur cet appareil, dans le stockage de votre navigateur. Rien n’est envoyé. Pour ouvrir la même liste sur un autre appareil ou l’envoyer à un membre du groupe, utilisez Copier le lien : la liste voyage dans le lien lui-même, dans la partie après le #, que les navigateurs n’envoient jamais à un serveur.",
      },
      {
        question: "Puis-je imprimer la setlist pour la scène ?",
        answer:
          "Appuyez sur Imprimer. La page masque tout sauf la liste, en noir sur blanc, avec les alertes de réaccordage. Si vous jouez dans une faible lumière, choisissez une grande police dans les réglages d’impression du navigateur.",
      },
      {
        question: "Quels accordages puis-je choisir ?",
        answer:
          "Standard, demi-ton plus bas, un ton plus bas, Drop D, Drop C, DADGAD et les accordages ouverts en Sol, Ré, Mi, La et Do. Chacun renvoie vers l’accordeur correspondant pour accorder avant le concert.",
      },
      {
        question: "Est-ce utile pour les morceaux au capodastre ?",
        answer:
          "Oui. Indiquez la case du capodastre pour chaque morceau. Le capodastre ne change pas l’accordage, il ne compte donc pas comme un réaccordage, mais c’est un objet à déplacer : autant le voir dans la liste.",
      },
    ],
  },
};
