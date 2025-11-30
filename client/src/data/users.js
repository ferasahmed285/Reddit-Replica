export const users = [
  {
    username: 'ComicArtist',
    karma: '45.2k',
    cakeDay: 'Oct 12, 2019',
    avatar: 'https://placehold.co/100/orange/white?text=CA',
    description: 'I draw comics about daily life.'
  },
  {
    username: 'yourlocalap',
    karma: '1',
    cakeDay: 'Nov 30, 2025',
    avatar: 'https://placehold.co/100/orangered/white?text=Snoo',
    description: 'Just a regular redditor.'
  }
];

export const getUserByName = (username) => {
    return users.find(u => u.username.toLowerCase() === username.toLowerCase());
};