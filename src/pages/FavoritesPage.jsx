import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);

  function removeFavorite(id) {
    const updated = favorites.filter(
      (pokemon) => pokemon.id !== id
    );

    setFavorites(updated);

    localStorage.setItem(
      'favorites',
      JSON.stringify(updated)
    );
  }

  return (
    <section>
      <h2>Mina favoriter</h2>

      {favorites.length === 0 ? (
        <p>Du har inga favoriter ännu.</p>
      ) : (
        <ul>
          {favorites.map((pokemon) => (
            <li key={pokemon.id}>
              <Link to={`/item/${pokemon.id}`}>
                {pokemon.name}
              </Link>

              {' '}

              <button
                onClick={() =>
                  removeFavorite(pokemon.id)
                }
              >
                Ta bort
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}