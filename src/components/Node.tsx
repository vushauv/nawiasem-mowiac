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
  depth?: number
}

// Renders a node's template; each {child} becomes either the solved word
// or a bracket that renders the child recursively.
export default function Node(props: Props) {
  const { puzzle, id, solved, revealed, letters, open, selected, onSelect, depth = 0 } = props
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
            <strong key={i} className={revealed.has(c) ? 'word revealed' : 'word'}>
              {child.shown ?? child.answer}
            </strong>
          )
        }

        const inner = <Node {...props} id={c} depth={depth + 1} />
        const isOpen = open.includes(c)

        if (isOpen) {
          return (
            <button
              key={i}
              type="button"
              className={`bracket open d${depth % 5}${selected === c ? ' selected' : ''}`}
              aria-label={`Nawias do odgadnięcia: ${plainText(puzzle, c, solved)}`}
              aria-pressed={selected === c}
              onClick={() => onSelect(c)}
            >
              <span className="br">[</span>
              {inner}
              {letters.has(c) && (
                <span className="letter"> ({child.answer![0].toUpperCase()}…)</span>
              )}
              <span className="br">]</span>
            </button>
          )
        }

        return (
          <span
            key={i}
            className={`bracket locked d${depth % 5}`}
            aria-label={`Zablokowany nawias: ${plainText(puzzle, c, solved)}`}
          >
            <span className="br">[</span>
            {inner}
            <span className="br">]</span>
          </span>
        )
      })}
    </>
  )
}

