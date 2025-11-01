import { useState, useEffect } from "react";
import BookTable from "../components/BookTable";
import GenreFilter from "../components/";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("Action/Adventure");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      const subject =
        genre === "Action/Adventure"
          ? "action"
          : genre === "Romance"
          ? "romance"
          : "education";

      let url = `https://openlibrary.org/search.json?subject=${subject}&limit=10`;
      if (query) {
        // Add title search parameter
        url += `&title=${encodeURIComponent(query)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.docs);
    }

    fetchBooks();
  }, [genre, query]);

  return (
    <div className="dashboard">
      <GenreFilter genre={genre} setGenre={setGenre} />
      <SearchBar onSearch={setQuery} />
      <BookTable books={books} />
    </div>
  );
}
