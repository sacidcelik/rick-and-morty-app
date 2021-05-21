import styled from "styled-components/macro";

import Pickle from "../assets/pickleRick.png";

export default function PickleMark({ character, onAddToFav, isBig }) {
  return (
    <PickleRick
      onClick={onAddToFav}
      src={Pickle}
      alt="bookpickle this"
      isFav={true}
      isBig={isBig}
    />
  );
}

const PickleRick = styled.img`
  width: ${(props) => (props.isBig ? "80px" : "20px")};
  opacity: ${(props) => (props.isFav ? "1" : "0.5")};
  position: absolute;
  right: -3%;
  top: -8%;
`;
