
export async function fetchBooks(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  return data.docs.slice(0, 10).map(book => ({
    title: book.title,
    author: book.author_name ? book.author_name.join(', ') : 'Unknown',
    coverId: book.cover_i,
  }));
}
