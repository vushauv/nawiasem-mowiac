# Nawiasem mówiąc

Prototype of a daily recursive word puzzle (React + TypeScript + Vite). UI in Polish.
Built for a game-contest submission.

## Run

    docker compose up              # http://localhost:8080, hot reload (dev server)

Production image (built static bundle, served by nginx on :80):

    docker build -t nawiasem . && docker run -p 8080:80 nawiasem

On a server behind a reverse proxy, join the external `web` network instead of
publishing a port:

    docker compose -f docker-compose.prod.yml up -d --build

and proxy to `http://wyborcza-game:80`.

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
