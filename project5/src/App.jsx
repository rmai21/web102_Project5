import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("action");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Map your genres to relevant OpenLibrary subjects
  const genreSubjects = {
    action: "action",
    romance: "romance",
    educational: "education",
  };

  useEffect(() => {
    fetchBooks();
  }, [genre]);

  const fetchBooks = async (query = "") => {
    try {
      setLoading(true);
      const subject = genreSubjects[genre];
      const url = query
        ? `https://openlibrary.org/search.json?q=${query}`
        : `https://openlibrary.org/subjects/${subject}.json?limit=10`;

      const response = await fetch(url);
      const data = await response.json();

      // Normalize data for both endpoints
      let booksData = [];

      if (data.works) {
        booksData = data.works.map((book) => ({
          key: book.key,
          title: book.title,
          author: book.authors?.[0]?.name || "Unknown",
          cover_id: book.cover_id,
          first_publish_year: book.first_publish_year,
        }));
      } else if (data.docs) {
        booksData = data.docs.slice(0, 10).map((book) => ({
          key: book.key,
          title: book.title,
          author: book.author_name?.[0] || "Unknown",
          cover_id: book.cover_i,
          first_publish_year: book.first_publish_year,
        }));
      }

      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchTerm);
  };

  return (
    <div className="App">
      {/* Header */}
      <header>
        <h1>Books on Demand</h1>
      </header>

      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li>About</li>
          <li>Search</li>
          <li>Dashboard</li>
        </ul>
      </nav>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Genre Buttons */}
      <div className="genre-buttons">
        <button onClick={() => setGenre("action")}>Action/Adventure</button>
        <button onClick={() => setGenre("romance")}>Romance</button>
        <button onClick={() => setGenre("educational")}>Educational</button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.key}>
                  <td>
                    {book.cover_id ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`}
                        alt={book.title}
                        width="50"
                      />
                    ) : (
                      "No cover"
                    )}
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.first_publish_year || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No books found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
