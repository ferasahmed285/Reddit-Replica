export const comments = {
  1: [ // Comments for post ID 1
    {
      id: 'c1',
      author: 'WiseDude',
      timeAgo: '3 hours ago',
      content: 'A woman once told me I had a nice voice. That was 8 years ago and I still think about it.',
      voteCount: 2400,
      replies: [
        {
          id: 'c1-1',
          author: 'VoiceCoach',
          timeAgo: '2 hours ago',
          content: 'Compliments about voice are so underrated! You should consider voice acting or podcasting.',
          voteCount: 340,
          replies: []
        }
      ]
    },
    {
      id: 'c2',
      author: 'RandomGuy42',
      timeAgo: '2 hours ago',
      content: 'Someone said I have kind eyes. Made my whole year.',
      voteCount: 1800,
      replies: []
    },
    {
      id: 'c3',
      author: 'ThoughtfulPerson',
      timeAgo: '1 hour ago',
      content: 'It\'s crazy how rare compliments are for men. We remember them forever because they\'re so uncommon.',
      voteCount: 3200,
      replies: [
        {
          id: 'c3-1',
          author: 'SocialScientist',
          timeAgo: '45 minutes ago',
          content: 'There\'s actually research on this! Men receive significantly fewer compliments than women, which is why they stick with us so much.',
          voteCount: 890,
          replies: []
        }
      ]
    }
  ],
  2: [ // Comments for post ID 2
    {
      id: 'c4',
      author: 'FitnessGuru',
      timeAgo: '10 hours ago',
      content: 'I go to the gym at 5:30 AM before work. It\'s tough but once it becomes a habit, you feel amazing.',
      voteCount: 450,
      replies: []
    },
    {
      id: 'c5',
      author: 'WorkLifeBalance',
      timeAgo: '8 hours ago',
      content: 'Meal prep on Sundays helps a lot. Also, don\'t skip sleep for the gym - recovery is just as important.',
      voteCount: 280,
      replies: []
    }
  ],
  3: [ // Comments for post ID 3
    {
      id: 'c6',
      author: 'GrillMaster',
      timeAgo: '20 hours ago',
      content: 'Burgers with a cold beer is peak dad energy. Add some potato salad and you\'re set.',
      voteCount: 1200,
      replies: []
    }
  ],
  4: [ // Comments for post ID 4
    {
      id: 'c7',
      author: 'ReactDev',
      timeAgo: '1 hour ago',
      content: 'The compiler is a game changer but I\'m waiting for the stable release before using it in production.',
      voteCount: 180,
      replies: []
    }
  ],
  5: [ // Comments for post ID 5
    {
      id: 'c8',
      author: 'SeniorDev',
      timeAgo: '4 hours ago',
      content: 'StrictMode intentionally mounts components twice in development to help you find bugs. It\'s not a problem, it\'s a feature!',
      voteCount: 45,
      replies: []
    }
  ],
  6: [ // Comments for post ID 6
    {
      id: 'c9',
      author: 'CatLover',
      timeAgo: '5 hours ago',
      content: 'This is hilarious! My cat does the same thing 😂',
      voteCount: 8900,
      replies: []
    }
  ]
};

export const getCommentsByPostId = (postId) => {
  return comments[postId] || [];
};


// Additional comments for more posts
const additionalComments = {
  9: [ // Gaming - Elden Ring
    {
      id: 'c10',
      author: 'GameMaster',
      timeAgo: '2 hours ago',
      content: 'Malenia took me 87 tries. Best boss fight ever designed.',
      voteCount: 1200,
      replies: []
    },
    {
      id: 'c11',
      author: 'TechGuru2024',
      timeAgo: '1 hour ago',
      content: 'The open world design is revolutionary. Every corner has something interesting.',
      voteCount: 890,
      replies: []
    }
  ],
  11: [ // AI Coding
    {
      id: 'c12',
      author: 'CodeNinja',
      timeAgo: '1 hour ago',
      content: 'AI is a tool, not a replacement. It makes us more productive, not obsolete.',
      voteCount: 2300,
      replies: [
        {
          id: 'c12-1',
          author: 'JuniorDev01',
          timeAgo: '45 minutes ago',
          content: 'Exactly! It\'s like saying calculators replaced mathematicians.',
          voteCount: 567,
          replies: []
        }
      ]
    }
  ],
  13: [ // Project Hail Mary
    {
      id: 'c13',
      author: 'BookWorm',
      timeAgo: '3 hours ago',
      content: 'The friendship between Ryland and Rocky made me cry. Such a beautiful story.',
      voteCount: 890,
      replies: []
    },
    {
      id: 'c14',
      author: 'ScienceNerd',
      timeAgo: '2 hours ago',
      content: 'As a physicist, I loved how accurate the science was. Andy Weir does his homework!',
      voteCount: 1200,
      replies: []
    }
  ],
  15: [ // Taylor Swift
    {
      id: 'c15',
      author: 'MusicLover88',
      timeAgo: '5 hours ago',
      content: 'Say what you want about her, but she\'s a marketing genius and incredible songwriter.',
      voteCount: 3400,
      replies: []
    }
  ],
  17: [ // Coffee study
    {
      id: 'c16',
      author: 'CoffeeAddict',
      timeAgo: '2 hours ago',
      content: 'Finally! Scientific proof that my 6 cups a day habit is healthy!',
      voteCount: 4500,
      replies: [
        {
          id: 'c16-1',
          author: 'ScienceNerd',
          timeAgo: '1 hour ago',
          content: 'Well, the study says 2-3 cups. 6 might be pushing it lol',
          voteCount: 2300,
          replies: []
        }
      ]
    }
  ],
  19: [ // Fitness - Sit-ups
    {
      id: 'c17',
      author: 'FitnessCoach',
      timeAgo: '4 hours ago',
      content: 'Planks, dead bugs, and pallof presses are way better for core strength.',
      voteCount: 890,
      replies: []
    },
    {
      id: 'c18',
      author: 'GymRat_22',
      timeAgo: '3 hours ago',
      content: 'Switched to these exercises 6 months ago. My back pain is gone!',
      voteCount: 567,
      replies: []
    }
  ],
  21: [ // Digital Art
    {
      id: 'c19',
      author: 'ArtisticSoul',
      timeAgo: '3 hours ago',
      content: 'Thank you all for the kind words! This took me 12 hours to complete.',
      voteCount: 1200,
      replies: []
    }
  ],
  23: [ // Iceland Travel
    {
      id: 'c20',
      author: 'TravelBug',
      timeAgo: '5 hours ago',
      content: 'Also, don\'t skip the Golden Circle. It\'s touristy but worth it!',
      voteCount: 890,
      replies: []
    }
  ],
  25: [ // Homemade Ramen
    {
      id: 'c21',
      author: 'ChefBoy',
      timeAgo: '2 hours ago',
      content: 'The broth simmered for 6 hours. That\'s where the magic happens.',
      voteCount: 2300,
      replies: [
        {
          id: 'c21-1',
          author: 'CoffeeAddict',
          timeAgo: '1 hour ago',
          content: 'This looks incredible! Recipe please?',
          voteCount: 456,
          replies: []
        }
      ]
    }
  ],
  27: [ // Dune Part 2
    {
      id: 'c22',
      author: 'MovieBuff',
      timeAgo: '4 hours ago',
      content: 'The sandworm riding scene was worth the price of admission alone.',
      voteCount: 3400,
      replies: []
    }
  ],
  29: [ // Cat high-five
    {
      id: 'c23',
      author: 'PetLover',
      timeAgo: '1 hour ago',
      content: 'It took 3 weeks of training with treats. Totally worth it!',
      voteCount: 5600,
      replies: []
    }
  ]
};

// Merge all comments
export const allComments = { ...comments, ...additionalComments };

// Export function to get comments by post ID
export const getCommentsByPostIdUpdated = (postId) => {
  return allComments[postId] || [];
};
