import { useEffect, useRef, useState } from 'react'
import type { Puzzle } from '../types'
import { LEVEL_LABEL } from '../data'
import { PENALTY } from '../config'
import {
  emptyState, fmt, isWon, matchAnswer, openIds, penalty, score, type GameState,
} from '../game'
import Node from './Node'

const key = (p: Puzzle) => `nm:v2:${p.id}`

const load = (p: Puzzle): GameState => {
  try {
    const raw = localStorage.getItem(key(p))
    if (raw) return { ...emptyState(), ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return emptyState()
}

export default function Game({ puzzle }: { puzzle: Puzzle }) {
  const [s, setS] = useState<GameState>(() => load(puzzle))
  const [selected, setSelected] = useState<string | null>(null)
  const [value, setValue] = useState('')
  const [msg, setMsg] = useState('')
  const [visible, setVisible] = useState(!document.hidden)
  const inputRef = useRef<HTMLInputElement>(null)

  const solved = new Set(s.solved)
  const revealed = new Set(s.revealed)
  const letters = new Set(s.letters)
  const open = openIds(puzzle, solved)
  const won = isWon(puzzle, solved)

  // persist progress
  useEffect(() => {
    try { localStorage.setItem(key(puzzle), JSON.stringify(s)) } catch { /* ignore */ }
  }, [s, puzzle])

  // stopwatch: runs after first interaction, pauses when tab hidden, stops on win
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])
  const running = s.started && visible && !won
  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setS((x) => ({ ...x, elapsed: x.elapsed + 1 })), 1000)
    return () => clearInterval(t)
  }, [running])

  const start = () => !s.started && setS((x) => ({ ...x, started: true }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    const hit = matchAnswer(puzzle, solved, value)
    if (hit.length) {
      setS((x) => ({ ...x, started: true, solved: [...x.solved, ...hit] }))
      setMsg('Trafione!')
      if (selected && hit.includes(selected)) setSelected(null)
    } else {
      setS((x) => ({ ...x, started: true, mistakes: x.mistakes + 1 }))
      setMsg(`Nie pasuje. +${PENALTY.mistake} s`)
    }
    setValue('')
  }

  const hintLetter = () => {
    if (!selected || letters.has(selected)) return
    setS((x) => ({ ...x, started: true, letters: [...x.letters, selected] }))
  }
  const hintReveal = () => {
    if (!selected) return
    setS((x) => ({
      ...x,
      started: true,
      solved: [...x.solved, selected],
      revealed: [...x.revealed, selected],
    }))
    setSelected(null)
  }
  const reset = () => {
    setS(emptyState())
    setSelected(null)
    setMsg('')
  }

  const select = (id: string) => {
    start()
    setSelected((cur) => (cur === id ? null : id))
  }

  const nodeProps = {
    puzzle, solved, revealed, letters, open, selected, onSelect: select,
  }
  const total = score(s)
  const pen = penalty(s)

  return (
    <section aria-label={`Łamigłówka: ${LEVEL_LABEL[puzzle.level]}`}>
      <div className="bar">
        <span className="timer" aria-label="Czas">{fmt(s.elapsed)}</span>
        <span className="muted">
          błędy: {s.mistakes} · podpowiedzi: {s.letters.length + s.revealed.length}
        </span>
      </div>

      <p className="sentence">
        <Node {...nodeProps} id={puzzle.root} />
      </p>

      {won ? (
        <div className="win" role="status">
          <h2>Gotowe!</h2>
          <p className="big">{fmt(total)}</p>
          <p className="muted">
            czas {fmt(s.elapsed)}
            {pen.mistakes > 0 && ` + błędy ${pen.mistakes} s`}
            {pen.letters > 0 && ` + litery ${pen.letters} s`}
            {pen.reveals > 0 && ` + odsłonięte ${pen.reveals} s`}
          </p>
          <p>{puzzle.context}</p>
          <p>
            Źródło:{' '}
            <a href={puzzle.source.url} target="_blank" rel="noreferrer">
              {puzzle.source.text}
            </a>
          </p>
          <div className="row">
            <button type="button" className="ghost" onClick={reset}>
              Zagraj od nowa
            </button>
          </div>
        </div>
      ) : (
        <div className="dock">
          {selected && (
            <div className="hints" role="group" aria-label="Podpowiedzi dla wybranego nawiasu">
              <span className="hint-label">Podpowiedź:</span>
              <button type="button" onClick={hintLetter} disabled={letters.has(selected)}>
                Litera (+{PENALTY.letter} s)
              </button>
              <button type="button" onClick={hintReveal}>
                Słowo (+{PENALTY.reveal} s)
              </button>
              <button type="button" className="ghost" onClick={() => setSelected(null)}>
                ×
              </button>
            </div>
          )}
          <form onSubmit={submit} className="row answer">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => { setValue(e.target.value); start() }}
              aria-label="Wpisz odpowiedź"
              placeholder="Wpisz odpowiedź…"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <button type="submit">Sprawdź</button>
          </form>
          <p className="msg" aria-live="polite">{msg}</p>
        </div>
      )}
    </section>
  )
}
