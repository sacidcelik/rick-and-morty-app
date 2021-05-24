```jsx
const jerry = {
  id: 5,
  name: 'Jerry Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/6',
    'https://rickandmortyapi.com/api/episode/7',
    'https://rickandmortyapi.com/api/episode/8',
  ],
  url: 'https://rickandmortyapi.com/api/character/5',
  created: '2017-11-04T19:26:56.301Z',
};

<Details
  character={jerry}
  isFav={(character) => true}
  isStatic={(character) => true}
/>;
```
