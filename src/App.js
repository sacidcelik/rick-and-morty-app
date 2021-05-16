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
  /*  const [previousView, setPreviousView] = useState(''); */
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

  /*   useEffect(() => {
    setFilteredCharacters(characters);
  }, [characters]); */

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

  function detailClick(event) {
    const detailField = event.target.innerHTML.toLowerCase();
    const detailTypeAndValue = detailField.split(':', 2);
    const detailType = detailTypeAndValue[0].toString().trim();
    const detailValue = detailTypeAndValue[1].toString().trim();
    const filteredByDetail = characters.filter((character) => {
      if (detailType === 'origin' || detailType === 'location')
        return character[detailType].name.toLowerCase().includes(detailValue);
      else return character[detailType].toLowerCase().includes(detailValue);
    });
    setFilteredCharacters(filteredByDetail);
    setView('filtered');
  }

  function renderCharacterDetails(character) {
    return (
      <>
        <Details
          character={character}
          onSetFiltered={() => setView('filtered')}
          onDetailClick={detailClick}
        />
        {renderCharacters(filteredCharacters)}
      </>
    );
  }

  function Mainview() {
    if (view === 'detail') {
      return renderCharacterDetails(detailedCharacter);
    } else if (view === 'filtered') {
      return renderCharacters(filteredCharacters);
    } else {
      return renderCharacters(characters);
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
