import { useCallback, useState } from 'react'
import { LEVEL_LABEL, PUZZLES } from './data'
import Game from './components/Game'
import HowTo from './components/HowTo'

const HELP_SEEN = 'nm:help-seen'

export default function App() {
  const [idx, setIdx] = useState(0)
  const [help, setHelp] = useState(() => {
    try { return !localStorage.getItem(HELP_SEEN) } catch { return true }
  })
  const puzzle = PUZZLES[idx]

  const closeHelp = useCallback(() => {
    try { localStorage.setItem(HELP_SEEN, '1') } catch { /* ignore */ }
    setHelp(false)
  }, [])

  return (
    <div className="app">
      <header>
        <h1 className="logo" aria-label="Nawiasem mówiąc">
          <span className="br">[</span>nawias<span className="br">]</span>em mówiąc
        </h1>
        <button type="button" className="ghost" onClick={() => setHelp(true)}>
          Jak grać
        </button>
      </header>

      <div className="tabs" role="tablist" aria-label="Poziom trudności">
        {PUZZLES.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === idx}
            className={i === idx ? 'tab active' : 'tab'}
            onClick={() => setIdx(i)}
          >
            {LEVEL_LABEL[p.level]}
          </button>
        ))}
      </div>

      <main>
        <Game
          key={puzzle.id}
          puzzle={puzzle}
          paused={help}
          onNext={idx < PUZZLES.length - 1 ? () => setIdx(idx + 1) : undefined}
        />
      </main>

      <footer>
        <p>
          Mechanika zainspirowana grą{' '}
          <a href="https://raskobki.app/" target="_blank" rel="noreferrer">
            Ра[скобки]
          </a>{' '}
          (Dmitrii Usenko).
        </p>
        <p>To prototyp przygotowany na potrzeby zgłoszenia konkursowego.</p>
      </footer>

      {help && <HowTo onClose={closeHelp} />}
    </div>
  )
}
