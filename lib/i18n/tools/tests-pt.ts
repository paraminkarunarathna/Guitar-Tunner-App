import type { ToolPageCopy } from "./types";

export const testPagesPt: Record<string, ToolPageCopy> = {
  "/perfect-pitch-test": {
    metaTitle: "Teste de ouvido absoluto — Você tem?",
    metaDescription:
      "Teste de ouvido absoluto grátis: ouça 12 notas sem referência e diga o nome de cada uma. Descubra em dois minutos se você tem ouvido absoluto.",
    title: "Teste de ouvido absoluto",
    description:
      "Doze notas, uma de cada vez, sem nota de referência para comparar. Diga o nome de cada uma e descubra se você tem ouvido absoluto.",
    label: "Teste de ouvido absoluto",
    sections: [
      {
        heading: "Como o teste funciona",
        body: [
          "O teste toca 12 notas sorteadas em três oitavas, de Dó3 a Si5: a extensão de um violão das cordas do meio até a casa 12 da primeira corda. Você responde com o nome da nota (Dó, Dó♯/Ré♭, Ré…); a oitava não importa.",
          "Dois detalhes impedem que ele vire um teste de intervalos. Antes de cada nota toca uma rajada curta de tons aleatórios que apaga a lembrança da anterior, e duas notas seguidas nunca têm o mesmo nome nem ficam a menos de três semitons. O timbre também alterna entre uma corda dedilhada e um tom mais estável, porque quem tem ouvido absoluto reconhece a nota em qualquer instrumento.",
          "No chute, você acerta uma nota em doze. Qualquer resultado bem acima disso mostra que algumas notas estão fixadas na sua memória.",
        ],
      },
      {
        heading: "O que seu resultado significa",
        body: [{ table: ["Acertos", "Resultado"] }],
      },
      {
        heading: "Ouvido absoluto x ouvido relativo",
        body: [
          "O ouvido absoluto é raro e não é necessário para ser um grande músico: a maioria dos grandes instrumentistas não tem. O que eles têm é um ótimo **ouvido relativo**: percebem que uma melodia sobe uma terça maior, que um acorde é menor ou que uma corda está alguns cents abaixo da vizinha.",
          "O ouvido relativo pode ser treinado em qualquer idade. O teste de ouvido musical desta mesma série mede o quanto você percebe diferenças finas de afinação, justamente a habilidade de afinar de ouvido.",
        ],
      },
      {
        heading: "Dicas para um resultado justo",
        body: [
          {
            list: [
              "Faça em silêncio. Música de fundo é uma nota de referência e distorce o resultado.",
              "Responda no instinto. O ouvido absoluto é imediato; deduzir a nota a partir de uma música é outra habilidade.",
              "Não cantarole nem toque nada entre as notas: é para isso que servem os tons aleatórios.",
              "Repita em outro dia. Uma rodada de 12 notas tem um pouco de sorte, e seu melhor resultado fica salvo.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Como saber se tenho ouvido absoluto?",
        answer:
          "Quem tem ouvido absoluto diz o nome de uma nota na hora e sem esforço, como quem diz o nome de uma cor: sem referência e sem cantarolar uma música conhecida. Se você tira 11 ou 12 de 12 num teste assim, rápido e com timbres diferentes, provavelmente tem. Resultados intermediários costumam indicar boa memória tonal, não ouvido absoluto.",
      },
      {
        question: "O ouvido absoluto é raro?",
        answer:
          "Costuma ser estimado em cerca de 1 a cada 10.000 pessoas. É bem mais comum entre músicos que começaram a estudar na primeira infância, e alguns estudos encontram taxas maiores entre falantes de línguas tonais que também começaram a música cedo.",
      },
      {
        question: "Qual a diferença entre ouvido absoluto e relativo?",
        answer:
          "Ouvido absoluto é dizer o nome de uma nota sem referência. Relativo é ouvir a distância entre as notas, por exemplo saber que a segunda está uma quinta acima da primeira. É o ouvido relativo que permite tocar de ouvido, transpor e afinar o violão por ele mesmo, e quase todo mundo consegue treiná-lo.",
      },
      {
        question: "Dá para aprender ouvido absoluto depois de adulto?",
        answer:
          "Com prática constante, adultos melhoram bastante em reconhecer notas, e alguns estudos de treino mostram grandes ganhos. Se isso é o mesmo que o ouvido absoluto espontâneo de quem tem desde criança ainda é debatido. Para quem toca violão, treinar o ouvido relativo rende muito mais.",
      },
      {
        question: "Por que tocam bipes aleatórios entre as notas?",
        answer:
          "Sem eles, qualquer pessoa com bom ouvido relativo ouviria o intervalo a partir da nota anterior e deduziria a resposta. A rajada de tons aleatórios e fora da afinação apaga essa memória de curto prazo, então o teste mede a memória das notas, não o ouvido para intervalos.",
      },
    ],
  },

  "/tone-deaf-test": {
    metaTitle: "Teste de ouvido musical — Sou desafinado?",
    metaDescription:
      "Teste de ouvido musical grátis: o segundo tom é mais agudo ou mais grave? Ele se adapta até achar a menor mudança de afinação que você ouve.",
    title: "Teste de ouvido musical",
    description:
      "Tocam dois tons. O segundo foi mais agudo ou mais grave? A diferença diminui a cada acerto, até achar a menor mudança de afinação que você consegue ouvir.",
    label: "Teste de ouvido musical",
    sections: [
      {
        heading: "Como o teste funciona",
        body: [
          "Cada rodada toca dois tons curtos em volta de uma nota central aleatória, entre Mi4 e Mi5. Você diz se o segundo foi mais agudo ou mais grave. Os primeiros pares estão a um semitom (100 cents, a distância entre duas casas), o que quase todo mundo ouve com facilidade.",
          "Depois de dois acertos seguidos a diferença diminui 30%; depois de um erro aumenta 40%. O teste termina após oito mudanças de direção e mostra a média geométrica das seis últimas. Esse número é o seu **limiar de discriminação de altura**: a menor mudança que você ouve com segurança.",
        ],
      },
      {
        heading: "O que seu resultado significa",
        body: [
          { table: ["Limiar", "Resultado"] },
          "Quanto menor, melhor. Para comparar, um afinador costuma considerar uma corda afinada dentro de ±5 cents. Se você percebe 10 cents ou menos, consegue afinar bem de ouvido.",
        ],
      },
      {
        heading: "O que é ser desafinado de verdade",
        body: [
          "A amusia congênita é uma dificuldade permanente de perceber a altura dos sons que não vem de perda auditiva nem de falta de contato com música. Quem tem costuma não perceber uma nota errada numa melodia conhecida, e testes de discriminação como este são uma das formas de rastreá-la. Mesmo assim, um teste no navegador não diagnostica nada: alto-falantes, barulho e atenção influem.",
          "A maioria de quem se acha desafinado ouve afinação normalmente; o que falta é treinar a voz. Se for o seu caso, cante para o detector de tom vocal e olhe o ponteiro: ver se você está acima ou abaixo é como ouvido e voz aprendem a concordar.",
        ],
      },
      {
        heading: "Como melhorar seu resultado",
        body: [
          {
            list: [
              "Use fones e um lugar silencioso. Ventilador e trânsito escondem mudanças pequenas.",
              "Ouça os dois tons inteiros antes de responder. Aperte R para repetir.",
              "Não pense demais nas dúvidas: um chute não tem problema, o método foi feito para absorver isso.",
              "Treine entre as tentativas: afine uma corda com um diapasão e ouça a ondulação lenta (batimento) que some quando as duas notas se igualam.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Como saber se sou desafinado?",
        answer:
          "A verdadeira surdez tonal (amusia congênita) é uma dificuldade real de ouvir mudanças de altura, normalmente menores que um semitom. Se você distingue qual de dois tons é mais agudo quando estão a menos de meio semitom (50 cents), você não é desafinado de ouvido, mesmo que não goste de como canta.",
      },
      {
        question: "Quantas pessoas são realmente desafinadas?",
        answer:
          "As estimativas de amusia congênita vão de 1,5% a 4% das pessoas. Muito mais gente acha que é desafinada do que realmente é: a maioria ouve perfeitamente e só precisa treinar a voz.",
      },
      {
        question: "O que é um cent?",
        answer:
          "Um cent é a centésima parte de um semitom. Um semitom é a distância entre duas casas vizinhas do violão, então vale 100 cents. Afinadores mostram cents porque uma corda desviada só 5 a 10 cents já pode soar estranha num acorde.",
      },
      {
        question: "Não canto afinado. Quer dizer que sou desafinado de ouvido?",
        answer:
          "Geralmente não. Cantar afinado exige ouvir a altura e controlar a voz, e a maioria de quem canta desafinado tem a primeira coisa, mas ainda não a segunda. Se este teste der um bom resultado, a questão é treino vocal, não ouvido.",
      },
      {
        question: "Por que a dificuldade muda o tempo todo?",
        answer:
          "O teste usa uma escada adaptativa, método comum em pesquisa auditiva. Dois acertos seguidos aproximam o próximo par; um erro o afasta. Ele se estabiliza onde você acerta cerca de 71% das vezes, e o resultado é a média dos pontos de virada.",
      },
    ],
  },

  "/hearing-age-test": {
    metaTitle: "Teste de idade auditiva — Até onde você ouve?",
    metaDescription:
      "Teste de idade auditiva online e grátis: tons de 8 a 20 kHz mostram a frequência mais aguda que você ouve e a idade dos seus ouvidos.",
    title: "Teste de idade auditiva",
    description:
      "Tons agudos sobem de 8 kHz a 20 kHz. Diga quais você ouve e descubra a frequência mais alta que seus ouvidos captam, e a idade típica para ela.",
    label: "Teste de idade auditiva",
    sections: [
      {
        heading: "Tabela de idade auditiva",
        body: [
          "A frequência mais aguda que ouvimos cai com os anos (presbiacusia), então ela dá uma ideia aproximada da idade dos seus ouvidos. São números de referência: a exposição a ruído pode envelhecer o ouvido muito mais rápido que os aniversários.",
          { table: ["Tom mais agudo ouvido", "Típico de"] },
        ],
      },
      {
        heading: "Como o teste funciona",
        body: [
          {
            steps: [
              "**Ajuste o volume.** Toca um tom de 1 kHz; deixe num nível baixo e confortável. Todos os tons seguintes tocam no mesmo nível.",
              "**Suba.** Tons puros de dois segundos e meio, de 8 kHz a 20 kHz. Cada um entra e sai suavemente, porque um início brusco gera um clique que daria para ouvir mesmo sem ouvir o tom.",
              "**Pare no seu limite.** O primeiro tom que você não ouvir encerra o teste. Seu resultado é o mais agudo que você ouviu.",
              "**Rodada de controle.** Um dos passos é silêncio. Se você disser que ouviu, o resultado é marcado como pouco confiável e não pode ser compartilhado.",
            ],
          },
        ],
      },
      {
        heading: "Por que perdemos os agudos",
        body: [
          "O ouvido interno separa o som por frequência ao longo da cóclea, e as células ciliadas que respondem aos agudos ficam na entrada, por onde passa todo som. Elas são as primeiras a se desgastar, pela idade e por música alta, shows e ferramentas barulhentas. Elas não se regeneram, por isso o teto de frequências cai com o tempo e raramente volta.",
          "Para quem toca, é um bom motivo para usar protetor auricular em ensaios e shows. Protetores para músicos reduzem o volume por igual em todas as frequências: a banda continua soando como a banda, só que mais baixo.",
        ],
      },
    ],
    faqs: [
      {
        question: "Qual é a faixa normal de audição?",
        answer:
          "A faixa dos livros é de 20 Hz a 20 kHz, mas só crianças chegam ao topo. O limite superior cai com a idade: a maioria dos adultos na casa dos trinta para de ouvir por volta de 16–17 kHz, e a maioria das pessoas acima de 50, por volta de 12–14 kHz.",
      },
      {
        question: "Isto é um exame de audição médico?",
        answer:
          "Não. Ele verifica só o topo da sua faixa, com alto-falantes não calibrados. Fala e música ficam bem abaixo de 8 kHz, então um resultado baixo diz pouco sobre a audição do dia a dia. Se você percebe vozes abafadas, zumbido ou perda auditiva, procure um médico ou fonoaudiólogo.",
      },
      {
        question: "Por que não ouço os tons mais agudos no celular?",
        answer:
          "Muitos alto-falantes de celular e notebook caem muito acima de uns 15 kHz, e alguns fones e codecs Bluetooth também cortam agudos. Fones com fio dão o resultado mais fiel. Se você não ouve nem 8 kHz, quase certamente é o volume ou o alto-falante.",
      },
      {
        question: "Por que existe um tom em silêncio?",
        answer:
          "Um dos passos não toca nada. Se você disser que ouviu, o teste sabe que foi chute e não compartilha o resultado como se fosse real. Apertar «Estou ouvindo» em todos os tons é o jeito mais fácil de inflar a nota, e a rodada de controle impede isso.",
      },
      {
        question: "Devo aumentar o volume para ouvir os agudos?",
        answer:
          "Não. Ajuste um nível confortável com o tom de 1 kHz e deixe assim. Aumentar muito as frequências altas pode danificar justamente a audição que você está testando.",
      },
    ],
  },

  "/music-tests": {
    metaTitle: "Testes musicais online — Teste seu ouvido",
    metaDescription:
      "Testes musicais grátis: veja se você tem ouvido absoluto, se é desafinado e qual sua idade auditiva. Dois minutos cada, depois desafie seus amigos.",
    title: "Testes musicais",
    description:
      "Três testes rápidos para os seus ouvidos: ouvido absoluto, ouvido musical e idade auditiva. Cada um leva uns dois minutos, roda no navegador e dá um resultado para compartilhar.",
    label: "Testes musicais",
    sections: [
      {
        heading: "Três testes, três habilidades diferentes",
        body: [
          "O **teste de ouvido absoluto** verifica se você consegue dizer o nome de uma nota sem nada para comparar, uma capacidade rara, estimada em cerca de uma pessoa a cada dez mil. O **teste de ouvido musical** mede a menor mudança de afinação que você ouve, a habilidade por trás de afinar e cantar afinado. O **teste de idade auditiva** encontra o topo da sua faixa de audição, que cai com a idade e o barulho.",
          "Nenhum deles é exame médico. São verificações rápidas e honestas, com o método explicado em cada página, para você saber o que seu número significa antes de compartilhar.",
        ],
      },
      {
        heading: "Como desafiar um amigo",
        body: [
          "Ao terminar um teste, toque em «Desafiar um amigo». O link abre o mesmo teste com o seu resultado como meta e, no fim, diz se a pessoa ganhou. «Compartilhar resultado» envia um link com uma imagem da sua pontuação.",
          "Seus melhores resultados ficam salvos no seu próprio navegador: sem cadastro e sem enviar nada.",
        ],
      },
    ],
    faqs: [
      {
        question: "Esses testes musicais são grátis?",
        answer: "Sim. Todos rodam no navegador, sem cadastro, e os resultados ficam no seu aparelho. Nada é enviado.",
      },
      {
        question: "Preciso de fones de ouvido?",
        answer:
          "Ajudam nos três e são quase indispensáveis no teste de idade auditiva, porque muitos alto-falantes de celular e notebook não tocam frequências muito altas. O teste de ouvido absoluto funciona bem com alto-falantes.",
      },
      {
        question: "Qual teste diz mais sobre habilidade musical?",
        answer:
          "O teste de ouvido musical. Ouvir pequenas diferenças de afinação é o que permite afinar de ouvido e cantar ou tocar afinado. O ouvido absoluto é uma memória rara de notas que a maioria dos bons músicos não tem, e ouvir agudos fala da idade dos seus ouvidos, não da sua musicalidade.",
      },
    ],
  },
};
