import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cancelbutton from '../assets/close.png';
import PickleMark from './PickleMark';
import { Link } from 'react-router-dom';

export default function Details({
  character,
  onSetFiltered,
  onDetailClick,
  onAddToFav,
  isFav,
  isStatic,
}) {
  return (
    <DetailsCard isStatic={isStatic}>
      <h2>{character.name}</h2>
      <div
        role="img"
        aria-label="Close detailed view"
        onClick={onSetFiltered}
      ></div>
      <PickleMark
        isFav={isFav}
        isBig={true}
        character={character}
        onAddToFav={onAddToFav}
      />
      <CharImg src={character.image} alt={character.name} />
      <p onClick={() => onDetailClick('status', character.status)}>
        <Link to="/">Status: {character.status}</Link>
      </p>
      <p onClick={() => onDetailClick('species', character.species)}>
        <Link to="/">Species: {character.species}</Link>
      </p>
      <p onClick={() => onDetailClick('gender', character.gender)}>
        <Link to="/">Gender: {character.gender}</Link>
      </p>
      <p onClick={() => onDetailClick('origin', character.origin.name)}>
        <Link to="/">Origin: {character.origin.name}</Link>
      </p>
      <p onClick={() => onDetailClick('location', character.location.name)}>
        <Link to="/">Location: {character.location.name}</Link>
      </p>
      <Instruction>
        Clicking on a detail will filter the list of characters accordingly.
      </Instruction>
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
  margin: ${(props) => (props.isStatic ? '0' : '50vh 50vw')};
  padding: 1rem;
  place-items: center;
  position: ${(props) => (props.isStatic ? 'relative' : 'fixed')};
  transform: ${(props) =>
    props.isStatic ? 'translate()' : 'translate(-50%, -70%)'};
  width: 400px;
  z-index: 100;

  div {
    background-image: url(${Cancelbutton});
    background-repeat: no-repeat;
    background-size: contain;
    height: 60px;
    position: absolute;
    left: -30px;
    top: -30px;
    width: 60px;
    cursor: pointer;
  }

  p {
    padding: 0;
    margin: 0.5rem;
    cursor: pointer;
  }
`;

Details.propTypes = {
  character: PropTypes.object.isRequired,
  onSetFiltered: PropTypes.func,
  onDetailClick: PropTypes.func,
  onAddToFav: PropTypes.func,
  isFav: PropTypes.func,
};

const Instruction = styled.p`
  /* font-style: italic; */
  font-size: 0.8rem;
`;

const CharImg = styled.img`
  border-radius: 0.8rem;
  margin-bottom: 1rem;
  width: 80%;
`;
