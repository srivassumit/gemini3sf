UI for the GraphQL books demo

Quick start

1. Start the GraphQL server (from project root):

```bash
npm run dev
```

The server listens on `http://localhost:4000/` by default.

2. Install and run the UI (uses Vite)

```bash
# from project root
cd ui
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. The dev server will serve the React app and the app will POST a GraphQL query to `http://localhost:4000/` to fetch books.

You can also build and preview a production bundle:

```bash
cd ui
npm run build
npm run preview
```

Notes

- The current GraphQL schema in this repo exposes the book genre under the misspelled field `genric`. The UI requests that field and displays it as "Genre". If you update the server schema to use `genre`, update the query in `src/App.jsx` accordingly.
- This UI uses a Vite dev server and a small React app so you can open the page directly in your browser while developing.
