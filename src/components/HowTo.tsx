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
    root: { template: '{pies} goni {kot}a.' },
    pies: { template: 'zwierzę, które szczeka', answer: 'pies', shown: 'Pies' },
    kot: { template: 'domowy zwierzak, który łapie {mysz}y', answer: 'kot' },
    mysz: { template: 'mały gryzoń, który lubi ser', answer: 'mysz' },
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

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    // preventScroll: the close button sits at the bottom, focusing it would scroll the rules down
    closeRef.current?.focus({ preventScroll: true })
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !modalRef.current) return
      // focus trap: wrap Tab / Shift+Tab inside the dialog
      const f = modalRef.current.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input, [role="button"][tabindex="0"], a[href]',
      )
      if (!f.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      opener?.focus?.({ preventScroll: true })
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
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="howto-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="ghost modal-x" aria-label="Zamknij" onClick={onClose}>
          ×
        </button>
        <p className="kicker">Jak grać</p>
        <h2 id="howto-title">Spróbuj odkryć warstwę</h2>
        <p>Rozwiąż przykład: każdy nawias to podpowiedź do słowa.</p>
        <div className="sentence small example">
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
          <p className="status ok">Brawo! Zdanie złożone. Tak wygrywasz każdą łamigłówkę.</p>
        ) : (
          <>
            <p className="status">
              {open.length > 1
                ? 'Otwarte są dwie gałęzie — pierwszą można rozwiązać od razu, a drugą odkrywać krok po kroku.'
                : 'Została jedna gałąź — teraz odpowiedź wynika z poprzedniej.'}
            </p>
            <form onSubmit={submit}>
              <label className="field-label" htmlFor="howto-answer">
                Wpisz odpowiedź na dowolną dostępną podpowiedź:
              </label>
              <div className="row">
                <input
                  id="howto-answer"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Wpisz słowo wprost"
                  autoComplete="off"
                />
                <button type="submit">Sprawdź</button>
              </div>
            </form>
          </>
        )}
        <ul className="rules">
          <li>
            Znasz odpowiedź? <strong>Wpisz ją na dole</strong> — klikanie nawiasu nie jest potrzebne.
          </li>
          <li>Kilka nawiasów naraz? Rozwiązuj je w dowolnej kolejności.</li>
          <li>
            Litery przy nawiasie, jak w <em>[…]a</em>, dopisuje gra. Wielkość liter i polskie znaki
            nie mają znaczenia.
          </li>
          <li>
            Utknąłeś? <strong>Kliknij nawias</strong>, by wziąć podpowiedź. Kary: błąd +{PENALTY.mistake} s,
            litera +{PENALTY.letter} s, słowo +{PENALTY.reveal} s (w przykładzie bez kary).
          </li>
        </ul>
        <div className="modal-foot">
          <button ref={closeRef} type="button" onClick={onClose}>
            Zagraj
          </button>
        </div>
      </div>
    </div>
  )
}
