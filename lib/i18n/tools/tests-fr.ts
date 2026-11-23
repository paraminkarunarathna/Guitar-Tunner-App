import type { ToolPageCopy } from "./types";

export const testPagesFr: Record<string, ToolPageCopy> = {
  "/perfect-pitch-test": {
    metaTitle: "Test d’oreille absolue — L’avez-vous ?",
    metaDescription:
      "Test d’oreille absolue gratuit : écoutez 12 notes sans référence et nommez-les. Découvrez en deux minutes si vous avez l’oreille absolue.",
    title: "Test d’oreille absolue",
    description:
      "Douze notes, une à une, sans note de référence pour comparer. Nommez chacune et découvrez si vous avez l’oreille absolue.",
    label: "Test d’oreille absolue",
    sections: [
      {
        heading: "Comment fonctionne le test",
        body: [
          "Le test joue 12 notes tirées au hasard sur trois octaves, de do3 à si5 : l’étendue d’une guitare, des cordes du milieu jusqu’à la 12e case du mi aigu. Vous répondez par le nom de la note (do, do♯/ré♭, ré…) ; l’octave ne compte pas.",
          "Deux précautions l’empêchent de devenir un test d’intervalles. Avant chaque note, une courte rafale de sons aléatoires efface le souvenir de la précédente, et deux notes consécutives n’ont jamais le même nom ni moins de trois demi-tons d’écart. Le timbre alterne aussi entre une corde pincée et un son plus tenu, car une oreille absolue reconnaît la note quel que soit l’instrument.",
          "Au hasard, on trouve une note sur douze. Tout score nettement supérieur signifie que certaines notes sont ancrées dans votre mémoire.",
        ],
      },
      {
        heading: "Ce que signifie votre score",
        body: [{ table: ["Score", "Résultat"] }],
      },
      {
        heading: "Oreille absolue ou oreille relative",
        body: [
          "L’oreille absolue est rare, et elle n’est pas nécessaire pour être un excellent musicien : la plupart des grands instrumentistes ne l’ont pas. Ce qu’ils ont, c’est une très bonne **oreille relative** : ils entendent qu’une mélodie monte d’une tierce majeure, qu’un accord est mineur ou qu’une corde est quelques cents plus basse que sa voisine.",
          "L’oreille relative se travaille à tout âge. Le test d’oreille musicale de la même série mesure la finesse avec laquelle vous percevez la justesse, exactement ce qu’il faut pour accorder à l’oreille.",
        ],
      },
      {
        heading: "Conseils pour un score juste",
        body: [
          {
            list: [
              "Faites-le au calme. Une musique de fond est une note de référence et fausse le résultat.",
              "Répondez d’instinct. L’oreille absolue est immédiate ; retrouver une note à partir d’une chanson est une autre compétence.",
              "Ne fredonnez et ne jouez rien entre les notes : c’est justement ce qu’empêchent les sons aléatoires.",
              "Recommencez un autre jour. Une seule série de 12 notes comporte une part de chance, et votre record est enregistré.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Comment savoir si j’ai l’oreille absolue ?",
        answer:
          "Une personne qui a l’oreille absolue nomme une note instantanément et sans effort, comme on nomme une couleur : sans référence et sans fredonner un air connu. Si vous obtenez 11 ou 12 sur 12 à un test comme celui-ci, rapidement et sur des timbres différents, vous l’avez très probablement. Les scores intermédiaires traduisent plutôt une bonne mémoire des hauteurs.",
      },
      {
        question: "L’oreille absolue est-elle rare ?",
        answer:
          "On l’estime souvent à environ une personne sur 10 000. Elle est bien plus fréquente chez les musiciens qui ont commencé très jeunes, et certaines études trouvent des taux plus élevés chez les locuteurs de langues tonales ayant aussi commencé la musique tôt.",
      },
      {
        question: "Quelle différence entre oreille absolue et oreille relative ?",
        answer:
          "L’oreille absolue, c’est nommer une note sans référence. L’oreille relative, c’est entendre la distance entre les notes, par exemple savoir que la seconde est une quinte au-dessus de la première. C’est l’oreille relative qui permet de jouer d’oreille, de transposer et d’accorder la guitare sur elle-même, et presque tout le monde peut la développer.",
      },
      {
        question: "Peut-on acquérir l’oreille absolue à l’âge adulte ?",
        answer:
          "Avec un entraînement régulier, les adultes progressent nettement pour nommer les notes, et quelques études rapportent de gros progrès. Savoir si cela équivaut à l’oreille absolue spontanée de ceux qui l’ont depuis l’enfance reste débattu. Pour un guitariste, travailler l’oreille relative rapporte bien davantage.",
      },
      {
        question: "Pourquoi ces bips aléatoires entre les notes ?",
        answer:
          "Sans eux, n’importe qui avec une bonne oreille relative entendrait l’intervalle depuis la note précédente et en déduirait la réponse. La rafale de sons aléatoires et désaccordés efface cette mémoire à court terme : le test mesure la mémoire des notes, pas l’oreille des intervalles.",
      },
    ],
  },

  "/tone-deaf-test": {
    metaTitle: "Test d’oreille musicale — Chantez-vous faux ?",
    metaDescription:
      "Test d’oreille musicale gratuit : le second son est-il plus aigu ou plus grave ? Il s’adapte pour trouver le plus petit écart de hauteur que vous entendez.",
    title: "Test d’oreille musicale",
    description:
      "Deux sons. Le second était-il plus aigu ou plus grave ? L’écart se resserre à chaque bonne réponse, jusqu’à trouver le plus petit changement de hauteur que vous entendez.",
    label: "Test d’oreille musicale",
    sections: [
      {
        heading: "Comment fonctionne le test",
        body: [
          "Chaque essai joue deux sons brefs autour d’une note centrale aléatoire, entre mi4 et mi5. Vous dites si le second était plus aigu ou plus grave. Les premières paires sont à un demi-ton (100 cents, l’écart entre deux cases), que presque tout le monde entend facilement.",
          "Après deux bonnes réponses d’affilée, l’écart diminue de 30 % ; après une erreur, il augmente de 40 %. Le test s’arrête après huit changements de sens et donne la moyenne géométrique des six derniers. Ce chiffre est votre **seuil de discrimination des hauteurs** : le plus petit changement que vous entendez de façon fiable.",
        ],
      },
      {
        heading: "Ce que signifie votre score",
        body: [
          { table: ["Seuil", "Résultat"] },
          "Plus c’est bas, mieux c’est. À titre de comparaison, un accordeur considère généralement une corde juste à ±5 cents près. Si vous percevez 10 cents ou moins, vous pouvez bien accorder à l’oreille.",
        ],
      },
      {
        heading: "La vraie surdité tonale",
        body: [
          "L’amusie congénitale est une difficulté permanente à percevoir la hauteur des sons, qui ne vient ni d’une perte auditive ni d’un manque d’exposition à la musique. Les personnes concernées ne repèrent souvent pas une fausse note dans un air connu, et les tests de discrimination comme celui-ci servent à la dépister. Mais un test de navigateur ne pose aucun diagnostic : haut-parleurs, bruit et attention pèsent sur le résultat.",
          "La plupart des gens qui pensent chanter faux entendent normalement la justesse ; c’est la voix qui manque d’entraînement. Si c’est votre cas, chantez devant le détecteur de hauteur vocale et regardez l’aiguille : voir si vous êtes trop haut ou trop bas, c’est ainsi que l’oreille et la voix apprennent à s’accorder.",
        ],
      },
      {
        heading: "Améliorer votre score",
        body: [
          {
            list: [
              "Mettez un casque et installez-vous au calme. Ventilateur et circulation masquent les petits écarts.",
              "Écoutez les deux sons en entier avant de répondre. Touche R pour réécouter.",
              "Ne vous attardez pas sur les cas douteux : une réponse au hasard n’est pas grave, la méthode est faite pour l’absorber.",
              "Entraînez-vous entre deux essais : accordez une corde sur un diapason et écoutez l’ondulation lente (les battements) qui disparaît quand les deux notes coïncident.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Comment savoir si je suis atteint de surdité tonale ?",
        answer:
          "La vraie surdité tonale (amusie congénitale) est une difficulté réelle à entendre des changements de hauteur, en général inférieurs à un demi-ton. Si vous distinguez lequel de deux sons est le plus aigu quand ils sont à moins d’un demi-ton d’écart (50 cents), vous n’êtes pas sourd aux hauteurs, même si vous n’aimez pas votre voix.",
      },
      {
        question: "Combien de personnes sont vraiment concernées ?",
        answer:
          "Les estimations de l’amusie congénitale vont de 1,5 % à 4 % de la population. Bien plus de gens croient chanter faux qu’il n’y en a réellement : la plupart entendent parfaitement et n’ont qu’à travailler leur voix.",
      },
      {
        question: "Qu’est-ce qu’un cent ?",
        answer:
          "Un cent est un centième de demi-ton. Un demi-ton est l’écart entre deux cases voisines de la guitare, soit 100 cents. Les accordeurs affichent des cents parce qu’une corde décalée de 5 à 10 cents seulement peut déjà sonner faux dans un accord.",
      },
      {
        question: "Je chante faux. Est-ce que j’ai une mauvaise oreille ?",
        answer:
          "En général, non. Chanter juste demande d’entendre la hauteur et de contrôler sa voix ; la plupart des personnes qui chantent faux ont la première capacité mais pas encore la seconde. Si ce test vous donne un bon score, c’est une affaire de travail vocal, pas d’oreille.",
      },
      {
        question: "Pourquoi la difficulté change-t-elle sans arrêt ?",
        answer:
          "Le test utilise un escalier adaptatif, méthode courante en recherche auditive. Deux bonnes réponses d’affilée rapprochent la paire suivante ; une erreur l’éloigne. Il se stabilise là où vous répondez juste environ 71 % du temps, et le résultat est la moyenne des points de retournement.",
      },
    ],
  },

  "/hearing-age-test": {
    metaTitle: "Test d’âge auditif — Jusqu’où entendez-vous ?",
    metaDescription:
      "Test d’âge auditif gratuit en ligne : des sons de 8 à 20 kHz révèlent la fréquence la plus aiguë que vous entendez et l’âge de vos oreilles.",
    title: "Test d’âge auditif",
    description:
      "Des sons aigus montent de 8 kHz à 20 kHz. Dites lesquels vous entendez, et découvrez la fréquence la plus haute que captent vos oreilles et l’âge qui y correspond.",
    label: "Test d’âge auditif",
    sections: [
      {
        heading: "Tableau de l’âge auditif",
        body: [
          "La fréquence la plus aiguë que l’on entend baisse avec les années (presbyacousie) : elle donne donc une idée approximative de l’âge de vos oreilles. Ce sont des repères : l’exposition au bruit peut vieillir l’oreille bien plus vite que les anniversaires.",
          { table: ["Son le plus aigu entendu", "Typique des"] },
        ],
      },
      {
        heading: "Comment fonctionne le test",
        body: [
          {
            steps: [
              "**Réglez le volume.** Un son de 1 kHz retentit ; réglez-le à un niveau faible et confortable. Tous les sons suivants sont joués au même niveau.",
              "**Montez.** Des sons purs de deux secondes et demie, de 8 kHz à 20 kHz. Chacun apparaît et disparaît en douceur, car un départ brusque produit un clic audible même quand le son ne l’est pas.",
              "**Arrêtez à votre limite.** Le premier son que vous n’entendez pas termine le test. Votre résultat est le plus aigu que vous avez entendu.",
              "**Essai piège.** L’une des étapes est un silence. Si vous dites l’avoir entendu, le résultat est signalé comme peu fiable et ne peut pas être partagé.",
            ],
          },
        ],
      },
      {
        heading: "Pourquoi on perd les aigus",
        body: [
          "L’oreille interne trie les sons par fréquence le long de la cochlée, et les cellules ciliées qui répondent aux aigus se trouvent à l’entrée, là où passe chaque son. Ce sont les premières à s’user, avec l’âge et à cause de la musique forte, des concerts ou des outils bruyants. Elles ne repoussent pas : c’est pourquoi le plafond des fréquences baisse au fil des ans et remonte rarement.",
          "Pour un musicien, c’est une bonne raison de porter des bouchons en répétition et en concert. Les bouchons pour musiciens atténuent toutes les fréquences de la même façon : le groupe sonne toujours comme le groupe, juste moins fort.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quelle est la plage d’audition normale ?",
        answer:
          "La plage théorique va de 20 Hz à 20 kHz, mais seuls les enfants en atteignent le haut. La limite supérieure baisse avec l’âge : la plupart des trentenaires cessent d’entendre vers 16–17 kHz, et la plupart des plus de 50 ans vers 12–14 kHz.",
      },
      {
        question: "Est-ce un test auditif médical ?",
        answer:
          "Non. Il ne vérifie que le haut de votre plage, avec des haut-parleurs non étalonnés. La parole et la musique se situent bien en dessous de 8 kHz : un score bas dit peu de votre audition au quotidien. Si vous percevez des voix étouffées, des acouphènes ou une baisse d’audition, consultez un médecin ou un audioprothésiste.",
      },
      {
        question: "Pourquoi je n’entends pas les sons les plus aigus sur mon téléphone ?",
        answer:
          "Beaucoup de haut-parleurs de téléphone et d’ordinateur chutent nettement au-delà d’environ 15 kHz, et certains écouteurs et codecs Bluetooth coupent aussi les aigus. Un casque filaire donne le résultat le plus fidèle. Si vous n’entendez même pas 8 kHz, c’est presque sûrement le volume ou le haut-parleur.",
      },
      {
        question: "Pourquoi y a-t-il un son silencieux ?",
        answer:
          "Une des étapes ne joue rien. Si vous dites l’avoir entendue, le test sait que vous avez deviné et ne partage pas le résultat comme s’il était réel. Cliquer « Je l’entends » à chaque son est le moyen le plus simple de gonfler son score, et l’essai piège l’empêche.",
      },
      {
        question: "Faut-il monter le volume pour entendre les aigus ?",
        answer:
          "Non. Réglez un niveau confortable avec le son de 1 kHz et n’y touchez plus. Monter fort les hautes fréquences peut abîmer l’audition même que vous testez.",
      },
    ],
  },

  "/music-tests": {
    metaTitle: "Tests musicaux en ligne — Testez votre oreille",
    metaDescription:
      "Tests musicaux gratuits : avez-vous l’oreille absolue, chantez-vous faux, quel est votre âge auditif ? Deux minutes chacun, puis défiez vos amis.",
    title: "Tests musicaux",
    description:
      "Trois tests rapides pour vos oreilles : oreille absolue, oreille musicale et âge auditif. Chacun dure environ deux minutes, fonctionne dans le navigateur et donne un score à partager.",
    label: "Tests musicaux",
    sections: [
      {
        heading: "Trois tests, trois compétences différentes",
        body: [
          "Le **test d’oreille absolue** vérifie si vous savez nommer une note sans rien pour la comparer, une capacité rare qu’on estime souvent à une personne sur dix mille. Le **test d’oreille musicale** mesure le plus petit écart de hauteur que vous entendez, la compétence qui permet d’accorder et de chanter juste. Le **test d’âge auditif** trouve le haut de votre plage d’audition, qui baisse avec l’âge et le bruit.",
          "Aucun n’est un examen médical. Ce sont des vérifications rapides et honnêtes, avec la méthode expliquée sur chaque page, pour que vous sachiez ce que signifie votre chiffre avant de le partager.",
        ],
      },
      {
        heading: "Comment défier un ami",
        body: [
          "À la fin d’un test, appuyez sur « Défier un ami ». Le lien ouvre le même test avec votre score à battre et lui indique à la fin s’il a gagné. « Partager le résultat » envoie un lien avec une image de votre score.",
          "Vos records sont enregistrés dans votre propre navigateur : pas d’inscription, rien n’est envoyé.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ces tests musicaux sont-ils gratuits ?",
        answer: "Oui. Ils fonctionnent tous dans le navigateur, sans inscription, et vos scores restent sur votre appareil. Rien n’est envoyé.",
      },
      {
        question: "Faut-il un casque ?",
        answer:
          "Il aide pour les trois et devient presque indispensable pour le test d’âge auditif, car beaucoup de haut-parleurs de téléphone et d’ordinateur ne restituent pas les très hautes fréquences. Le test d’oreille absolue fonctionne bien sur haut-parleurs.",
      },
      {
        question: "Quel test en dit le plus sur les capacités musicales ?",
        answer:
          "Le test d’oreille musicale. Entendre de petits écarts de hauteur, c’est ce qui permet d’accorder à l’oreille et de chanter ou jouer juste. L’oreille absolue est une mémoire des notes rare que la plupart des bons musiciens n’ont pas, et l’audition des aigus renseigne sur l’âge de vos oreilles, pas sur votre musicalité.",
      },
    ],
  },
};
