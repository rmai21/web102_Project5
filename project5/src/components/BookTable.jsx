export default function BookTable({ books }) {
  return (
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
        {books.map((book) => (
          <tr key={book.key}>
            <td>
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                  alt={book.title}
                  style={{ width: "40px", height: "60px" }}
                />
              ) : (
                "No cover"
              )}
            </td>
            <td>{book.title}</td>
            <td>{book.author_name ? book.author_name.join(", ") : "Unknown"}</td>
            <td>{book.first_publish_year || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
