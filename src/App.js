import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

function App() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [detailedCharacter, setDetailedCharacter] = useState([]);
  const [view, setView] = useState('list');
  const [previousView, setPreviousView] = useState('');
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${pages}`)
      .then((result) => result.json())
      .then((data) => setCharacters([...characters, ...data.results]))
      .then(() => {
        if (pages <= 33) {
          setPages(pages + 1);
        }
        if (pages === 34) {
          setFilteredCharacters(characters);
        }
      });
  }, [pages]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [detailedCharacter]);

  function onFilterByName(event) {
    const inputField = event.target;
    const searchTerm = inputField.value;
    const filteredCharacters = characters.filter((character) => {
      return (
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.location.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        character.origin.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        character.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredCharacters(filteredCharacters);
    setView('filtered');
  }

  function renderCharacters(characters) {
    return (
      <CardWrapper>
        {characters.map((character, index) => (
          <Card onClick={() => onRenderCharacterDetails(character)} key={index}>
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.name} />
          </Card>
        ))}
      </CardWrapper>
    );
  }

  function onRenderCharacterDetails(character) {
    setDetailedCharacter(character);
    if (view !== 'detail') setPreviousView(view);
    setView('detail');
  }

  function Mainview() {
    if (view === 'detail') {
      return Characterdetails(detailedCharacter);
    } else if (view === 'list') {
      return renderCharacters(characters);
    } else {
      return renderCharacters(filteredCharacters);
    }
  }

  function Characterdetails(character) {
    return (
      <>
        <DetailsCard onClick={() => setView(previousView)}>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
        </DetailsCard>
        {renderCharacters(filteredCharacters)}
      </>
    );
  }
  return (
    <div>
      <header>
        <Headline>Rick and Morty Character</Headline>
      </header>
      <main>
        <SearchboxInput
          onChange={onFilterByName}
          type="text"
          placeholder="search here ..."
          size="50"
        />
        <Mainview />
      </main>
    </div>
  );
}

export default App;

const CardWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
`;

const Card = styled.article`
  padding: 1rem;
  width: 10rem;
  text-align: center;
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: white;
  border-radius: 0.8rem;

  h2 {
    font-size: 1rem;
  }

  img {
    width: 100%;
    border-radius: 0.8rem;
  }
`;

const DetailsCard = styled.article`
  background-color: white;
  display: flex;
  flex-direction: column;
  place-items: center;
  width: 400px;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 0.8rem;

  img {
    width: 80%;
    border-radius: 0.8rem;
    margin-bottom: 1rem;
  }

  p {
    padding: 0;
    margin: 0.5rem;
  }
`;
const SearchboxInput = styled.input`
  display: block;
  margin: 1rem auto 0.8rem;
  width: 30%;
  min-width: 300px;
`;

const Headline = styled.h1`
  text-align: center;
`;
