import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./App.css";

function BookDetail() {
  const { id } = useParams();
  const bookKey = decodeURIComponent(id);
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://openlibrary.org${bookKey}.json`);
        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [bookKey]);

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="App">
      <Sidebar />

      <div className="detail-view">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.authors?.[0]?.name || "Unknown"}</p>
        <p><strong>First Published:</strong> {book.first_publish_year || "N/A"}</p>
        <p><strong>Subjects:</strong> {book.subjects?.join(", ") || "N/A"}</p>
        <p><strong>Number of Pages:</strong> {book.number_of_pages || "N/A"}</p>
        <p><strong>Description:</strong> {book.description?.value || book.description || "No description available"}</p>
      </div>
    </div>
  );
}

export default BookDetail;
