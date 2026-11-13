import type { ToolPageCopy } from "./types";

export const toolPagesPt: Record<string, ToolPageCopy> = {
  "/tap-tempo": {
    metaTitle: "Contador de BPM — Tap Tempo grátis",
    metaDescription:
      "Contador de BPM grátis: toque no ritmo de qualquer música e veja o andamento, a indicação italiana e o dobro ou a metade. Depois pratique no metrônomo.",
    title: "Contador de BPM (Tap Tempo)",
    description:
      "Toque no botão no ritmo da música e leia o andamento em batidas por minuto. Dois toques dão uma ideia; dez dão um resultado estável.",
    label: "Contador de BPM",
    sections: [
      {
        heading: "Como descobrir o BPM de uma música",
        body: [
          {
            steps: [
              "Coloque a música para tocar, ou cantarole uma que você conheça bem.",
              "Toque no botão — ou aperte **Espaço** — a cada batida. Escolha a pulsação em que você marcaria o ritmo com o pé.",
              "Continue por oito a dez toques. A leitura se estabiliza conforme calcula a média.",
              "Se o número parecer rápido ou lento demais, veja a metade e o dobro do andamento; depois abra o metrônomo para praticar nessa velocidade.",
            ],
          },
        ],
      },
      {
        heading: "O que significa BPM",
        body: [
          "BPM são as batidas por minuto: quantas pulsações regulares cabem em sessenta segundos. A 60 BPM há uma batida por segundo; a 120, duas. O andamento é o número mais útil para estudar uma música, porque permite diminuir a velocidade de uma passagem difícil, tocá-la limpa e subir aos poucos.",
        ],
      },
      {
        heading: "Indicações de andamento e faixas de BPM",
        body: [
          "Antes dos metrônomos, os compositores descreviam a velocidade em italiano. Essas palavras continuam nas partituras, e cada uma corresponde a uma faixa de BPM. A ferramenta mostra em qual delas a sua leitura cai.",
          { table: ["Indicação", "BPM"] },
        ],
      },
      {
        heading: "Dicas para tocar com precisão",
        body: [
          {
            list: [
              "**Toque na batida, não depois dela.** É natural reagir um pouco atrasado, mas como todos os toques atrasam quase igual, os intervalos — e o BPM — saem certos.",
              "**Use um trecho estável.** Introduções, viradas e pontes costumam mudar a pulsação. Um verso ou refrão dá o andamento mais fiel.",
              "**Comece do zero a cada música.** Uma pausa de mais de dois segundos e meio reinicia a contagem; Reiniciar ou Esc também fazem isso.",
              "**Os toques são medidos ao pressionar,** sem esperar você soltar o dedo, então não há atraso.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Como funciona o tap tempo?",
        answer:
          "A cada toque, a página anota o instante exato. O BPM é o número de intervalos entre os toques dividido pelo tempo total que eles cobrem, levado a um minuto. Com a média dos últimos dez toques, um toque adiantado ou atrasado quase não muda o resultado.",
      },
      {
        question: "Quantos toques preciso dar?",
        answer:
          "Com dois toques já há um número, mas é só um palpite. De oito a dez toques dão uma leitura estável na maioria das músicas. Se o valor continua variando alguns BPM, a própria música pode oscilar de velocidade, como acontece ao vivo; a média é a resposta honesta.",
      },
      {
        question: "Devo tocar cada batida ou uma sim, uma não?",
        answer:
          "Toque a pulsação em que você balançaria a cabeça ou o pé, em geral a semínima. Se o resultado for exatamente o dobro ou a metade do esperado, é questão de sensação, não erro: abaixo da leitura estão a metade e o dobro do andamento.",
      },
      {
        question: "Por que o número é diferente do que vejo na internet?",
        answer:
          "Bancos de dados costumam listar um único andamento arredondado, mesmo que a faixa acelere um pouco ou seja sentida na metade ou no dobro. Toque durante um verso e um refrão e fique com o valor em que você consegue tocar à vontade.",
      },
      {
        question: "Como pratico no andamento que encontrei?",
        answer:
          "Use os links abaixo da leitura: eles abrem o metrônomo já com o BPM definido, ou o treinador de ritmo, que avalia o quanto seus toques ficam perto da batida.",
      },
    ],
  },

  "/pitch-pipe": {
    metaTitle: "Diapasão de sopro online — afine de ouvido",
    metaDescription:
      "Diapasão de sopro grátis: notas sustentadas para violão, baixo, ukulele e violino, ou as 12 notas cromáticas. Afine de ouvido, sem microfone.",
    title: "Diapasão de sopro online",
    description:
      "Escolha seu instrumento e toque a nota de uma corda: ela fica fixa enquanto você afina. Sem microfone nem permissões.",
    label: "Diapasão de sopro",
    sections: [
      {
        heading: "Como usar o diapasão de sopro",
        body: [
          {
            steps: [
              "Escolha seu instrumento na fileira de cima.",
              "Toque na nota da corda que quer afinar. Ela soa até você tocar de novo ou escolher outra.",
              "Dedilhe a corda solta e ouça os dois sons «batendo» um contra o outro.",
              "Gire a tarraxa devagar até o batimento ficar mais lento e sumir. Chegue sempre à nota por baixo — subindo — para a corda assentar.",
            ],
          },
        ],
      },
      {
        heading: "Notas e frequências",
        body: [
          "Todas as notas são calculadas com Lá4 = 440 Hz em temperamento igual, os mesmos alvos que o afinador de violão escuta.",
          { table: ["Instrumento", "Notas (do grave ao agudo)", "Frequências"] },
        ],
      },
      {
        heading: "Por que vale a pena aprender a afinar de ouvido",
        body: [
          "O afinador diz onde a corda está; o seu ouvido diz se ela soa bem com as outras. Quem afina de ouvido percebe quando um acorde está um pouco fora e corrige em segundos, sem aparelho. Uma nota de referência é o jeito mais rápido de treinar isso, porque o batimento entre duas alturas próximas fica óbvio quando você sabe escutá-lo. Complete com o diapasão online, de som mais puro e curto.",
        ],
      },
    ],
    faqs: [
      {
        question: "O que é um diapasão de sopro?",
        answer:
          "É um pequeno instrumento de palheta que emite uma única nota de referência. Regentes de coral o usam para dar a nota inicial, e instrumentistas de cordas para afinar de ouvido. Esta versão online faz o mesmo pelo seu alto-falante, com uma nota para cada corda dos instrumentos mais comuns.",
      },
      {
        question: "Como afino o violão com ele?",
        answer:
          "Toque a nota de uma corda — por exemplo, o Lá — e toque essa corda solta ao mesmo tempo. Se as alturas não coincidem, você ouve um balanço lento, o batimento. Gire a tarraxa até ele desacelerar e sumir; os dois sons se fundem num só. Repita com cada corda, começando pela sexta.",
      },
      {
        question: "Por que mal ouço as notas graves?",
        answer:
          "Alto-falantes pequenos não movimentam ar suficiente abaixo de uns 100 Hz, o que inclui o Mi grave do violão (82 Hz) e todas as cordas do baixo. Use fones de ouvido ou afine pela mesma nota uma oitava acima, que se ouve bem.",
      },
      {
        question: "Qual a diferença para um afinador?",
        answer:
          "O afinador escuta o instrumento e diz o quanto você está fora. O diapasão de sopro toca o alvo e deixa o ouvido julgar. Não precisa de microfone e treina o ouvido; a maioria dos músicos usa os dois.",
      },
      {
        question: "O que muda o ajuste A4?",
        answer:
          "Define o tom de concerto a partir do qual todas as notas são medidas. 440 Hz é o padrão; 442 e 443 são usados por algumas orquestras, e 432 por quem prefere um som mais caloroso. Se for tocar com uma gravação ou outro instrumento, iguale o tom deles; senão, deixe em 440.",
      },
    ],
  },

  "/tuning-fork": {
    metaTitle: "Diapasão online — Lá 440, Mi, Dó",
    metaDescription:
      "Diapasão virtual grátis: bata num Lá 440, 442, 432, Mi 329 ou Dó 523 e ouça soar e se apagar. Afine violão, violino ou a voz.",
    title: "Diapasão online",
    description:
      "Bata no diapasão e ouça-o soar e se apagar. Use-o como referência pura para afinar uma corda ou a sua voz.",
    label: "Diapasão online",
    sections: [
      {
        heading: "Os diapasões e para que servem",
        body: [{ table: ["Diapasão", "Frequência", "Uso comum"] }],
      },
      {
        heading: "Como afinar com um diapasão",
        body: [
          {
            steps: [
              "Escolha um diapasão e toque nele para bater. Ele soa por uns dez segundos.",
              "Toque a corda correspondente: o Lá com a corda Lá, o Mi com a primeira.",
              "Ouça o batimento: uma pulsação lenta de volume que indica que as duas alturas diferem em alguns hertz. Quanto mais lenta, mais perto; quando para, coincidem.",
              "Afine as outras cordas a partir dela pelo método da quinta casa, ou toque-as uma a uma no diapasão de sopro.",
            ],
          },
        ],
      },
      {
        heading: "Diapasão ou afinador?",
        body: [
          "O afinador cromático mostra quantos cents você está acima ou abaixo. O diapasão não dá nada para ler: dá um som limpo para igualar, que se aprende mais devagar mas forma o ouvido. Muitos professores pedem para afinar de ouvido com o diapasão e conferir depois no afinador.",
        ],
      },
    ],
    faqs: [
      {
        question: "Como funciona um diapasão?",
        answer:
          "É uma barra de aço em forma de U. Ao ser batida, seus dois braços oscilam numa frequência fixa, definida pelo comprimento e pela rigidez. Produz uma onda quase senoidal, com pouquíssimos harmônicos, e por isso é uma referência tão limpa. Um diapasão de 440 Hz vibra 440 vezes por segundo.",
      },
      {
        question: "Como afino o violão com um Lá 440?",
        answer:
          "Bata no diapasão e toque a corda Lá solta, que soa a 110 Hz, duas oitavas abaixo. Gire a tarraxa até o batimento sumir. Depois afine as outras a partir do Lá pelo método da quinta casa: a casa 5 da sexta corda é um Lá, a casa 5 da quinta é um Ré, e assim por diante.",
      },
      {
        question: "Por que o som se apaga?",
        answer:
          "Um diapasão de verdade perde energia para o ar e para a sua mão, então a nota decai em alguns segundos. Este dura cerca de dez, com o «clang» inicial sumindo quase de imediato, como num de aço. Toque de novo para bater outra vez ou use Silenciar para parar.",
      },
      {
        question: "Qual devo usar?",
        answer:
          "O Lá 440 Hz para quase tudo: é o padrão internacional. O Mi 329,63 Hz serve para afinar a corda fina do violão. O Lá 442 Hz combina com orquestras que afinam mais alto, e o 432 Hz agrada a alguns músicos. Os diapasões de Dó são usados em ensino e acústica.",
      },
      {
        question: "É tão exato quanto um de verdade?",
        answer:
          "A altura é calculada, então é exata até onde vai o relógio de áudio do seu aparelho: melhor que um diapasão barato, que pode errar vários cents e varia um pouco com a temperatura. O timbre é sintético e não iguala o de aço, mas o que importa para afinar é a altura.",
      },
    ],
  },

  "/chord-quiz": {
    metaTitle: "Quiz de acordes de violão — nomeie a forma",
    metaDescription:
      "Quiz de acordes de violão grátis: aparece um diagrama e você nomeia. Comece pelos acordes abertos e avance para sétimas e pestanas. Com sequências e áudio.",
    title: "Quiz de acordes de violão",
    description:
      "Veja o diagrama e dê o nome do acorde. As respostas erradas são acordes parecidos, porque essa é a habilidade que importa.",
    label: "Quiz de acordes",
    sections: [
      {
        heading: "Como funciona o quiz",
        body: [
          {
            steps: [
              "Escolha um nível. Acordes abertos maiores e menores são o melhor ponto de partida.",
              "Estude o diagrama e escolha o nome certo entre quatro opções, ou aperte de 1 a 4.",
              "Depois de responder você ouve o acorde e vê as notas. Aperte Próximo, ou N, para outro.",
              "Os acordes que você erra voltam com mais frequência até fixar.",
            ],
          },
          "Os acordes são escritos com letras (C, Dm, G7), como na maioria das cifras: C = Dó, D = Ré, E = Mi, F = Fá, G = Sol, A = Lá, B = Si.",
        ],
      },
      {
        heading: "Dicas para aprender as formas",
        body: [
          {
            list: [
              "**Aprenda por famílias.** As formas abertas de Mi e de Lá estão por trás de todos os acordes com pestana. A biblioteca de acordes mostra cada uma em todos os tons.",
              "**Diga as notas.** Cada resposta lista as notas do acorde. Um acorde é uma receita, e conhecê-la fixa o nome.",
              "**Toque a forma também.** Depois de cada pergunta, reproduza-a no violão. O localizador de acordes funciona ao contrário: você marca uma forma e ele dá o nome.",
              "**Seja breve.** Dez perguntas por dia valem mais que uma hora por semana. Conta para a sua sequência de prática.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Como se lê um diagrama de acorde?",
        answer:
          "As linhas verticais são as cordas, a mais grossa à esquerda, e as horizontais são as casas. Um ponto mostra onde colocar um dedo, um O acima da corda significa tocá-la solta e um X, não tocá-la. Se o diagrama começa depois da primeira casa, um número ao lado indica qual.",
      },
      {
        question: "Por que aprender acordes de relance?",
        answer:
          "Reconhecer uma forma na hora permite ler uma cifra, identificar um acorde nas mãos de outro violonista e achar o próximo sem parar. Também faz o braço do instrumento fazer sentido: você vê que um menor é um maior com um dedo movido.",
      },
      {
        question: "O que significam os níveis?",
        answer:
          "Maiores e menores abertos: os primeiros acordes que todo mundo aprende. Todos os abertos: inclui sétimas, sus e mais. Tudo: inclui pestanas e todas as qualidades.",
      },
      {
        question: "O que são os acordes para revisar?",
        answer:
          "Quando você responde um acorde pelo menos três vezes com menos de 70% de acertos, ele aparece abaixo do quiz e é mostrado com mais frequência. Seus resultados ficam neste dispositivo, a menos que você os leve com o link de transferência de progresso.",
      },
      {
        question: "Por que dois acordes podem soar iguais?",
        answer:
          "Alguns acordes têm exatamente as mesmas notas com nomes diferentes, como C6 e Am7. O quiz nunca oferece os dois na mesma pergunta, então só existe uma resposta correta.",
      },
    ],
  },

  "/setlist-builder": {
    metaTitle: "Criador de setlist — músicas, tons e afinações",
    metaDescription:
      "Criador de setlist grátis para violonistas: tom, BPM, capotraste e afinação por música, avisos de reafinação, impressão e link para compartilhar.",
    title: "Criador de setlist",
    description:
      "Adicione suas músicas com tom, andamento, capotraste e afinação, e a lista mostra onde você terá de reafinar no palco.",
    label: "Criador de setlist",
    sections: [
      {
        heading: "Como montar um setlist que funciona",
        body: [
          {
            steps: [
              "Adicione cada música com tom, andamento, afinação e duração. O que não souber, deixe em branco.",
              "Ordene com as setas. Avisos de reafinação aparecem entre músicas de afinações diferentes.",
              "Experimente «Agrupar por afinação» para ver quantas reafinações dá para eliminar, e decida se o fluxo do show continua bom.",
              "Imprima ou copie o link para a banda.",
            ],
          },
        ],
      },
      {
        heading: "Como dosar um show",
        body: [
          {
            list: [
              "**Abra forte, não rápido.** Uma música conhecida num andamento confortável acalma os nervos e a plateia.",
              "**Varie andamento e tom.** Três músicas na mesma velocidade e no mesmo tom se misturam. Os campos de BPM e tom deixam isso visível num relance.",
              "**Coloque as reafinações onde há conversa.** Trocar de afinação é mais fácil enquanto a banda apresenta uma música ou agradece. O diapasão de sopro e o afinador ajudam a ser rápido.",
              "**Conheça seu andamento.** Se não sabe o BPM de uma música, marque no contador de BPM e anote o resultado.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Como funciona o aviso de reafinação?",
        answer:
          "Sempre que uma música pede afinação diferente da anterior, a lista marca a troca entre elas. Menos reafinações significam menos pausas desconfortáveis e menos cordas fora do lugar após um ajuste rápido. «Agrupar por afinação» junta as músicas da mesma afinação, mantendo a ordem relativa, e diz quantas reafinações economiza.",
      },
      {
        question: "Meu setlist fica salvo?",
        answer:
          "Sim, neste dispositivo, no armazenamento do navegador. Nada é enviado. Para abrir a mesma lista em outro aparelho ou mandar para alguém da banda, use Copiar link: a lista viaja dentro do próprio link, na parte depois do #, que os navegadores nunca enviam a um servidor.",
      },
      {
        question: "Posso imprimir o setlist para o palco?",
        answer:
          "Aperte Imprimir. A página esconde tudo menos a lista, em preto sobre branco e com os avisos de reafinação. Se toca com pouca luz, use fonte grande nas configurações de impressão do navegador.",
      },
      {
        question: "Quais afinações posso escolher?",
        answer:
          "Padrão, meio tom abaixo, um tom abaixo, Drop D, Drop C, DADGAD e as abertas em Sol, Ré, Mi, Lá e Dó. Cada uma leva ao afinador correspondente para você afinar antes do show.",
      },
      {
        question: "Funciona para músicas com capotraste?",
        answer:
          "Sim. Informe a casa do capotraste em cada música. O capotraste não muda a afinação, então não conta como reafinação, mas é um objeto a mover e vale vê-lo na lista.",
      },
    ],
  },
};
