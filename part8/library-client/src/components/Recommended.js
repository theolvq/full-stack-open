import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ALL_BOOKS, CURRENT_USER } from '../queries';

function Recommended({ show }) {
  const userResult = useQuery(CURRENT_USER);
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS);
  const [favGenre, setFavGenre] = useState('');
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  useEffect(() => {
    if (userResult.data) {
      setFavGenre(userResult.data.me.favoriteGenre);
    }
  }, [userResult.data]);

  useEffect(() => {
    getBooks({ variables: { genre: favGenre } });
    if (booksResult.data) {
      setRecommendedBooks(booksResult.data.allBooks);
    }
  }, [favGenre, booksResult.data, getBooks]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Recommended for you!</h2>
      {favGenre && (
        <>
          <h3>Your Favorite Genre is {favGenre} </h3>
          <h4>Here is your list of recommended books</h4>
        </>
      )}
      {booksResult.data && (
        <ul>
          {recommendedBooks.map(b => (
            <li key={b.id}>
              {b.title} by {b.author.name} published in {b.published}{' '}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recommended;
