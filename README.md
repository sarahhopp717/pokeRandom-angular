# 🎲 pokeRandom

A random Pokemon generator built with Angular, TypeScript, and the PokeAPI. Click the button, discover a Pokemon — complete with its type, base stats, and full evolution chain. Card colors adapt to match the Pokemon's primary type.

Originally built as part of the Crexendo Developer Advocate take-home assessment in React — ported to Svelte, and then to Angular, to demonstrate framework range.

## 🚀 Features

- **Random Pokemon Generation** — fetches a random Pokemon from all 1,025 across every generation
- **Type-Colored Cards** — card background dynamically matches the Pokemon's primary type
- **Evolution Chain** — displays the full evolution line using chained API calls
- **Error Handling** — typed handling of 404s, rate limits, and network failures
- **Loading State** — button disables during fetch to prevent duplicate requests
- **Fully Typed** — Pokemon data shape enforced end-to-end with TypeScript interfaces

## 🛠️ Tech Stack

- Angular (standalone components, signals)
- TypeScript
- RxJS
- PokeAPI (no auth or API key required)
- Vanilla CSS

## 📁 Project Structure

```
pokerandom-angular/
├── public/
│   ├── card-back.png                        # Pokemon card back background image
│   └── favicon.ico                          # Favicon
├── src/
│   ├── app/
│   │   ├── pokemon-card/
│   │   │   ├── pokemon-card.component.ts    # Card logic — signal input, computed card color
│   │   │   ├── pokemon-card.component.html  # Card template — types, stats, evolution chain
│   │   │   └── pokemon-card.component.css   # Card styling
│   │   ├── app.component.ts                 # Root component — signals, fetch, error handling
│   │   ├── app.component.html               # Root template — button, error, card
│   │   ├── app.component.css                # Root styling
│   │   ├── app.component.spec.ts            # Component tests
│   │   ├── app.config.ts                    # App-level providers (HttpClient)
│   │   ├── pokemon.model.ts                 # Shared Pokemon interfaces used across the app
│   │   └── pokemon.service.ts               # PokeAPI calls — chained requests via RxJS
│   ├── index.html                           # HTML template
│   ├── main.ts                              # Angular entry point — bootstraps the app
│   └── styles.css                           # Global base styles and card background
├── angular.json                             # Angular CLI configuration
├── package.json                             # Project dependencies and scripts
├── tsconfig.json                            # TypeScript configuration
├── tsconfig.app.json                        # App-specific TypeScript configuration
├── tsconfig.spec.json                       # Test-specific TypeScript configuration
└── README.md                                # You are here
```

## ⚙️ Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

1. Clone the repository

```bash
   git clone https://github.com/sarahhopp717/pokerandom-angular.git
   cd pokerandom-angular
```

2. Install dependencies

```bash
   npm install
```

3. Start the development server

```bash
   npm start
```

4. Open your browser to `http://localhost:4200`

## 🌐 API

This app uses the [PokeAPI](https://pokeapi.co/) — a free, open REST API requiring no authentication or API key.

### Endpoints Used

**Get Pokemon by ID**

```
GET https://pokeapi.co/api/v2/pokemon/{id}
```

Returns name, Pokedex number, sprite image, types, and base stats.

**Get Pokemon Species**

```
GET https://pokeapi.co/api/v2/pokemon-species/{id}
```

Returns a reference URL to the evolution chain.

**Get Evolution Chain**

```
GET https://pokeapi.co/api/v2/evolution-chain/{id}
```

Returns the full evolution chain for the Pokemon.

### Data Used From Response

| Field                   | Description                                 |
| ----------------------- | ------------------------------------------- |
| `id`                    | Pokedex number                              |
| `name`                  | Pokemon name                                |
| `sprites.front_default` | Official sprite image URL                   |
| `types`                 | Array of type objects                       |
| `stats`                 | Array of base stat objects                  |
| `species.url`           | Link to species endpoint for evolution data |

All of the above are typed via the interfaces in `src/app/pokemon.model.ts`.

## 🛡️ Error Handling

Errors are caught as a typed `HttpErrorResponse` and branched on status code:

| Scenario                       | Handling                                                           |
| ------------------------------ | ------------------------------------------------------------------ |
| 404 Not Found                  | "Pokemon not found (404) — this ID does not exist in the PokeAPI." |
| 429 Rate Limit                 | "Too many requests (429) — please wait a moment and try again."    |
| Network failure / other errors | Generic message: "Could not load a Pokémon. Try again."            |
| Duplicate requests             | Button disabled while a fetch is in flight                         |

## 🔁 About the Angular Port

This project began as a React/JavaScript app, was rebuilt in Svelte + TypeScript, and then rebuilt again in Angular. Key differences:

- **State** — Angular uses signals (`signal()`), read by calling them (`loading()`), instead of React's `useState` or Svelte's plain `let` variables
- **Derived values** — `computed()` recalculates the card color only when the Pokemon signal changes, the Angular counterpart of Svelte's `$:`
- **Data fetching** — `HttpClient` returns Observables rather than Promises. The three dependent API calls (Pokemon → species → evolution chain) are chained with RxJS `switchMap` instead of sequential `await`s
- **Dependency injection** — the `PokemonService` is injected through the component constructor rather than imported and called directly
- **Templates** — separate `.html` files using Angular's control flow (`@if`, `@for`) and bindings (`[property]`, `(event)`, `{{ }}`) in place of JSX or Svelte blocks
- **Styles** — each component's CSS is scoped to its own template; global styles live in `styles.css`
- **Type safety** — typed interfaces for every API response, plus `HttpErrorResponse` for status-code error handling

Same app, same data, same look — three frameworks. The other versions:

- React: [github.com/sarahhopp717/pokeRandom](https://github.com/sarahhopp717/pokeRandom)
- Svelte: [github.com/sarahhopp717/pokerandom-svelte](https://github.com/sarahhopp717/pokerandom-svelte)

## ⚠️ Known Limitations

- The PokeAPI rate limits at 100 requests per minute per IP — normal usage will never approach this
- Pokemon IDs are generated between 1–1025 to avoid 404 errors from non-existent IDs
- Sprite images are low-resolution pixel art by design — this is the official artwork served by the PokeAPI
- Evolution chain displays only the primary evolution path — branching evolutions (like Eevee) show the first branch only

## 🔮 Future Improvements

- Card shuffle animation on button click to enhance the random selection feel
- Ability to compare two random Pokemon side by side
- Type effectiveness chart showing strengths and weaknesses
