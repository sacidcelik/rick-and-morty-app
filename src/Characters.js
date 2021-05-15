import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Characters({ characters, onRenderCharacterDetails }) {
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
