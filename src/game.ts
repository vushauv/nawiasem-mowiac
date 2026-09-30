import type { Puzzle, PNode } from './types'
import { PENALTY } from './config'

export interface GameState {
  solved: string[]
  revealed: string[]
  letters: string[]
  mistakes: number
  elapsed: number // seconds
  started: boolean
}

export const emptyState = (): GameState => ({
  solved: [],
  revealed: [],
  letters: [],
  mistakes: 0,
  elapsed: 0,
  started: false,
})

export const normalize = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')

export const childIds = (n: PNode) =>
  [...n.template.matchAll(/\{(\w+)\}/g)].map((m) => m[1])

export const openIds = (p: Puzzle, solved: Set<string>) =>
  Object.keys(p.nodes).filter(
    (id) => !solved.has(id) && childIds(p.nodes[id]).every((c) => solved.has(c)),
  )

export const isWon = (p: Puzzle, solved: Set<string>) =>
  openIds(p, solved).includes(p.root)

// Letters glued to a node's placeholder in its parent, e.g. "{miasto}ie" -> suffix "ie".
// They are part of the final word, so typing the word together with them also counts.
const glue = (p: Puzzle, id: string) => {
  const re = new RegExp(`(\\p{L}*)\\{${id}\\}(\\p{L}*)`, 'u')
  for (const n of Object.values(p.nodes)) {
    const m = n.template.match(re)
    if (m) return { pre: m[1], suf: m[2] }
  }
  return { pre: '', suf: '' }
}

// Ids of open nodes whose answer (or alias), bare or with its attached letters, matches the input.
export const matchAnswer = (p: Puzzle, solved: Set<string>, input: string) => {
  const n = normalize(input)
  if (!n) return []
  return openIds(p, solved).filter((id) => {
    const node = p.nodes[id]
    if (!node.answer) return false
    const { pre, suf } = glue(p, id)
    return [node.answer, ...(node.aliases ?? [])].some((a) =>
      [a, pre + a + suf].some((f) => normalize(f) === n),
    )
  })
}

export const penalty = (s: GameState) => ({
  mistakes: s.mistakes * PENALTY.mistake,
  letters: s.letters.length * PENALTY.letter,
  reveals: s.revealed.length * PENALTY.reveal,
})

export const score = (s: GameState) => {
  const p = penalty(s)
  return s.elapsed + p.mistakes + p.letters + p.reveals
}

export const fmt = (sec: number) =>
  `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

// Flat text of a node for aria-labels; unsolved children become "…".
export const plainText = (p: Puzzle, id: string, solved: Set<string>): string =>
  p.nodes[id].template.replace(/\{(\w+)\}/g, (_, c) =>
    solved.has(c) ? (p.nodes[c].shown ?? p.nodes[c].answer ?? '') : '…',
  )
