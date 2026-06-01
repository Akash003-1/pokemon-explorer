import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export function DetailPage() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        if (!response.ok) {
          throw new Error('Pokémon hittades inte.');
        }

        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [id]);

  function toggleFavorite() {
    const exists = favorites.some(
      (favorite) => favorite.id === pokemon.id
    );

    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== pokemon.id
      );
    } else {
      updatedFavorites = [
        ...favorites,
        {
          id: pokemon.id,
          name: pokemon.name,
        },
      ];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  if (loading) return <p>Laddar detaljer...</p>;
  if (error) return <p>{error}</p>;
  if (!pokemon) return <p>Ingen data hittades.</p>;

  const isFavorite = favorites.some(
    (favorite) => favorite.id === pokemon.id
  );

  return (
    <section>
      <Link to="/">← Tillbaka</Link>

      <h2>{pokemon.name}</h2>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />

      <button onClick={toggleFavorite}>
        {isFavorite ? 'Ta bort favorit' : 'Lägg till favorit'}
      </button>

      <p>ID: {pokemon.id}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </section>
  );
}