import React, { useEffect, useState } from 'react'

export default function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true)
      setError(null)
      try {
        const resp = await fetch('http://localhost:4000/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: `query { books { title author genre } }` }),
        })

        if (!resp.ok) throw new Error(`Network error: ${resp.status}`)
        const json = await resp.json()
        if (json.errors) throw new Error(json.errors.map(e => e.message).join('; '))
        const data = json.data?.books || []
        setBooks(data)
      } catch (err) {
        setError(err.message || String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  return (
    <div className="container">
      <h1>Books</h1>
      {loading && <div className="loading">Loading books from GraphQL API...</div>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 && (
              <tr>
                <td colSpan={3}>No books returned by the API.</td>
              </tr>
            )}
            {books.map((b, idx) => (
              <tr key={`${b.title}-${idx}`}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.genre ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
