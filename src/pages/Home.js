import Characters from '../components/Characters';

export default function Home({
  characters,
  onRenderCharacterDetails,
  onAddToFav,
  isFav,
}) {
  return (
    <Characters
      characters={characters}
      onRenderCharacterDetails={onRenderCharacterDetails}
      onAddToFav={onAddToFav}
      isFav={isFav}
    />
  );
}
