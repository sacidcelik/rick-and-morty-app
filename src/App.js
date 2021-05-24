import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Details from './components/Details';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Header from './components/Header';
import Search from './components/Search';
import { saveToLocal, loadFromLocal } from './lib/localStorage';

function App() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [detailedCharacter, setDetailedCharacter] = useState([]);
  const [bookmarkedCharacters, setBookmarkedCharacters] = useState(
    loadFromLocal('bookmarkedCharacters') ?? []
  );
  const [view, setView] = useState('list');

  console.log(filteredCharacters);

  //fetch
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

  useEffect(() => {
    setFilteredCharacters(characters);
  }, [characters]);

  //localstorage
  useEffect(() => {
    saveToLocal('characters', characters);
  }, [characters]);

  useEffect(() => {
    saveToLocal('bookmarkedCharacters', bookmarkedCharacters);
  }, [bookmarkedCharacters]);

  //functions

  //favorites
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

  //filters

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

  function detailClick(property, characterDetail) {
    console.log(property);
    const filteredByDetail = characters.filter((character) => {
      if (property.includes('origin') || property.includes('location'))
        return character[property].name === characterDetail;
      else return character[property] === characterDetail;
    });
    setFilteredCharacters(filteredByDetail);
    setView('filtered');
  }

  //renders

  function renderCharacterDetails(character) {
    return (
      <Details
        character={character}
        onSetFiltered={() => setView('filtered')}
        onDetailClick={detailClick}
        onAddToFav={() => toggleFav(character)}
        isFav={isFavorite}
      />
    );
  }

  function onRenderCharacterDetails(character) {
    setDetailedCharacter(character);
    setView('detail');
  }

  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Search onFilterByName={onFilterByName} />
            {view === 'detail' && renderCharacterDetails(detailedCharacter)}
            <Home
              view={view}
              characters={filteredCharacters}
              onRenderCharacterDetails={onRenderCharacterDetails}
              onAddToFav={toggleFav}
              isFav={isFavorite}
            />
          </Route>
          <Route exact path="/favorites">
            {view === 'detail' && renderCharacterDetails(detailedCharacter)}
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

/*   function renderCharacters(characters) {
    return (
      <Characters
        characters={characters}
        onRenderCharacterDetails={onRenderCharacterDetails}
        onAddToFav={toggleFav}
        isFav={isFavorite}
      />
    );
  } */
/*   function Mainview() {
    if (view === 'detail') {
      return (
        renderCharacterDetails(detailedCharacter),
        renderCharacters(filteredCharacters)
      );
    } else if (view === 'filtered') {
      return renderCharacters(filteredCharacters);
    } else {
      return renderCharacters(characters);
    }
  }
 */
