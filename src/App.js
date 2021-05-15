import { useState, useEffect } from 'react';
import Characters from './Characters';
import Details from './Details';
import Header from './Header';
import Search from './Search';

function App() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [detailedCharacter, setDetailedCharacter] = useState([]);
  const [view, setView] = useState('list');
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
      <Characters
        characters={characters}
        onRenderCharacterDetails={onRenderCharacterDetails}
      />
    );
  }

  function onRenderCharacterDetails(character) {
    setDetailedCharacter(character);
    setView('detail');
  }

  function renderCharacterDetails(character) {
    return (
      <>
        <Details
          character={character}
          onSetFiltered={() => setView('filtered')}
        />
        {renderCharacters(filteredCharacters)}
      </>
    );
  }

  function Mainview() {
    if (view === 'detail') {
      return renderCharacterDetails(detailedCharacter);
    } else if (view === 'list') {
      return renderCharacters(characters);
    } else {
      return renderCharacters(filteredCharacters);
    }
  }

  return (
    <div>
      <Header />
      <main>
        <Search onFilterByName={onFilterByName} />
        <Mainview />
      </main>
    </div>
  );
}

export default App;
