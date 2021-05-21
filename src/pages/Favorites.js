import Characters from '../components/Characters';

export default function Favorites({
  bookmarkedCharacters,
  isFav,
  onAddToFav,
  onRenderCharacterDetails,
}) {
  return (
    <Characters
      characters={bookmarkedCharacters}
      isFav={isFav}
      onAddToFav={onAddToFav}
      onRenderCharacterDetails={onRenderCharacterDetails}
    />
  );
}
