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
    root: { template: '{historyk} pracuje w {stolica}u.' },
    historyk: { template: 'naukowiec badający przeszłość', answer: 'Historyk' },
    stolica: { template: '{stol}ica Francji', answer: 'Paryż' },
    stol: {
      template: 'mebel, przy którym się je obiad',
      answer: 'stol',
      aliases: ['stół'],
    },
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
        <p className="kicker">Jak grać</p>
        <h2 id="howto-title">Spróbuj odkryć warstwę</h2>
        <p>
          Jeśli znasz odpowiedź, po prostu wpisz ją w polu na dole —{' '}
          <strong>klikanie nawiasu nie jest potrzebne</strong>. Poprawne słowo samo pojawi się na
          swoim miejscu i stanie się częścią następnej podpowiedzi.
        </p>
        <p>
          Jeśli otwartych jest kilka podpowiedzi naraz,{' '}
          <strong>możesz je rozwiązywać w dowolnej kolejności</strong> — albo trzymać kilka w
          głowie jednocześnie.
        </p>
        <p>
          Litery doklejone do nawiasu, jak w <em>[…]ica</em>, są częścią słowa: wpisujesz tylko to,
          co mieści się w nawiasie, a końcówkę gra dopisze sama. Nie musisz pisać dokładnie tak jak
          w źródle — liczy się słowo, które pasuje do podpowiedzi.
        </p>
        <p>
          <strong>Kliknij nawias, jeśli potrzebujesz pomocy przy konkretnej podpowiedzi.</strong>
        </p>
        <p>
          Każda błędna odpowiedź dodaje do czasu {PENALTY.mistake} s, pierwsza litera — {PENALTY.letter}{' '}
          s, a odsłonięcie całego słowa — {PENALTY.reveal} s. W tym przykładzie podpowiedzi są
          szkoleniowe i bez kary.
        </p>
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
        <div className="modal-foot">
          <button ref={closeRef} type="button" className="ghost" onClick={onClose}>
            Zamknij
          </button>
        </div>
      </div>
    </div>
  )
}
