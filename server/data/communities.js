// All communities - matching frontend data
let communities = [
  { id: 'askmen', name: 'r/AskMen', title: 'AskMen', description: "A place to discuss men's lives and opinions.", created: 'Aug 30, 2010', members: '7.1M', memberCount: 7100000, online: '25k', bannerUrl: 'https://placehold.co/1000x150/24292e/FFF?text=AskMen+Banner', iconUrl: 'https://placehold.co/100/orangered/white?text=AM' },
  { id: 'askwomen', name: 'r/AskWomen', title: 'AskWomen', description: 'A space for women to share their perspectives.', created: 'Aug 30, 2010', members: '5.5M', memberCount: 5500000, online: '12k', bannerUrl: 'https://placehold.co/1000x150/pink/white?text=AskWomen+Banner', iconUrl: 'https://placehold.co/100/pink/white?text=AW' },
  { id: 'reactjs', name: 'r/reactjs', title: 'React.js', description: 'A community for learning and developing with React.', created: 'Aug 30, 2010', members: '400k', memberCount: 400000, online: '800', bannerUrl: 'https://placehold.co/1000x150/61dafb/black?text=React', iconUrl: 'https://placehold.co/100/20232a/61dafb?text=R' },
  { id: 'funny', name: 'r/funny', title: 'Funny', description: "Welcome to r/Funny, Reddit's largest humour depository.", created: 'Aug 30, 2010', members: '40M', memberCount: 40000000, online: '50k', bannerUrl: 'https://placehold.co/1000x150/ff4500/white?text=Funny', iconUrl: 'https://placehold.co/100/ff4500/white?text=XD' },
  { id: 'pics', name: 'r/pics', title: 'Pictures', description: 'A place for pictures and photographs.', created: 'Aug 30, 2010', members: '30M', memberCount: 30000000, online: '100k', bannerUrl: 'https://placehold.co/1000x150/green/white?text=Pics', iconUrl: 'https://placehold.co/100/green/white?text=P' },
  { id: 'gaming', name: 'r/gaming', title: 'Gaming', description: 'A subreddit for (almost) anything related to games.', created: 'Sep 25, 2008', members: '38M', memberCount: 38000000, online: '85k', bannerUrl: 'https://placehold.co/1000x150/8b00ff/white?text=Gaming', iconUrl: 'https://placehold.co/100/8b00ff/white?text=G' },
  { id: 'technology', name: 'r/technology', title: 'Technology', description: 'Subreddit dedicated to the news and discussions about technology.', created: 'Jan 25, 2008', members: '14M', memberCount: 14000000, online: '45k', bannerUrl: 'https://placehold.co/1000x150/00bfff/white?text=Tech', iconUrl: 'https://placehold.co/100/00bfff/white?text=T' },
  { id: 'books', name: 'r/books', title: 'Books', description: 'This is a moderated subreddit for book lovers.', created: 'Jan 25, 2008', members: '22M', memberCount: 22000000, online: '32k', bannerUrl: 'https://placehold.co/1000x150/8b4513/white?text=Books', iconUrl: 'https://placehold.co/100/8b4513/white?text=B' },
  { id: 'music', name: 'r/Music', title: 'Music', description: 'The musical community of Reddit.', created: 'Jan 25, 2008', members: '32M', memberCount: 32000000, online: '67k', bannerUrl: 'https://placehold.co/1000x150/ff1493/white?text=Music', iconUrl: 'https://placehold.co/100/ff1493/white?text=M' },
  { id: 'science', name: 'r/science', title: 'Science', description: 'This community is a place to share and discuss new scientific research.', created: 'Jan 25, 2008', members: '30M', memberCount: 30000000, online: '78k', bannerUrl: 'https://placehold.co/1000x150/00ff00/white?text=Science', iconUrl: 'https://placehold.co/100/00ff00/white?text=S' },
  { id: 'fitness', name: 'r/Fitness', title: 'Fitness', description: 'Discussion of physical fitness/exercise goals.', created: 'Mar 13, 2008', members: '10M', memberCount: 10000000, online: '28k', bannerUrl: 'https://placehold.co/1000x150/ff6347/white?text=Fitness', iconUrl: 'https://placehold.co/100/ff6347/white?text=F' },
  { id: 'art', name: 'r/Art', title: 'Art', description: 'This is a subreddit about art.', created: 'Feb 26, 2008', members: '22M', memberCount: 22000000, online: '45k', bannerUrl: 'https://placehold.co/1000x150/9370db/white?text=Art', iconUrl: 'https://placehold.co/100/9370db/white?text=A' },
  { id: 'travel', name: 'r/travel', title: 'Travel', description: 'r/travel is a community about exploring the world.', created: 'Jan 25, 2008', members: '18M', memberCount: 18000000, online: '34k', bannerUrl: 'https://placehold.co/1000x150/20b2aa/white?text=Travel', iconUrl: 'https://placehold.co/100/20b2aa/white?text=T' },
  { id: 'food', name: 'r/food', title: 'Food', description: 'Cooking, restaurants, recipes, food network, foodies!', created: 'Nov 11, 2008', members: '26M', memberCount: 26000000, online: '56k', bannerUrl: 'https://placehold.co/1000x150/ffa500/white?text=Food', iconUrl: 'https://placehold.co/100/ffa500/white?text=F' },
  { id: 'movies', name: 'r/movies', title: 'Movies', description: 'The goal of /r/Movies is to provide an inclusive place for discussions.', created: 'Jan 25, 2008', members: '31M', memberCount: 31000000, online: '72k', bannerUrl: 'https://placehold.co/1000x150/ff0000/white?text=Movies', iconUrl: 'https://placehold.co/100/ff0000/white?text=M' },
  { id: 'aww', name: 'r/aww', title: 'Aww', description: 'Things that make you go AWW! -- like puppies, bunnies, babies...', created: 'Jan 25, 2008', members: '34M', memberCount: 34000000, online: '89k', bannerUrl: 'https://placehold.co/1000x150/ffb6c1/white?text=Aww', iconUrl: 'https://placehold.co/100/ffb6c1/white?text=A' },
];

const getAllCommunities = () => communities;

const getCommunityById = (id) => {
  // Try exact match first
  let community = communities.find(c => c.id.toLowerCase() === id.toLowerCase());
  // Also try matching by name without r/
  if (!community) {
    community = communities.find(c => c.title.toLowerCase() === id.toLowerCase());
  }
  return community;
};

const createCommunity = (communityData) => {
  const newCommunity = {
    id: communityData.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
    name: communityData.name.startsWith('r/') ? communityData.name : `r/${communityData.name}`,
    title: communityData.title,
    description: communityData.description || '',
    members: '1',
    memberCount: 1,
    online: '1',
    iconUrl: `https://placehold.co/100/ff4500/white?text=${communityData.name.charAt(0).toUpperCase()}`,
    bannerUrl: 'https://placehold.co/1000x150/ff4500/white?text=Community',
    created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };
  communities.push(newCommunity);
  return newCommunity;
};

const joinCommunity = (communityId, userId) => {
  const community = getCommunityById(communityId);
  if (community) {
    community.memberCount++;
  }
  return community;
};

const leaveCommunity = (communityId, userId) => {
  const community = getCommunityById(communityId);
  if (community && community.memberCount > 0) {
    community.memberCount--;
  }
  return community;
};

module.exports = {
  getAllCommunities,
  getCommunityById,
  createCommunity,
  joinCommunity,
  leaveCommunity,
};
