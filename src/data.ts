import type { Puzzle } from './types'

// All puzzles describe the same event: the Constitution of 3 May 1791.
const source = {
  text: 'Konstytucja 3 maja – Wikipedia',
  url: 'https://pl.wikipedia.org/wiki/Konstytucja_3_maja',
}

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
        '{konst} 3 maja 1791 roku uchwalono w {miasto}, za panowania {krol}.',
    },
    konst: {
      template: 'najważniejsza ustawa w państwie, określająca jego ustrój',
      answer: 'Konstytucja',
      shown: 'Konstytucję',
      aliases: ['ustawa zasadnicza'],
    },
    miasto: {
      template: 'stolica Polski, leżąca nad {rzeka}',
      answer: 'Warszawa',
      shown: 'Warszawie',
    },
    rzeka: {
      template: 'najdłuższa rzeka Polski',
      answer: 'Wisła',
      shown: 'Wisłą',
    },
    krol: {
      template: 'ostatni król Polski',
      answer: 'Stanisław August Poniatowski',
      shown: 'Stanisława Augusta Poniatowskiego',
      aliases: ['Stanisław August', 'Poniatowski'],
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
      template: 'W {zamek} {sejm} uchwalił {konst}, a {imp} nie była tym zachwycona.',
    },
    zamek: {
      template:
        'główna rezydencja {krol} w stolicy, wysadzona przez Niemców w 1944 roku i odbudowana po wojnie',
      answer: 'Zamek Królewski',
      shown: 'Zamku Królewskim',
      aliases: ['Zamek Królewski w Warszawie', 'Zamek Warszawski'],
    },
    krol: {
      template: 'ostatni król Polski',
      answer: 'Stanisław August Poniatowski',
      shown: 'Stanisława Augusta Poniatowskiego',
      aliases: ['Stanisław August', 'Poniatowski'],
    },
    sejm: {
      template: 'parlament z lat 1788–1792, którego nazwa mówi, że trwał {cztery} lata',
      answer: 'Sejm Czteroletni',
      aliases: ['Sejm Wielki', 'Czteroletni'],
    },
    cztery: {
      template: 'tyle jest pór roku',
      answer: 'cztery',
      aliases: ['4'],
    },
    konst: {
      template:
        'pierwsza w Europie nowoczesna konstytucja, nazwana od trzeciego dnia {maj}',
      answer: 'Konstytucja 3 maja',
      shown: 'Konstytucję 3 maja',
      aliases: ['Konstytucja', 'Ustawa Rządowa'],
    },
    maj: {
      template: 'miesiąc między kwietniem a czerwcem',
      answer: 'maj',
      shown: 'maja',
    },
    imp: {
      template: 'największe państwo świata, rządzone wtedy przez {caryca}',
      answer: 'Rosja',
      aliases: ['Imperium Rosyjskie'],
    },
    caryca: {
      template: 'Katarzyna {dwa}, zwana Wielką',
      answer: 'Katarzyna II',
      shown: 'Katarzynę II',
      aliases: ['Katarzyna Wielka', 'Katarzyna'],
    },
    dwa: {
      template: 'jedyna parzysta liczba pierwsza',
      answer: 'dwa',
      shown: 'II',
      aliases: ['2', 'II'],
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
        '{konst} zniosła {veto}, lecz {targ} wezwała na pomoc {imp}, a po przegranej wojnie w obronie ustawy nastąpił {rozbior}.',
    },
    konst: {
      template:
        'polska ustawa zasadnicza z maja 1791 roku, która podzieliła władzę na {ustaw}, wykonawczą i sądowniczą',
      answer: 'Konstytucja 3 maja',
      aliases: ['Konstytucja', 'Ustawa Rządowa'],
    },
    ustaw: {
      template: 'ta z trzech władz, którą sprawuje {sejm}',
      answer: 'ustawodawcza',
      shown: 'ustawodawczą',
      aliases: ['władza ustawodawcza'],
    },
    sejm: {
      template: 'izba, w której zasiadają posłowie, a nie senatorowie',
      answer: 'Sejm',
      aliases: ['Izba Poselska'],
    },
    veto: {
      template:
        'zasada, dzięki której jeden poseł mógł zerwać obrady; po łacinie „wolne {veto2}”',
      answer: 'liberum veto',
    },
    veto2: {
      template: 'łacińskie „zabraniam”',
      answer: 'veto',
    },
    targ: {
      template: 'związek magnatów z 1792 roku, nazwany od ukraińskiej wsi {wies}',
      answer: 'Konfederacja Targowicka',
      aliases: ['konfederacja'],
    },
    wies: {
      template: 'wieś, której nazwa pochodzi od słowa oznaczającego miejsce handlu pod gołym niebem',
      answer: 'Targowica',
      shown: 'Targowicy',
    },
    imp: {
      template: 'państwo rządzone wówczas przez {caryca}',
      answer: 'Rosja',
      shown: 'Rosję',
      aliases: ['Imperium Rosyjskie'],
    },
    caryca: {
      template: 'caryca, która w 1762 roku zdetronizowała swojego męża, {piotr3}',
      answer: 'Katarzyna II',
      shown: 'Katarzynę II',
      aliases: ['Katarzyna Wielka', 'Katarzyna'],
    },
    piotr3: {
      template: 'wnuk cara {piotr1}, obalony w 1762 roku przez własną żonę',
      answer: 'Piotr III',
      shown: 'Piotra III',
    },
    piotr1: {
      template: 'car, który założył Petersburg',
      answer: 'Piotr I',
      shown: 'Piotra Wielkiego',
      aliases: ['Piotr Wielki', 'Piotr I Wielki'],
    },
    rozbior: {
      template:
        'podział ziem polskich w 1793 roku między Rosję i {prusy}',
      answer: 'drugi rozbiór',
      shown: 'drugi rozbiór Polski',
      aliases: ['II rozbiór', 'drugi rozbiór Polski', 'II rozbiór Polski'],
    },
    prusy: {
      template:
        'niemieckie królestwo ze stolicą w Berlinie, którego królem był wtedy Fryderyk Wilhelm II',
      answer: 'Prusy',
      aliases: ['Królestwo Pruskie'],
    },
  },
}

export const PUZZLES: Puzzle[] = [easy, medium, hard]

export const LEVEL_LABEL = { easy: 'łatwy', medium: 'średni', hard: 'trudny' } as const
