import { useState, useEffect } from "react";
import Characters from "./components/Characters";
import Details from "./components/Details";
import Header from "./components/Header";
import Search from "./components/Search";

function App() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [detailedCharacter, setDetailedCharacter] = useState([]);
  const [view, setView] = useState("list");
  /*  const [previousView, setPreviousView] = useState(''); */

  function addToFav(characterToAdd) {
    const newArray = characters.find(
      (character) => character.id === characterToAdd.id
    );
    console.log(newArray);
    // setCharacters(newArray);
  }

  useEffect(() => {
    fetchData("https://rickandmortyapi.com/api/character");
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
    setView("filtered");
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
    setView("detail");
  }

  function detailClick(event) {
    const detailField = event.target.innerHTML.toLowerCase();
    const detailTypeAndValue = detailField.split(":", 2);
    const detailType = detailTypeAndValue[0].toString().trim();
    const detailValue = detailTypeAndValue[1].toString().trim();
    const filteredByDetail = characters.filter((character) => {
      if (detailType === "origin" || detailType === "location")
        return character[detailType].name.toLowerCase().includes(detailValue);
      else return character[detailType].toLowerCase() === detailValue;
    });
    setFilteredCharacters(filteredByDetail);
    setView("filtered");
  }

  function renderCharacterDetails(character) {
    return (
      <>
        <Details
          character={character}
          onSetFiltered={() => setView("filtered")}
          onDetailClick={detailClick}
          onAddToFav={() => addToFav(character)}
        />
        {renderCharacters(filteredCharacters)}
      </>
    );
  }

  function Mainview() {
    if (view === "detail") {
      return renderCharacterDetails(detailedCharacter);
    } else if (view === "filtered") {
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
