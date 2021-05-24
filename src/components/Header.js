import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <RickAndMortyHeader>
      <NavLink exact to="/">
        <h1>Rick and Morty Character Index</h1>
      </NavLink>
      <NavLink to="/favorites">
        <h2>Favorites</h2>
      </NavLink>
    </RickAndMortyHeader>
  );
}

const RickAndMortyHeader = styled.header`
  text-align: center;
`;
