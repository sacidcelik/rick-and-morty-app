import { useState, useEffect } from 'react';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((result) => result.json())
      .then((data) => setCharacters(data.results));
  }, []);
  return (
    <div>
      <header>
        <h1>Rick and Morty Character</h1>
      </header>
      <main>
        {characters.map((character) => (
          <article>
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.name} />
          </article>
        ))}
      </main>
    </div>
  );
}

export default App;
