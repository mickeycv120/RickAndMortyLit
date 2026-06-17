# Rick and Morty Lit

Un explorador de personajes de Rick and Morty hecho con Web Components nativos usando LitElement. Sin frameworks, sin magia oculta — solo componentes, la API pública y algo de CSS.

![Rick and Morty](./assets/Rick_and_Morty.svg)

---

## ¿De qué va esto?

Puedes buscar personajes por nombre, ver su información en un modal, marcarlos como favoritos (se guardan aunque recargues la página) y navegar por la paginación. Si la API tarda o falla, hay reintentos automáticos y estados de error decentes.

Nada del otro mundo, pero está bien organizado y es una buena base para seguir construyendo encima.

## Stack

- **LitElement** para los Web Components
- **Vite** como bundler (va rapidísimo)
- **Axios** para las peticiones HTTP, con interceptores y reintentos con backoff exponencial
- **Vitest + happy-dom** para los tests

La API que se consume es la [Rick and Morty API](https://rickandmortyapi.com/), pública y sin autenticación.

## Cómo arrancarlo

```bash
npm install
npm run dev
```

Y ya. Abre `http://localhost:5173`.

## Scripts

```bash
npm run dev            # desarrollo
npm run build          # build de producción
npm run preview        # previsualizar el build

npm test               # tests en modo watch
npm run test:run       # tests una sola vez
npm run test:coverage  # cobertura
```

## Estructura

El código vive todo bajo `app/` y está dividido por capas:

```
app/
├── core/           → configuración, constantes, HTTP client, stores
├── features/       → todo lo relacionado con personajes (componentes, mappers, servicios)
├── pages/          → página principal
└── shared/         → componentes genéricos (loader, error, empty state...) y utils
```

Los tests están co-localizados junto al código que testean (`.spec.js` al lado de cada archivo).

## Tests

Hay tests unitarios para las partes que más lo merecen: el mapper que transforma la respuesta de la API, el servicio de personajes, el store de favoritos y el debounce. Los componentes LitElement no están testeados todavía — para eso haría falta `@web/test-runner`, que es otra historia.
