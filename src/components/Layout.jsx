import { Link, NavLink, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div>
      <header>
        <h1>Pokémon Explorer</h1>

        <nav>
          <NavLink to="/">Start</NavLink>
          {' | '}
          <NavLink to="/favorites">Favoriter</NavLink>
        </nav>

        <hr />
      </header>

      <Outlet />
    </div>
  );
}