import { useState } from 'react';
import './App.css';
import { fetchBooks } from './BookSearch';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  async function handleSearch() {
    if (!query.trim()) return;
    console.log("Searching for:", query);

    try {
      const results = await fetchBooks(query);
      setBooks(results);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  return (
    <div className="app">
      <h1>Book Search</h1>

      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter book title..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {books.length > 0 && (
        <table className="book-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, i) => (
              <tr key={i}>
                <td>
                  <img
                    src={
                      book.coverId
                        ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
                        : 'https://via.placeholder.com/80x120?text=No+Cover'
                    }
                    alt={book.title}
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
