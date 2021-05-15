import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cancelbutton from './images/close.png';

export default function Details({ character, onSetFiltered }) {
  return (
    <DetailsCard>
      <h2>{character.name}</h2>
      <div
        role="img"
        aria-label="Close detailed view"
        onClick={onSetFiltered}
      ></div>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
    </DetailsCard>
  );
}

const DetailsCard = styled.article`
  background-color: #fffe;
  border: 3px solid white;
  border-radius: 0.8rem;
  box-shadow: 0 0 80px 80px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  margin: 50vh 50vw;
  padding: 1rem;
  place-items: center;
  position: fixed;
  transform: translate(-50%, -70%);
  width: 400px;

  img {
    border-radius: 0.8rem;
    margin-bottom: 1rem;
    width: 80%;
  }

  div {
    background-image: url(${Cancelbutton});
    background-repeat: no-repeat;
    background-size: contain;
    height: 60px;
    position: absolute;
    right: -30px;
    top: -30px;
    width: 60px;
  }

  p {
    padding: 0;
    margin: 0.5rem;
  }
`;

Details.propTypes = {
  character: PropTypes.object.isRequired,
  onSetFiltered: PropTypes.func,
};
