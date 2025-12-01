// All posts data - single source of truth
let posts = [
  // --- AskMen Posts ---
  {
    id: 1,
    subreddit: 'AskMen',
    author: 'CuriousGuy99',
    authorId: '1',
    timeAgo: '4 hours ago',
    timestamp: Date.now() - 14400000,
    title: 'Men of Reddit, what is the one compliment you received that you still think about?',
    type: 'text',
    content: 'I was told I have nice eyebrows 6 years ago by a cashier. I still think about it weekly.',
    voteCount: 4400,
    upvotes: 4400,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 2,
    subreddit: 'AskMen',
    author: 'GymRat_22',
    authorId: '2',
    timeAgo: '12 hours ago',
    timestamp: Date.now() - 43200000,
    title: 'How do you balance work and gym?',
    type: 'text',
    content: 'I feel like I am always tired after work. Any tips?',
    voteCount: 3100,
    upvotes: 3100,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 3,
    subreddit: 'AskMen',
    author: 'ChefBoy',
    authorId: '3',
    timeAgo: '1 day ago',
    timestamp: Date.now() - 86400000,
    title: 'What represents the ultimate "Dad meal"?',
    type: 'text',
    content: 'For me, it is grilling burgers in the backyard with a cold beer.',
    voteCount: 15000,
    upvotes: 15000,
    downvotes: 0,
    commentCount: 0,
  },
  // --- ReactJS Posts ---
  {
    id: 4,
    subreddit: 'reactjs',
    author: 'DanAbramovFan',
    authorId: '4',
    timeAgo: '2 hours ago',
    timestamp: Date.now() - 7200000,
    title: 'React 19 is coming. Are we ready?',
    type: 'text',
    content: 'The new compiler looks amazing, but I am worried about breaking changes.',
    voteCount: 2500,
    upvotes: 2500,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 5,
    subreddit: 'reactjs',
    author: 'JuniorDev01',
    authorId: '5',
    timeAgo: '5 hours ago',
    timestamp: Date.now() - 18000000,
    title: 'Help with useEffect dependency array',
    type: 'text',
    content: 'Why does my API call fire twice in StrictMode?',
    voteCount: 50,
    upvotes: 50,
    downvotes: 0,
    commentCount: 0,
  },
  // --- Funny Posts ---
  {
    id: 6,
    subreddit: 'funny',
    author: 'MemeLord',
    authorId: '6',
    timeAgo: '6 hours ago',
    timestamp: Date.now() - 21600000,
    title: 'My cat trying to understand physics',
    type: 'image',
    content: 'https://placehold.co/600x400/orange/white?text=Confused+Cat+Meme',
    voteCount: 120000,
    upvotes: 120000,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 7,
    subreddit: 'funny',
    author: 'Jokester',
    authorId: '7',
    timeAgo: '8 hours ago',
    timestamp: Date.now() - 28800000,
    title: 'I fixed the dishwasher!',
    type: 'image',
    content: 'https://placehold.co/600x400/blue/white?text=Broken+Dishwasher',
    voteCount: 8000,
    upvotes: 8000,
    downvotes: 0,
    commentCount: 0,
  },
  // --- Pics Posts ---
  {
    id: 8,
    subreddit: 'pics',
    author: 'PhotographerX',
    authorId: '8',
    timeAgo: '1 hour ago',
    timestamp: Date.now() - 3600000,
    title: 'Sunset in Kyoto, Japan',
    type: 'image',
    content: 'https://placehold.co/600x400/purple/white?text=Kyoto+Sunset',
    voteCount: 22000,
    upvotes: 22000,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 9,
    subreddit: 'gaming',
    author: 'GameMaster',
    authorId: '10',
    timeAgo: '3 hours ago',
    timestamp: Date.now() - 10800000,
    title: 'Just finished Elden Ring after 200 hours. What a masterpiece!',
    type: 'text',
    content: 'The level design, boss fights, and exploration are unmatched. FromSoftware really outdid themselves.',
    voteCount: 8900,
    upvotes: 8900,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 10,
    subreddit: 'gaming',
    author: 'TechGuru2024',
    authorId: '9',
    timeAgo: '5 hours ago',
    timestamp: Date.now() - 18000000,
    title: 'PS5 vs Xbox Series X in 2025 - Which should you buy?',
    type: 'text',
    content: 'After owning both for a year, here\'s my honest comparison...',
    voteCount: 4200,
    upvotes: 4200,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 11,
    subreddit: 'technology',
    author: 'CodeNinja',
    authorId: '2',
    timeAgo: '2 hours ago',
    timestamp: Date.now() - 7200000,
    title: 'AI is getting scary good at coding. Should developers be worried?',
    type: 'text',
    content: 'I just used GPT-4 to build an entire app in 30 minutes. The future is here.',
    voteCount: 15600,
    upvotes: 15600,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 12,
    subreddit: 'technology',
    author: 'TechGuru2024',
    authorId: '9',
    timeAgo: '7 hours ago',
    timestamp: Date.now() - 25200000,
    title: 'Apple announces new M4 chip - 40% faster than M3',
    type: 'text',
    content: 'The performance gains are insane. Desktop replacement is finally here.',
    voteCount: 23400,
    upvotes: 23400,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 13,
    subreddit: 'books',
    author: 'BookWorm',
    authorId: '11',
    timeAgo: '4 hours ago',
    timestamp: Date.now() - 14400000,
    title: 'Just finished "Project Hail Mary" and I am blown away',
    type: 'text',
    content: 'Andy Weir did it again. This book is even better than The Martian!',
    voteCount: 6700,
    upvotes: 6700,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 14,
    subreddit: 'books',
    author: 'BookWorm',
    authorId: '11',
    timeAgo: '1 day ago',
    timestamp: Date.now() - 86400000,
    title: 'What book changed your perspective on life?',
    type: 'text',
    content: 'For me it was "Man\'s Search for Meaning" by Viktor Frankl.',
    voteCount: 12300,
    upvotes: 12300,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 15,
    subreddit: 'Music',
    author: 'MusicLover88',
    authorId: '12',
    timeAgo: '6 hours ago',
    timestamp: Date.now() - 21600000,
    title: 'Taylor Swift breaks another record with new album',
    type: 'text',
    content: 'First artist to have 5 albums debut with over 1M sales in first week.',
    voteCount: 18900,
    upvotes: 18900,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 16,
    subreddit: 'Music',
    author: 'MusicLover88',
    authorId: '12',
    timeAgo: '9 hours ago',
    timestamp: Date.now() - 32400000,
    title: 'Vinyl sales surpass CD sales for first time since 1987',
    type: 'text',
    content: 'The vinyl revival is real. My collection has grown to 500+ records.',
    voteCount: 9800,
    upvotes: 9800,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 17,
    subreddit: 'science',
    author: 'ScienceNerd',
    authorId: '13',
    timeAgo: '3 hours ago',
    timestamp: Date.now() - 10800000,
    title: 'New study shows coffee may extend lifespan by 20%',
    type: 'text',
    content: 'Finally, some good news for coffee addicts like me!',
    voteCount: 34500,
    upvotes: 34500,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 18,
    subreddit: 'science',
    author: 'ScienceNerd',
    authorId: '13',
    timeAgo: '11 hours ago',
    timestamp: Date.now() - 39600000,
    title: 'Breakthrough in fusion energy - we\'re getting closer!',
    type: 'text',
    content: 'Scientists achieve net energy gain for the third time this year.',
    voteCount: 45600,
    upvotes: 45600,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 19,
    subreddit: 'Fitness',
    author: 'FitnessCoach',
    authorId: '14',
    timeAgo: '5 hours ago',
    timestamp: Date.now() - 18000000,
    title: 'Stop doing sit-ups! Here\'s why and what to do instead',
    type: 'text',
    content: 'Sit-ups can damage your spine. Try these alternatives for better abs.',
    voteCount: 7800,
    upvotes: 7800,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 20,
    subreddit: 'Fitness',
    author: 'GymRat_22',
    authorId: '2',
    timeAgo: '8 hours ago',
    timestamp: Date.now() - 28800000,
    title: 'Hit a 405lb deadlift today! 2 years of training paid off',
    type: 'text',
    content: 'Started at 135lbs. Consistency is key!',
    voteCount: 5600,
    upvotes: 5600,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 21,
    subreddit: 'Art',
    author: 'ArtisticSoul',
    authorId: '15',
    timeAgo: '4 hours ago',
    timestamp: Date.now() - 14400000,
    title: 'My first digital painting - "Sunset Dreams"',
    type: 'image',
    content: 'https://placehold.co/600x400/ff6b6b/white?text=Sunset+Dreams',
    voteCount: 12400,
    upvotes: 12400,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 22,
    subreddit: 'Art',
    author: 'ArtisticSoul',
    authorId: '15',
    timeAgo: '1 day ago',
    timestamp: Date.now() - 86400000,
    title: 'Spent 40 hours on this portrait. Hope you like it!',
    type: 'image',
    content: 'https://placehold.co/600x400/4ecdc4/white?text=Portrait',
    voteCount: 28900,
    upvotes: 28900,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 23,
    subreddit: 'travel',
    author: 'TravelBug',
    authorId: '17',
    timeAgo: '6 hours ago',
    timestamp: Date.now() - 21600000,
    title: 'Just got back from Iceland. Here are my top 10 tips',
    type: 'text',
    content: '1. Rent a 4x4. 2. Visit in September. 3. Book Blue Lagoon in advance...',
    voteCount: 8900,
    upvotes: 8900,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 24,
    subreddit: 'travel',
    author: 'TravelBug',
    authorId: '17',
    timeAgo: '2 days ago',
    timestamp: Date.now() - 172800000,
    title: 'Northern Lights in Norway - Bucket list checked!',
    type: 'image',
    content: 'https://placehold.co/600x400/00d2ff/white?text=Northern+Lights',
    voteCount: 45600,
    upvotes: 45600,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 25,
    subreddit: 'food',
    author: 'ChefBoy',
    authorId: '3',
    timeAgo: '3 hours ago',
    timestamp: Date.now() - 10800000,
    title: 'Homemade ramen from scratch - 8 hours of work',
    type: 'image',
    content: 'https://placehold.co/600x400/ffa500/white?text=Ramen+Bowl',
    voteCount: 34500,
    upvotes: 34500,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 26,
    subreddit: 'food',
    author: 'ChefBoy',
    authorId: '3',
    timeAgo: '1 day ago',
    timestamp: Date.now() - 86400000,
    title: 'Perfect medium-rare steak - my technique',
    type: 'text',
    content: 'Reverse sear method is the way to go. Here\'s how I do it...',
    voteCount: 23400,
    upvotes: 23400,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 27,
    subreddit: 'movies',
    author: 'MovieBuff',
    authorId: '20',
    timeAgo: '5 hours ago',
    timestamp: Date.now() - 18000000,
    title: 'Dune Part 2 is a masterpiece. Best sci-fi film in decades',
    type: 'text',
    content: 'Denis Villeneuve is a genius. The cinematography alone deserves an Oscar.',
    voteCount: 18900,
    upvotes: 18900,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 28,
    subreddit: 'movies',
    author: 'MovieBuff',
    authorId: '20',
    timeAgo: '12 hours ago',
    timestamp: Date.now() - 43200000,
    title: 'What is a movie you can watch over and over?',
    type: 'text',
    content: 'For me it is The Shawshank Redemption. Never gets old.',
    voteCount: 12300,
    upvotes: 12300,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 29,
    subreddit: 'aww',
    author: 'PetLover',
    authorId: '19',
    timeAgo: '2 hours ago',
    timestamp: Date.now() - 7200000,
    title: 'My cat learned to high-five!',
    type: 'image',
    content: 'https://placehold.co/600x400/ff69b4/white?text=Cat+High+Five',
    voteCount: 67800,
    upvotes: 67800,
    downvotes: 0,
    commentCount: 0,
  },
  {
    id: 30,
    subreddit: 'aww',
    author: 'PetLover',
    authorId: '19',
    timeAgo: '1 day ago',
    timestamp: Date.now() - 86400000,
    title: 'Adopted this good boy from the shelter today',
    type: 'image',
    content: 'https://placehold.co/600x400/90ee90/white?text=Happy+Dog',
    voteCount: 89200,
    upvotes: 89200,
    downvotes: 0,
    commentCount: 0,
  },
];

let nextId = 31;

const getAllPosts = () => {
  // Update comment counts dynamically from actual comments
  const { getCommentCountByPostId } = require('./comments');
  return posts.map(post => {
    const dynamicCount = getCommentCountByPostId(post.id);
    return {
      ...post,
      // Use dynamic count if there are real comments, otherwise keep static count
      commentCount: dynamicCount > 0 ? dynamicCount : post.commentCount
    };
  });
};

const getPostById = (id) => {
  const post = posts.find(p => p.id === parseInt(id));
  if (!post) return null;
  
  const { getCommentCountByPostId } = require('./comments');
  const dynamicCount = getCommentCountByPostId(post.id);
  return {
    ...post,
    // Use dynamic count if there are real comments, otherwise keep static count
    commentCount: dynamicCount > 0 ? dynamicCount : post.commentCount
  };
};

const getPostsBySubreddit = (subreddit) => {
  const { getCommentCountByPostId } = require('./comments');
  return posts
    .filter(p => p.subreddit.toLowerCase() === subreddit.toLowerCase())
    .map(post => {
      const dynamicCount = getCommentCountByPostId(post.id);
      return {
        ...post,
        commentCount: dynamicCount > 0 ? dynamicCount : post.commentCount
      };
    });
};

const getPostsByAuthor = (authorId) => 
  posts.filter(p => p.authorId === authorId);

const createPost = (postData) => {
  const newPost = {
    id: nextId++,
    ...postData,
    timestamp: Date.now(),
    timeAgo: 'just now',
    voteCount: 1,
    upvotes: 1,
    downvotes: 0,
    commentCount: 0,
  };
  posts.unshift(newPost);
  return newPost;
};

const votePost = (postId, userId, voteType) => {
  const post = getPostById(postId);
  if (!post) return null;

  if (voteType === 'up') {
    post.upvotes++;
    post.voteCount++;
  } else if (voteType === 'down') {
    post.downvotes++;
    post.voteCount--;
  }

  return post;
};

const incrementCommentCount = (postId) => {
  const post = getPostById(postId);
  if (post) {
    post.commentCount++;
  }
  return post;
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsBySubreddit,
  getPostsByAuthor,
  createPost,
  votePost,
  incrementCommentCount,
};
