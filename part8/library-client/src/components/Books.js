import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ALL_BOOKS } from '../queries';

function Books(props) {
  const booksResult = useQuery(ALL_BOOKS);
  const [allBooks, setAllBooks] = useState([]);
  const [genreFilter, setGenreFilter] = useState(null);

  useEffect(() => {
    if (booksResult.data) {
      setAllBooks(booksResult.data.allBooks);
    }
  }, [booksResult]);

  if (!props.show) {
    return null;
  }

  if (booksResult.loading) {
    return <div>loading...</div>;
  }

  const booksToShow = genreFilter
    ? allBooks.filter(book => book.genres.includes(genreFilter))
    : allBooks;
  const genres = [...new Set(allBooks.map(book => book.genres).flat())];

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
