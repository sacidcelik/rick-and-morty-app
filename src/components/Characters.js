import styled from "styled-components/macro";
import PropTypes from "prop-types";
import PickleMark from "./PickleMark";

export default function Characters({
  characters,
  onRenderCharacterDetails,
  isFav,
  onAddToFav,
}) {
  return (
    <CardWrapper>
      {characters.map((character) => (
        <Card key={character.id}>
          <h2>{character.name}</h2>
          <CharImg
            onClick={() => onRenderCharacterDetails(character)}
            src={character.image}
            alt={character.name}
          />
          <PickleMark
            isFav={isFav}
            isBig={false}
            character={character}
            onAddToFav={() => onAddToFav(character)}
          />
        </Card>
      ))}
    </CardWrapper>
  );
}

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
  position: relative;

  h2 {
    font-size: 1rem;
  }
`;

Characters.propTypes = {
  characters: PropTypes.array.isRequired,
  onRenderCharacterDetails: PropTypes.func,
};

const CharImg = styled.img`
  width: 100%;
  border-radius: 0.8rem;
  cursor: pointer;
`;
