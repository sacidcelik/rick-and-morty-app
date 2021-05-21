import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Search({ onFilterByName }) {
  return (
    <SearchboxInput
      onChange={onFilterByName}
      type="text"
      placeholder="search here ..."
    />
  );
}

const SearchboxInput = styled.input`
  display: block;
  margin: 1rem auto 0.8rem;
  width: 30%;
  min-width: 300px;
`;

Search.propTypes = {
  onFilterByName: PropTypes.func,
};
