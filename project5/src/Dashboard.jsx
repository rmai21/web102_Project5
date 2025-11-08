import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("action");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("");
      const subject = genreSubjects[genre];
      const url = query
        ? `https://openlibrary.org/search.json?q=${query}`
        : `https://openlibrary.org/subjects/${subject}.json?limit=10`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();

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
    } catch (err) {
      console.error(err);
      setError("Could not load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") fetchBooks(searchTerm);
  };

  // Dynamic Chart Data
  const genreData = Object.keys(genreSubjects).map((g) => ({
    genre: g.charAt(0).toUpperCase() + g.slice(1),
    count: g === genre ? books.length : 0,
  }));

  const avgYearData = Object.keys(genreSubjects).map((g) => ({
    genre: g.charAt(0).toUpperCase() + g.slice(1),
    year:
      g === genre
        ? Math.floor(
            books.reduce(
              (acc, b) => acc + (b.first_publish_year || 0),
              0
            ) / (books.length || 1)
          )
        : 0,
  }));

  return (
    <div className="App">
      <Sidebar />

      <header>
        <h1>Books on Demand</h1>
      </header>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={() => setSearchTerm("")}>
          Clear
        </button>
      </form>

      <div className="genre-buttons">
        {Object.keys(genreSubjects).map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={genre === g ? "active-genre" : ""}
          >
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
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
                        <Link to={`/book/${encodeURIComponent(book.key)}`}>
                          <img
                            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`}
                            alt={book.title}
                            width="50"
                          />
                        </Link>
                      ) : (
                        "No cover"
                      )}
                    </td>
                    <td>
                      <Link to={`/book/${encodeURIComponent(book.key)}`}>
                        {book.title}
                      </Link>
                    </td>
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

          <h2>Books per Genre</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genreData}>
              <XAxis dataKey="genre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>

          <h2>Average Publish Year per Genre</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avgYearData}>
              <XAxis dataKey="genre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="year" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default Dashboard;
