import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  return (
    <RickAndMortyHeader>
      <Link to="/">
        <h1>Rick and Morty Character Index</h1>
      </Link>
      <Nav>
        <NavLinkStyled exact to="/">
          Home
        </NavLinkStyled>
        <NavLinkStyled to="/favorites">Favorites</NavLinkStyled>
      </Nav>
    </RickAndMortyHeader>
  );
}

const RickAndMortyHeader = styled.header`
  text-align: center;
`;

const Nav = styled.nav`
  margin-bottom: 2rem;
`;

const NavLinkStyled = styled(NavLink)`
  background: skyblue;
  border-radius: 5px;
  color: white;
  font-size: 1.5rem;
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px;
  text-decoration: none;
`;
