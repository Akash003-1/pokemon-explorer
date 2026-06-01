import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function getIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
}

export function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');

        if (!response.ok) {
          throw new Error('Kunde inte hämta data från API:t.');
        }

        const data = await response.json();

        const formatted = data.results.map((pokemon) => ({
          id: getIdFromUrl(pokemon.url),
          name: pokemon.name,
        }));

        setPokemonList(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Startsida</h2>

      <label htmlFor="search">Sök Pokémon</label>
      <input
        id="search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Skriv namn..."
      />

      {filteredPokemon.length === 0 ? (
        <p>Inga Pokémon hittades.</p>
      ) : (<ul>
  {filteredPokemon.map((pokemon) => (
    <li key={pokemon.id}>
      <Link to={`/item/${pokemon.id}`}>
        {pokemon.name} - #{pokemon.id}
      </Link>
    </li>
  ))}
</ul>
      )}
    </section>
  );
}