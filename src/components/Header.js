import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <NavLink exact to="/">
        <Headline>Rick and Morty Character Index</Headline>
      </NavLink>
      <NavLink to="/favorites">
        <h2>Favorites</h2>
      </NavLink>
    </header>
  );
}

const Headline = styled.h1`
  text-align: center;
`;
