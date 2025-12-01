// Mock user database - will be replaced with real database later
const users = [
  {
    id: '1',
    username: 'CuriousGuy99',
    password: '$2a$10$XQKvvXQKvvXQKvvXQKvvXeO8YvYvYvYvYvYvYvYvYvYvYvYvYvYvY',
    karma: '12.5k',
    cakeDay: 'Jan 15, 2021',
    avatar: 'https://placehold.co/100/ff4500/white?text=CG',
    bio: 'Just a curious guy asking questions on the internet.',
    bannerColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: '2',
    username: 'CodeNinja',
    password: '$2a$10$XQKvvXQKvvXQKvvXQKvvXeO8YvYvYvYvYvYvYvYvYvYvYvYvYvYvY',
    karma: '91.7k',
    cakeDay: 'Jan 30, 2018',
    avatar: 'https://placehold.co/100/black/white?text=CN',
    bio: 'Full-stack developer | Open source maintainer | Coffee powered',
    bannerColor: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
  },
  {
    id: '3',
    username: 'ChefBoy',
    password: '$2a$10$XQKvvXQKvvXQKvvXQKvvXeO8YvYvYvYvYvYvYvYvYvYvYvYvYvYvY',
    karma: '45.2k',
    cakeDay: 'Mar 10, 2020',
    avatar: 'https://placehold.co/100/orange/white?text=CB',
    bio: 'Home chef | Food lover | Grilling enthusiast',
    bannerColor: 'linear-gradient(135deg, #ffa500 0%, #ff6347 100%)'
  },
  {
    id: '4',
    username: 'GymRat_22',
    password: '$2a$10$XQKvvXQKvvXQKvvXQKvvXeO8YvYvYvYvYvYvYvYvYvYvYvYvYvYvY',
    karma: '28.3k',
    cakeDay: 'Jun 22, 2022',
    avatar: 'https://placehold.co/100/green/white?text=GR',
    bio: 'Fitness enthusiast | Gym 6 days a week | Gains over everything',
    bannerColor: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
  },
  {
    id: '5',
    username: 'PhotographerX',
    password: '$2a$10$XQKvvXQKvvXQKvvXQKvvXeO8YvYvYvYvYvYvYvYvYvYvYvYvYvYvY',
    karma: '89.2k',
    cakeDay: 'Feb 28, 2019',
    avatar: 'https://placehold.co/100/teal/white?text=PX',
    bio: 'Professional photographer | Travel lover | Capturing moments',
    bannerColor: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)'
  },
  {
    id: '6',
    username: 'MemeLord',
    password: '$2a$10$XQKvvXQKvvXQKvvXQKvvXeO8YvYvYvYvYvYvYvYvYvYvYvYvYvYvY',
    karma: '156.7k',
    cakeDay: 'Apr 1, 2018',
    avatar: 'https://placehold.co/100/purple/white?text=ML',
    bio: 'Professional meme curator | Making the internet laugh since 2018',
    bannerColor: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)'
  },
  {
    id: '7',
    username: 'TechGuru2024',
    password: '$2a$10$XQKvvXQKvvXQKvvXQKvvXeO8YvYvYvYvYvYvYvYvYvYvYvYvYvYvY',
    karma: '34.7k',
    cakeDay: 'Jan 1, 2024',
    avatar: 'https://placehold.co/100/blue/white?text=TG',
    bio: 'Tech enthusiast | Gadget reviewer | Always online',
    bannerColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: '8',
    username: 'GameMaster',
    password: '$2a$10$XQKvvXQKvvXQKvvXQKvvXeO8YvYvYvYvYvYvYvYvYvYvYvYvYvYvY',
    karma: '67.4k',
    cakeDay: 'Nov 15, 2019',
    avatar: 'https://placehold.co/100/indigo/white?text=GM',
    bio: 'Hardcore gamer | Speedrunner | Streaming on weekends',
    bannerColor: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)'
  },
  {
    id: '9',
    username: 'BookWorm',
    password: '$2a$10$XQKvvXQKvvXQKvvXQKvvXeO8YvYvYvYvYvYvYvYvYvYvYvYvYvYvY',
    karma: '42.1k',
    cakeDay: 'Sep 5, 2020',
    avatar: 'https://placehold.co/100/brown/white?text=BW',
    bio: 'Avid reader | Book reviewer | 100+ books a year',
    bannerColor: 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)'
  },
  {
    id: '10',
    username: 'ScienceNerd',
    password: '$2a$10$XQKvvXQKvvXQKvvXQKvvXeO8YvYvYvYvYvYvYvYvYvYvYvYvYvYvY',
    karma: '78.9k',
    cakeDay: 'Jul 20, 2018',
    avatar: 'https://placehold.co/100/lime/white?text=SN',
    bio: 'PhD in Physics | Science communicator | Making science fun',
    bannerColor: 'linear-gradient(135deg, #00ff00 0%, #32cd32 100%)'
  }
];

// In-memory storage for new users (will be lost on server restart)
let newUsers = [];

const getAllUsers = () => {
  return [...users, ...newUsers];
};

const findUserByUsername = (username) => {
  const allUsers = getAllUsers();
  return allUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
};

const findUserById = (id) => {
  const allUsers = getAllUsers();
  return allUsers.find(u => u.id === id);
};

const createUser = (userData) => {
  const newUser = {
    id: String(Date.now()),
    ...userData,
    karma: '1',
    cakeDay: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    avatar: `https://placehold.co/100/ff4500/white?text=${userData.username.charAt(0).toUpperCase()}`,
    bio: 'New Redditor',
    bannerColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  newUsers.push(newUser);
  return newUser;
};

module.exports = {
  getAllUsers,
  findUserByUsername,
  findUserById,
  createUser
};
