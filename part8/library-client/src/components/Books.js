import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_BOOKS } from '../queries';

function Books(props) {
  const result = useQuery(ALL_BOOKS);
  const [genreFilter, setGenreFilter] = useState(null);
  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const { allBooks: books } = result.data;
  const booksToShow = genreFilter
    ? books.filter(book => book.genres.includes(genreFilter))
    : books;
  const genres = [...new Set(books.map(book => book.genres).flat())];

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setGenreFilter(null)}>Show All</button>
      {genres.map(g => (
        <button onClick={() => setGenreFilter(g)} key={g}>
          {g}
        </button>
      ))}
    </div>
  );
}

export default Books;
