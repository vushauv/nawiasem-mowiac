import type { Puzzle } from '../types'
import { plainText } from '../game'

interface Props {
  puzzle: Puzzle
  id: string
  solved: Set<string>
  revealed: Set<string>
  letters: Set<string>
  open: string[]
  selected: string | null
  onSelect: (id: string) => void
  fresh?: string[] // just guessed: flashed once
  depth?: number
}

// Word joiner: keeps a bracket glued to the word next to it so it never wraps alone.
const WJ = '\u2060'

// Renders a node's template; each {child} becomes either the solved word
// or a bracket that renders the child recursively.
export default function Node(props: Props) {
  const { puzzle, id, solved, revealed, letters, open, selected, onSelect, fresh = [], depth = 0 } = props
  const parts = puzzle.nodes[id].template.split(/(\{\w+\})/)

  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\{(\w+)\}$/)
        if (!m) return <span key={i}>{part}</span>
        const c = m[1]
        const child = puzzle.nodes[c]

        if (solved.has(c)) {
          return (
            <strong
              key={i}
              className={`word${revealed.has(c) ? ' revealed' : ''}${fresh.includes(c) ? ' fresh' : ''}`}
            >
              {child.shown ?? child.answer}
            </strong>
          )
        }

        const inner = <Node {...props} id={c} depth={depth + 1} />
        const isOpen = open.includes(c)

        if (isOpen) {
          return (
            // span, not <button>: buttons are atomic and can't wrap across lines
            <span
              key={i}
              role="button"
              tabIndex={0}
              className={`bracket open d${depth % 5}${selected === c ? ' selected' : ''}`}
              aria-label={`Nawias do odgadnięcia: ${plainText(puzzle, c, solved)}`}
              aria-pressed={selected === c}
              onClick={(e) => {
                e.stopPropagation()
                onSelect(c)
              }}
              onKeyDown={(e) => {
                if (e.target !== e.currentTarget) return
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(c)
                }
              }}
            >
              <span className="br">[</span>
              {WJ}
              {inner}
              {letters.has(c) && (
                <span className="letter"> ({child.answer![0].toUpperCase()}…)</span>
              )}
              {WJ}
              <span className="br">]</span>
            </span>
          )
        }

        return (
          <span
            key={i}
            className={`bracket locked d${depth % 5}`}
            aria-label={`Zablokowany nawias: ${plainText(puzzle, c, solved)}`}
          >
            <span className="br">[</span>
              {WJ}
            {inner}
            {WJ}
              <span className="br">]</span>
          </span>
        )
      })}
    </>
  )
}

