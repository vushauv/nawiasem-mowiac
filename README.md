# Nawiasem mówiąc

Prototype of a daily recursive word puzzle (React + TypeScript + Vite). UI in Polish.
Built for a game-contest submission.

## Run

    docker compose up --build      # http://localhost:8080

or locally: `npm install && npm run dev`.

## Adding / editing puzzles

Puzzles are hardcoded in `src/data.ts`. A puzzle is a tree of nodes; a template
references children with `{id}` placeholders. Every non-root node needs an `answer`
(base form typed by the player), and may have `shown` (inflected form used inside
the sentence) and `aliases`. Penalties are in `src/config.ts`.

## Attribution

The mechanic is inspired by the Russian-language game Ра[скобки] (Dmitrii Usenko).
All puzzles, copy and visuals here are original.
