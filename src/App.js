import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import Cancelbutton from './images/close.png';
import Search from './Search';

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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [detailedCharacter]);

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
        <DetailsCard>
          <h2>{character.name}</h2>
          <div
            role="img"
            aria-label="Close detailed view"
            onClick={() => setView(previousView)}
          ></div>
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
        <Search onFilterByName={onFilterByName} />
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
  background-color: #fffe;
  display: flex;
  flex-direction: column;
  place-items: center;
  width: 400px;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 0.8rem;
  border: 3px solid white;
  box-shadow: 0 0 80px 80px rgba(0, 0, 0, 0.2);
  position: fixed;
  margin: 50vh 50vw;
  transform: translate(-50%, -70%);
  img {
    width: 80%;
    border-radius: 0.8rem;
    margin-bottom: 1rem;
  }

  div {
    width: 60px;
    height: 60px;
    background-image: url(${Cancelbutton});
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    right: -30px;
    top: -30px;
  }

  p {
    padding: 0;
    margin: 0.5rem;
  }
`;

const Headline = styled.h1`
  text-align: center;
`;
