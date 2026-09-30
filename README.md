# Nawiasem mówiąc

Prototype of a daily recursive word puzzle (React + TypeScript + Vite). UI in Polish.
Built for a game-contest submission.

## Run

    docker compose up              # http://localhost:8080, hot reload (dev server)

Production-style image (built static bundle, served by `vite preview`):

    docker build -t nawiasem . && docker run -p 8080:8080 nawiasem

or locally: `npm install && npm run dev`.

## Adding / editing puzzles

Puzzles are hardcoded in `src/data.ts`. A puzzle is a tree of nodes; a template
references children with `{id}` placeholders. Every non-root node needs an `answer`
(base form typed by the player), and may have `shown` (inflected form used inside
the sentence) and `aliases`. Letters written right after a placeholder
(`{miasto}ie`) belong to the word: the player types only the part in the bracket
(`Warszaw`, or `Warszawa` via an alias), and typing the full form (`Warszawie`) also matches. Penalties are in `src/config.ts`.

## Attribution

The mechanic is inspired by the Russian-language game Ра[скобки] (Dmitrii Usenko).
All puzzles, copy and visuals here are original.
