import { useEffect, useRef, useState } from 'react'
import type { Puzzle } from '../types'
import { matchAnswer, openIds } from '../game'
import { PENALTY } from '../config'
import Node from './Node'

const mini: Puzzle = {
  id: 'mini',
  level: 'easy',
  root: 'root',
  source: { text: '', url: '' },
  context: '',
  nodes: {
    root: { template: 'Każdego ranka wstaje {slonce}.' },
    slonce: {
      template: 'gwiazda, wokół której krąży {ziemia}',
      answer: 'Słońce',
    },
    ziemia: { template: 'planeta, na której mieszkamy', answer: 'Ziemia' },
  },
}

export default function HowTo({ onClose }: { onClose: () => void }) {
  const [solved, setSolved] = useState<Set<string>>(new Set())
  const [letters, setLetters] = useState<Set<string>>(new Set())
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const [selected, setSelected] = useState<string | null>(null)
  const [value, setValue] = useState('')
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = openIds(mini, solved)

  useEffect(() => {
    // preventScroll: the close button sits at the bottom, focusing it would scroll the rules down
    closeRef.current?.focus({ preventScroll: true })
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const hit = matchAnswer(mini, solved, value)
    if (hit.length) {
      setSolved(new Set([...solved, ...hit]))
      if (selected && hit.includes(selected)) setSelected(null)
    }
    setValue('')
  }

  const hintLetter = () => selected && setLetters(new Set([...letters, selected]))
  const hintReveal = () => {
    if (!selected) return
    setSolved(new Set([...solved, selected]))
    setRevealed(new Set([...revealed, selected]))
    setSelected(null)
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="howto-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="howto-title">Jak grać</h2>
        <ol>
          <li>Zdanie opisuje prawdziwe wydarzenie z historii. Część słów ukryto w nawiasach.</li>
          <li>Najpierw możesz odgadnąć tylko nawiasy, które nie zawierają innych nawiasów.</li>
          <li>Wpisz odpowiedź w jedno pole – gra sprawdzi ją we wszystkich otwartych nawiasach.</li>
          <li>Odgadnięte słowo wskakuje na miejsce i odblokowuje nawias wyżej.</li>
          <li>Kliknij otwarty nawias, aby wybrać go i poprosić o podpowiedź. Każda kosztuje dodatkowy czas: litera – pierwsza litera odpowiedzi ({PENALTY.letter} s), słowo – odsłonięcie całej odpowiedzi ({PENALTY.reveal} s).</li>
          <li>Błędna odpowiedź też kosztuje czas.</li>
        </ol>
        <p className="muted">Spróbuj na małym przykładzie:</p>
        <div className="sentence small">
          <Node
            puzzle={mini}
            id="root"
            solved={solved}
            revealed={revealed}
            letters={letters}
            open={open}
            selected={selected}
            onSelect={setSelected}
          />
        </div>
        {selected && open.includes(selected) && !open.includes('root') && (
          <div className="hints" role="group" aria-label="Podpowiedzi dla wybranego nawiasu">
            <span className="hint-label">Podpowiedź:</span>
            <button type="button" onClick={hintLetter} disabled={letters.has(selected)}>
              Litera
            </button>
            <button type="button" onClick={hintReveal}>
              Słowo
            </button>
          </div>
        )}
        {open.includes('root') ? (
          <p className="ok">Brawo! Zdanie złożone. Tak wygrywasz każdą łamigłówkę.</p>
        ) : (
          <form onSubmit={submit} className="row">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="Odpowiedź w przykładzie"
              placeholder="np. ziemia"
              autoComplete="off"
            />
            <button type="submit">Sprawdź</button>
          </form>
        )}
        <button ref={closeRef} type="button" className="ghost" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  )
}
