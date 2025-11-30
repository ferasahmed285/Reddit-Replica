export const communities = [
  {
    id: 'askmen',
    name: 'r/AskMen',
    title: 'AskMen',
    description: 'A place to discuss men\'s lives and opinions.',
    created: 'Aug 30, 2010',
    members: '7.1M',
    online: '25k',
    bannerUrl: 'https://placehold.co/1000x150/24292e/FFF?text=AskMen+Banner',
    iconUrl: 'https://placehold.co/100/orangered/white?text=AM',
  },
  {
    id: 'askwomen',
    name: 'r/AskWomen',
    title: 'AskWomen',
    description: 'A space for women to share their perspectives.',
    created: 'Aug 30, 2010',
    members: '5.5M',
    online: '12k',
    bannerUrl: 'https://placehold.co/1000x150/pink/white?text=AskWomen+Banner',
    iconUrl: 'https://placehold.co/100/pink/white?text=AW',
  },
  {
    id: 'reactjs',
    name: 'r/reactjs',
    title: 'React.js',
    description: 'A community for learning and developing with React.',
    created: 'Aug 30, 2010',
    members: '400k',
    online: '800',
    bannerUrl: 'https://placehold.co/1000x150/61dafb/black?text=React+Source+Code',
    iconUrl: 'https://placehold.co/100/20232a/61dafb?text=R',
  },
  {
    id: 'funny',
    name: 'r/funny',
    title: 'Funny',
    description: 'Welcome to r/Funny, Reddit\'s largest humour depository.',
    created: 'Aug 30, 2010',
    members: '40M',
    online: '50k',
    bannerUrl: 'https://placehold.co/1000x150/ff4500/white?text=Funny+Banner',
    iconUrl: 'https://placehold.co/100/ff4500/white?text=XD',
  },
  {
    id: 'pics',
    name: 'r/pics',
    title: 'Pictures',
    description: 'A place for pictures and photographs.',
    created: 'Aug 30, 2010',
    members: '30M',
    online: '100k',
    bannerUrl: 'https://placehold.co/1000x150/green/white?text=Landscapes',
    iconUrl: 'https://placehold.co/100/green/white?text=P',
  }
];

export const popularCommunities = [
  {
    name: 'r/AskMen',
    members: '7,092,953 members',
    icon: 'https://placehold.co/40/orangered/white?text=M',
  },
  {
    name: 'r/AskWomen',
    members: '5,584,205 members',
    icon: 'https://placehold.co/40/pink/white?text=W',
  },
  {
    name: 'r/PS4',
    members: '5,508,714 members',
    icon: 'https://placehold.co/40/003791/white?text=P',
  },
  {
    name: 'r/apple',
    members: '6,286,770 members',
    icon: 'https://placehold.co/40/black/white?text=A',
  },
  {
    name: 'r/NBA2k',
    members: '739,353 members',
    icon: 'https://placehold.co/40/red/white?text=N',
  },
];

export const getCommunityByName = (name) => {
  return communities.find(c => c.name.toLowerCase() === `r/${name}`.toLowerCase()) || null;
};
