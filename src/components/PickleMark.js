import styled from "styled-components/macro";

import Pickle from "../assets/pickleRick.png";

export default function PickleMark({
  character,
  onAddToFav,
  isBig,
  isFav,
  isStatic,
}) {
  return (
    <PickleRick
      onClick={onAddToFav}
      src={Pickle}
      alt="bookpickle this"
      isFavorite={isFav(character)}
      isBig={isBig}
      isStatic={isStatic}
    />
  );
}

const PickleRick = styled.img`
  width: ${(props) => (props.isBig ? "80px" : "30px")};
  opacity: ${(props) => (props.isFavorite ? "1" : "0.5")};
  position: ${(props) => (props.isStatic ? "static" : "absolute")};
  right: -3%;
  top: -8%;
`;
