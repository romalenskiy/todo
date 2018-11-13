# ToDo

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Start setup

Starting project locally:

```bash
git clone https://github.com/Roman-Alenskiy/todo.git
```

```bash
npm install
```

```bash
npm run watch
```

## About

- In this application you can create projects. Each project can contain any number of tasks (todos).

- There is no backend, all interactions provided by Javascript. All projects and todos are stored in browser local storage. It means you can refresh page and all projects will be restore.

- You can clear the entire local storage by command in inspector console:

  ```js
  localStorage.clear()
  ```

- Application contains seeds. Seeds render for the first application launch and after each local storage clearing.

- CSS frameworks used in application:
  - [Materialize](https://materializecss.com/) for appearance, modals, animations, etc.
  - [Foundation](https://foundation.zurb.com/) for grid layout only.