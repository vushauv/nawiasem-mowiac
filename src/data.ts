import type { Puzzle } from './types'

// All puzzles describe the same event: the Constitution of 3 May 1791.
const source = {
  text: 'Konstytucja 3 maja – Wikipedia',
  url: 'https://pl.wikipedia.org/wiki/Konstytucja_3_maja',
}

// Letters written right after a placeholder (e.g. "{miasto}ie") belong to the word:
// the player types only the part inside the bracket, the rest is glued on by the game.

const easy: Puzzle = {
  id: 'easy',
  level: 'easy',
  root: 'root',
  source,
  context:
    '3 maja 1791 roku Sejm Czteroletni, obradujący w Warszawie na Zamku Królewskim, uchwalił Ustawę Rządową, znaną dziś jako Konstytucja 3 maja. Za panowania Stanisława Augusta Poniatowskiego Rzeczpospolita dostała pierwszą w Europie nowoczesną ustawę zasadniczą.',
  nodes: {
    root: {
      template:
        '{konst} 3 maja została uchwalona w 1791 roku za panowania {stan}a {aug}a Poniatowskiego, a jej kolebką była {miasto}.',
    },
    konst: {
      template: 'ustawa nad ustawami',
      answer: 'Konstytucja',
    },
    miasto: {
      template: 'miasto syrenki, przez które płynie {rzeka}',
      answer: 'Warszawa',
    },
    rzeka: {
      template: 'królowa polskich rzek',
      answer: 'Wisła',
    },
    stan: {
      template: 'imię świętego ze Skałki i ostatniego króla',
      answer: 'Stanisław',
    },
    aug: {
      template: 'ósmy miesiąc po angielsku',
      answer: 'August',
    },
  },
}

const medium: Puzzle = {
  id: 'medium',
  level: 'medium',
  root: 'root',
  source,
  context:
    'Konstytucja 3 maja została uchwalona na Zamku Królewskim w Warszawie przez Sejm Czteroletni (1788–1792). Jest uważana za pierwszą nowoczesną konstytucję w Europie i drugą na świecie po amerykańskiej. Rosja Katarzyny II widziała w niej zagrożenie dla swoich wpływów w Polsce.',
  nodes: {
    root: {
      template:
        '{zamek} Królewski był świadkiem, jak w {rok}u 1791 {sejm} Czteroletni uchwalił ustawę znaną jako {konst} 3 {maj}a, a {car}yca {kat} II uznała ją za zagrożenie.',
    },
    zamek: {
      template: 'dom {krol}a, wysadzony w 1944',
      answer: 'Zamek',
    },
    krol: {
      template: 'najważniejsza figura na szachownicy',
      answer: 'król',
    },
    rok: {
      template: 'dwanaście miesięcy',
      answer: 'rok',
    },
    sejm: {
      template: 'polski parlament' ,
      answer: 'Sejm',
    },
    cztery: {
      template: 'tyle pór roku',
      answer: 'cztery',
      aliases: ['4'],
    },
    konst: {
      template: 'pierwsza taka w Europie, druga na świecie',
      answer: 'Konstytucja',
    },
    maj: {
      template: 'miesiąc maturzystów i kasztanów',
      answer: 'maj',
    },
    car: {
      template: 'tytuł władcy Rosji',
      answer: 'car',
    },
    kat: {
      template: 'Niemka na rosyjskim tronie, która obaliła męża, {piotr}a III',
      answer: 'Katarzyna',
    },
    piotr: {
      template: 'imię apostoła z kluczami do nieba',
      answer: 'Piotr',
    },
  },
}

const hard: Puzzle = {
  id: 'hard',
  level: 'hard',
  root: 'root',
  source,
  context:
    'Konstytucja 3 maja podzieliła władzę na ustawodawczą, wykonawczą i sądowniczą oraz zniosła liberum veto. W 1792 roku magnaci przeciwni reformom zawiązali Konfederację Targowicką i wezwali na pomoc Rosję Katarzyny II. Wojna w obronie Konstytucji zakończyła się porażką, a w 1793 roku Rosja i Prusy przeprowadziły drugi rozbiór Polski.',
  nodes: {
    root: {
      template:
        '{konst} 3 maja zniosła liberum {veto}, lecz {konf} Targowicka wezwała obce wojska, a gdy {imp} wygrała wojnę, nastąpił drugi {rozbior} Polski.',
    },
    konst: {
      template: 'podzieliła władzę na trzy części, a ustawy uchwalał {sejm}',
      answer: 'Konstytucja',
    },
    sejm: {
      template: 'izba, w której zasiadali posłowie',
      answer: 'Sejm',
    },
    veto: {
      template: 'łacińskie „zabraniam”, którym jeden {posel} mógł zerwać obrady',
      answer: 'veto',
    },
    posel: {
      template: 'przedstawiciel szlachty wybrany na sejmiku',
      answer: 'poseł',
    },
    konf: {
      template: 'związek magnatów zawiązany w miejscowości {wies}',
      answer: 'Konfederacja',
    },
    wies: {
      template: 'wieś na Ukrainie, w której nazwie ukrył się {targ}',
      answer: 'Targowica',
    },
    targ: {
      template: 'miejsce handlu pod chmurką',
      answer: 'targ',
    },
    imp: {
      template: 'imperium, którym rządziła caryca {caryca} II',
      answer: 'Rosja',
    },
    caryca: {
      template: 'obaliła własnego męża, cara {piotr} III',
      answer: 'Katarzyna',
    },
    piotr: {
      template: 'imię cara, który wyciął okno na Europę',
      answer: 'Piotr',
    },
    rozbior: {
      template: 'podział kraju, którego w 1793 roku dokonały Rosja i {prusy}',
      answer: 'rozbiór',
    },
    prusy: {
      template: 'królestwo Fryderyka Wielkiego',
      answer: 'Prusy',
    },
  },
}

export const PUZZLES: Puzzle[] = [easy, medium, hard]

export const LEVEL_LABEL = { easy: 'łatwy', medium: 'średni', hard: 'trudny' } as const
