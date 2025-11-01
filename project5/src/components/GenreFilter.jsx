export default function GenreFilter({ genre, setGenre }) {
  const genres = ["Action/Adventure", "Romance", "Educational/Informational"];

  return (
    <div className="genre-filter">
      {genres.map((g) => (
        <button
          key={g}
          onClick={() => setGenre(g)}
          className={genre === g ? "active" : ""}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
