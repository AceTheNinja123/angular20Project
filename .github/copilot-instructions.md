# Copilot Instructions for Angular20Playground

This repository is an Angular 20 playground application with many demo pages, games, and exploratory components.

## Primary commands

- `npm start` → runs `ng serve` and starts the development server.
- `npm run build` → runs `ng build` and builds the app to `dist/`.
- `npm run watch` → builds in watch mode for development.
- `npm run serve:ssr:angular20-playground` → starts the SSR server from `dist/angular20-playground/server/server.mjs` after a production build.

## Project structure

- `src/app/` contains the feature pages, demos, games, and shared logic.
- `src/app/components/` contains reusable standalone component units.
- `src/app/services/` contains HTTP and app-specific service logic.
- `src/assets/` contains static assets, JSON data, charts, and images.
- `src/app/app.config.ts` defines application providers and routing.
- `src/app/app.ts` is the main bootstrap component loaded by `index.html`.

## Key conventions

- Use standalone Angular components.
- Prefer `signal()` for local state and `computed()` for derived state.
- Use `ChangeDetectionStrategy.OnPush` on components where appropriate.
- Favor `input()` and `output()` functions instead of decorator-based input/output.
- Avoid `@HostBinding` and `@HostListener`; use the component `host` metadata instead.
- Prefer inline templates for small components and keep templates simple.
- Avoid `ngClass` and `ngStyle`; use class and style bindings instead.
- Use `NgOptimizedImage` for static image assets when possible.
- Keep services single-responsibility and use `providedIn: 'root'`.
- Prefer `inject()` over constructor injection in services and providers.

## Development guidance

- Use the README demo links to confirm which route corresponds to a feature page.
- The app router is configured in `src/app/app.config.ts`; add new routes there for new pages.
- Use Bootstrap classes for layout when adding grid/demo UI.
- Keep feature modules small; avoid introducing legacy `NgModule` patterns.

## Testing

- Run `ng test` for unit tests via Karma.
- No dedicated Jest script is configured in package scripts despite the repo containing Jest-related config files.

## Notes for AI assistants

- This file is the primary Copilot instruction for repository behavior.
- Use `.claude/CLAUDE.md` for Angular and TypeScript style rules that apply across the repo.
- Preserve existing project conventions and avoid introducing broad architectural changes unless requested.
