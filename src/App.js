import { useState, useEffect } from 'react';

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
        if (pages <= 33) setPages(pages + 1);
      });
  }, [pages]);

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
    return characters.map((character, index) => (
      <article key={index}>
        <h2>{character.name}</h2>
        <img
          onClick={() => onRenderCharacterDetails(character)}
          src={character.image}
          alt={character.name}
        />
      </article>
    ));
  }

  function onRenderCharacterDetails(character) {
    setDetailedCharacter(character);
    setPreviousView(view);
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
        <article>
          <h2>{character.name}</h2>
          <img
            onClick={() => setView(previousView)}
            src={character.image}
            alt={character.name}
          />
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
        </article>
        {renderCharacters(filteredCharacters)}
      </>
    );
  }
  return (
    <div>
      <header>
        <h1>Rick and Morty Character</h1>
      </header>
      <main>
        <input onChange={onFilterByName} type="text"></input>
        <Mainview />
      </main>
    </div>
  );
}

export default App;
