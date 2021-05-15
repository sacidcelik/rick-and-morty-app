import styled from 'styled-components';

export default function Header() {
  return (
    <header>
      <Headline>Rick and Morty Character Index</Headline>
    </header>
  );
}

const Headline = styled.h1`
  text-align: center;
`;
