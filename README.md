# Angular20Playground

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Example: Routing and Grid Layout

This project demonstrates two ways to use Angular components:

### 1. Routing (Navigation)
- Use the navigation buttons at the top to switch between **Page One** and **Page Two**.
- Each page is a separate Angular component, loaded via Angular Router.

### 2. Grid Layout (One Page)
- Click the **Grid Demo** button to see both components displayed side by side in a Bootstrap grid.
- The grid uses Bootstrap's responsive classes for layout.

#### How to Add More Components
- Generate a new component:
  ```bash
  ng generate component my-new-component --standalone --skip-tests
  ```
- Add it to the router in `src/app/app.config.ts` for navigation, or include its selector in any template for grid/layout usage.

#### Bootstrap
- Bootstrap is included for easy grid and styling. You can use any Bootstrap classes in your templates.
