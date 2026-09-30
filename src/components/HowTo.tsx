import { useEffect, useRef, useState } from 'react'
import type { Puzzle } from '../types'
import { matchAnswer, openIds } from '../game'
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
  const [value, setValue] = useState('')
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = openIds(mini, solved)

  useEffect(() => {
    closeRef.current?.focus()
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const hit = matchAnswer(mini, solved, value)
    if (hit.length) setSolved(new Set([...solved, ...hit]))
    setValue('')
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
          <li>Kliknij nawias, aby poprosić o podpowiedź (kosztuje czas). Błąd też kosztuje.</li>
        </ol>
        <p className="muted">Spróbuj na małym przykładzie:</p>
        <div className="sentence small">
          <Node
            puzzle={mini}
            id="root"
            solved={solved}
            revealed={new Set()}
            letters={new Set()}
            open={open}
            selected={null}
            onSelect={() => {}}
          />
        </div>
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
