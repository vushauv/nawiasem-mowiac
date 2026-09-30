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
        '{konst}ę 3 maja 1791 roku uchwalono w {miasto}ie za panowania {stan}a {aug}a Poniatowskiego.',
    },
    konst: {
      template: 'ustawa nad ustawami',
      answer: 'Konstytucj',
      aliases: ['Konstytucja'],
    },
    miasto: {
      template: 'miasto syrenki nad {rzeka}ą',
      answer: 'Warszaw',
      aliases: ['Warszawa'],
    },
    rzeka: {
      template: 'królowa polskich rzek',
      answer: 'Wisł',
      aliases: ['Wisła'],
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
        '{zamek} Królewski był świadkiem, jak w {rok}u 1791 {sejm} uchwalił ustawę znaną jako {konst} 3 {maj}a, czym rozgniewał {car}ycę {kat}.',
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
      template: 'parlament obradujący {cztery} lata',
      answer: 'Sejm Czteroletni',
      aliases: ['Sejm Wielki', 'Sejm'],
    },
    cztery: {
      template: 'tyle pór roku',
      answer: 'cztery',
      aliases: ['4'],
    },
    konst: {
      template: 'pierwsza taka w Europie, druga na świecie',
      answer: 'Konstytucja',
      aliases: ['Ustawa Rządowa'],
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
      answer: 'Katarzyna II',
      shown: 'Katarzynę II',
      aliases: ['Katarzyna Wielka', 'Katarzyna'],
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
        '{konst}a 3 maja zniosła {veto}, lecz {targ} wezwała na pomoc {imp}ę, a po przegranej wojnie w obronie ustawy nastąpił {rozbior} Polski.',
    },
    konst: {
      template:
        'podzieliła władzę na {ustaw}ą, wykonawczą i sądowniczą',
      answer: 'Konstytucj',
      aliases: ['Konstytucja', 'Ustawa Rządowa'],
    },
    ustaw: {
      template: 'ta, którą sprawuje {sejm}',
      answer: 'ustawodawcz',
      aliases: ['ustawodawcza', 'władza ustawodawcza'],
    },
    sejm: {
      template: 'izba posłów',
      answer: 'Sejm',
      aliases: ['Izba Poselska'],
    },
    veto: {
      template:
        'jedno „nie” zrywało cały sejm; wolne {veto2}',
      answer: 'liberum veto',
    },
    veto2: {
      template: 'łacińskie „zabraniam”',
      answer: 'veto',
    },
    targ: {
      template: 'zdrada magnatów, nazwana od wsi {wies}y',
      answer: 'Konfederacja Targowicka',
      aliases: ['konfederacja'],
    },
    wies: {
      template: '{targ2}owica',
      answer: 'Targowic',
      aliases: ['Targowica'],
    },
    targ2: {
      template: 'miejsce handlu pod chmurką',
      answer: 'Targ',
    },
    imp: {
      template: 'kraj, w którym rządziła {caryca}',
      answer: 'Rosj',
      aliases: ['Rosja', 'Imperium Rosyjskie'],
    },
    caryca: {
      template: 'obaliła własnego męża, {piotr3}',
      answer: 'Katarzyna II',
      shown: 'Katarzynę II',
      aliases: ['Katarzyna Wielka', 'Katarzyna'],
    },
    piotr3: {
      template: 'wnuk cara {piotr1}',
      answer: 'Piotr III',
      shown: 'Piotra III',
    },
    piotr1: {
      template: 'car, który wyciął okno na Europę',
      answer: 'Piotr I',
      shown: 'Piotra Wielkiego',
      aliases: ['Piotr Wielki', 'Piotr I Wielki'],
    },
    rozbior: {
      template: 'mapa pocięta w 1793 przez Rosję i {prusy}y',
      answer: 'drugi rozbiór',
      aliases: ['II rozbiór'],
    },
    prusy: {
      template:
        'królestwo Fryderyka Wielkiego',
      answer: 'Prus',
      aliases: ['Prusy', 'Królestwo Pruskie'],
    },
  },
}

export const PUZZLES: Puzzle[] = [easy, medium, hard]

export const LEVEL_LABEL = { easy: 'łatwy', medium: 'średni', hard: 'trudny' } as const
