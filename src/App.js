import { useState, useEffect } from 'react';
import Characters from './components/Characters';
import Details from './components/Details';
import Header from './components/Header';
import Search from './components/Search';
import { Switch, Route } from 'react-router-dom';
import Favorites from './pages/Favorites';

function App() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [detailedCharacter, setDetailedCharacter] = useState([]);
  const [bookmarkedCharacters, setBookmarkedCharacters] = useState([]);
  const [view, setView] = useState('list');
  /*  const [previousView, setPreviousView] = useState(''); */

  console.log(bookmarkedCharacters);

  useEffect(() => {
    fetchData('https://rickandmortyapi.com/api/character');
  }, []);

  const fetchData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setCharacters((characters) => {
      return [...characters, ...data.results];
    });
    if (data.info.next) {
      fetchData(data.info.next);
    }
  };

  function toggleFav(clickedCharacter) {
    isFavorite(clickedCharacter)
      ? removeFromFav(clickedCharacter)
      : addToFav(clickedCharacter);
  }

  function addToFav(characterToAdd) {
    const bookmarkedCharacter = characters.find(
      (character) => character.id === characterToAdd.id
    );
    setBookmarkedCharacters([...bookmarkedCharacters, bookmarkedCharacter]);
  }

  function removeFromFav(characterToRemove) {
    const remainingCharacters = bookmarkedCharacters.filter(
      (character) => character.id !== characterToRemove.id
    );
    setBookmarkedCharacters(remainingCharacters);
  }

  function isFavorite(character) {
    return bookmarkedCharacters.find(
      (bookmarkedCharacter) => bookmarkedCharacter.id === character.id
    );
  }

  useEffect(() => {
    setFilteredCharacters(characters);
  }, [characters]);

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
        onAddToFav={toggleFav}
        isFav={isFavorite}
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
      else return character[detailType].toLowerCase() === detailValue;
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
          onAddToFav={() => toggleFav(character)}
          isFav={isFavorite}
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
        <Switch>
          <Route exact path="/">
            <Mainview />
          </Route>
          <Route exact path="/favorites">
            <Favorites
              bookmarkedCharacters={bookmarkedCharacters}
              onRenderCharacterDetails={onRenderCharacterDetails}
              onAddToFav={toggleFav}
              isFav={isFavorite}
            />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
