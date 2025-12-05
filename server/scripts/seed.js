require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../models/User');
const Community = require('../models/Community');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Vote = require('../models/Vote');
const Notification = require('../models/Notification');
const UserActivity = require('../models/UserActivity');
const CustomFeed = require('../models/CustomFeed');
const Chat = require('../models/Chat');

// Helper to generate random email
const generateEmail = (username) => {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  return `${username}@${domains[Math.floor(Math.random() * domains.length)]}`;
};

// Helper to get random items from array
const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
};

// Helper to get random int
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate colorful icons using UI Avatars API (very reliable)
const getIcon = (name) => {
  const colors = ['ff4500', '0079d3', '7193ff', 'ff8717', '94e044', 'ffb000', '46d160', 'ff66ac', 'ea0027', '00a6a5'];
  const color = colors[name.length % colors.length];
  return `https://ui-avatars.com/api/?name=${name.substring(0,2).toUpperCase()}&background=${color}&color=fff&size=128&bold=true&format=png`;
};

// Get banner using picsum.photos (very reliable, no watermarks)
const getBanner = (seed) => {
  return `https://picsum.photos/seed/${seed}/1200/300`;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear all data
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Community.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
      Vote.deleteMany({}),
      Notification.deleteMany({}),
      UserActivity.deleteMany({}),
      CustomFeed.deleteMany({}),
      Chat.deleteMany({})
    ]);

    // Create users
    console.log('Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const usersData = [
      { username: 'techguru', bio: 'Full-stack developer | Open source enthusiast' },
      { username: 'gamerpro', bio: 'Hardcore gamer | Speedrunner | Streaming weekends' },
      { username: 'bookworm', bio: 'Avid reader | 100+ books a year | Book reviewer' },
      { username: 'fitnessfan', bio: 'Gym 6 days a week | Nutrition nerd | Gains over everything' },
      { username: 'foodlover', bio: 'Home chef | Restaurant explorer | Recipe creator' },
      { username: 'sciencenerd', bio: 'PhD student | Science communicator | Curious mind' },
      { username: 'moviebuff', bio: 'Film critic | Cinema enthusiast | Oscar predictor' },
      { username: 'musicfan', bio: 'Vinyl collector | Concert goer | All genres welcome' },
      { username: 'photopro', bio: 'Professional photographer | Travel lover | Capturing moments' },
      { username: 'newsjunkie', bio: 'Staying informed | Political observer | News analyst' },
      { username: 'petlover', bio: 'Dog dad | Cat mom | Animal rescue volunteer' },
      { username: 'sportsfan', bio: 'Fantasy league champion | Stats nerd | Game day ready' },
      { username: 'artlover', bio: 'Museum hopper | Digital artist | Creative soul' },
      { username: 'traveler', bio: 'Wanderlust | 30 countries and counting | Adventure seeker' },
      { username: 'coder_jane', bio: 'Software engineer | Python lover | Building cool stuff' },
      { username: 'chef_mike', bio: 'Professional chef | Culinary school grad | Food is art' },
      { username: 'yoga_sarah', bio: 'Yoga instructor | Mindfulness advocate | Inner peace' },
      { username: 'crypto_dan', bio: 'Blockchain developer | DeFi enthusiast | HODL' },
      { username: 'writer_emma', bio: 'Novelist | Blogger | Words are my superpower' },
      { username: 'diy_master', bio: 'Woodworker | Home improvement | Making things' },
    ];

    const bannerColors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      'linear-gradient(135deg, #ffa500 0%, #ff6347 100%)',
      'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
      'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
      'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)',
      'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)',
    ];

    const users = [];
    for (const userData of usersData) {
      const user = await User.create({
        ...userData,
        email: generateEmail(userData.username),
        password: hashedPassword,
        bannerColor: bannerColors[Math.floor(Math.random() * bannerColors.length)],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
        cakeDay: new Date(2020 + randomInt(0, 4), randomInt(0, 11), randomInt(1, 28))
      });
      users.push(user);
      await UserActivity.create({ user: user._id });
    }
    console.log(`   Created ${users.length} users`);


    // Create communities
    console.log('Creating communities...');
    const communitiesData = [
      { name: 'askmen', title: 'AskMen', description: 'A place for men to discuss life, relationships, and everything in between.', category: 'Q&As & Stories' },
      { name: 'askwomen', title: 'AskWomen', description: 'A space for women to share perspectives and experiences.', category: 'Q&As & Stories' },
      { name: 'programming', title: 'Programming', description: 'Computer programming news, tekniques, and discussion.', category: 'Technology' },
      { name: 'gaming', title: 'Gaming', description: 'A subreddit for almost anything related to games.', category: 'Gaming' },
      { name: 'movies', title: 'Movies', description: 'News and discussion about major motion pictures.', category: 'Entertainment' },
      { name: 'music', title: 'Music', description: 'The musical community of Reddit.', category: 'Entertainment' },
      { name: 'science', title: 'Science', description: 'Share and discuss new scientific research.', category: 'News' },
      { name: 'fitness', title: 'Fitness', description: 'Discussion of physical fitness and exercise goals.', category: 'Sports' },
      { name: 'food', title: 'Food', description: 'Cooking, restaurants, recipes, and food culture.', category: 'Entertainment' },
      { name: 'technology', title: 'Technology', description: 'News and discussions about technology.', category: 'Technology' },
      { name: 'books', title: 'Books', description: 'A community for book lovers and readers.', category: 'Entertainment' },
      { name: 'aww', title: 'Aww', description: 'Things that make you go AWW! Cute animals and more.', category: 'Entertainment' },
      { name: 'pics', title: 'Pictures', description: 'A place for pictures and photographs.', category: 'Entertainment' },
      { name: 'funny', title: 'Funny', description: 'Reddit\'s largest humor community.', category: 'Entertainment' },
      { name: 'worldnews', title: 'World News', description: 'A place for major news from around the world.', category: 'News' },
    ];

    const communities = [];
    for (let i = 0; i < communitiesData.length; i++) {
      const commData = communitiesData[i];
      const creator = users[i % users.length];
      
      const community = await Community.create({
        name: commData.name,
        displayName: `r/${commData.name}`,
        title: commData.title,
        description: commData.description,
        category: commData.category,
        creator: creator._id,
        creatorUsername: creator.username,
        memberCount: 1, // Will be updated after users join
        iconUrl: getIcon(commData.name),
        bannerUrl: getBanner(commData.name) // Uses community name as seed for consistent images
      });
      communities.push(community);
      
      // Creator auto-joins their community
      const activity = await UserActivity.findOne({ user: creator._id });
      activity.joinedCommunities.push(community._id);
      await activity.save();
    }
    console.log(`   Created ${communities.length} communities`);

    // Have users randomly join communities
    console.log('Users joining communities...');
    
    // Track member counts properly
    const memberCounts = new Map();
    for (const community of communities) {
      memberCounts.set(community._id.toString(), 1); // Creator already joined
    }
    
    let totalJoins = 0;
    for (const user of users) {
      const activity = await UserActivity.findOne({ user: user._id });
      const alreadyJoined = new Set(activity.joinedCommunities.map(id => id.toString()));
      
      const numToJoin = randomInt(3, 10);
      const communitiesToJoin = getRandomItems(communities, numToJoin);
      
      for (const community of communitiesToJoin) {
        const communityIdStr = community._id.toString();
        if (!alreadyJoined.has(communityIdStr)) {
          activity.joinedCommunities.push(community._id);
          alreadyJoined.add(communityIdStr);
          memberCounts.set(communityIdStr, memberCounts.get(communityIdStr) + 1);
          totalJoins++;
        }
      }
      await activity.save();
    }
    
    // Update community member counts to match actual joins
    for (const community of communities) {
      community.memberCount = memberCounts.get(community._id.toString());
      await community.save();
    }
    console.log(`   Created ${totalJoins} community memberships`);

    // Create posts
    console.log('Creating posts...');
    const postTemplates = [
      // AskMen posts
      { community: 'askmen', title: 'Men of Reddit, what compliment do you still think about?', content: 'A cashier told me I have nice eyes 5 years ago. Still think about it.', type: 'text' },
      { community: 'askmen', title: 'How do you deal with work stress?', content: 'Looking for healthy coping mechanisms. What works for you?', type: 'text' },
      { community: 'askmen', title: 'What skill did you learn that changed your life?', content: 'For me it was cooking. Saved money and eat healthier now.', type: 'text' },
      
      // AskWomen posts
      { community: 'askwomen', title: 'What is something you wish more people understood?', content: 'Curious to hear different perspectives on this.', type: 'text' },
      { community: 'askwomen', title: 'Best self-care routines?', content: 'Looking for ideas to improve my daily routine.', type: 'text' },
      
      // Programming posts
      { community: 'programming', title: 'What programming language should I learn in 2024?', content: 'I know Python basics. Should I learn JavaScript, Go, or Rust next?', type: 'text' },
      { community: 'programming', title: 'Clean code is overrated - change my mind', content: 'Sometimes working code is better than perfect code. Discuss.', type: 'text' },
      { community: 'programming', title: 'Just deployed my first production app!', content: 'After 6 months of learning, finally shipped something real. Feels amazing!', type: 'text' },
      
      // Gaming posts
      { community: 'gaming', title: 'What game has the best soundtrack?', content: 'For me it\'s a tie between Hades and Celeste.', type: 'text' },
      { community: 'gaming', title: 'Finally beat Elden Ring after 150 hours', content: 'What a journey. Malenia took me 50+ tries.', type: 'text' },
      { community: 'gaming', title: 'My gaming setup', content: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800', type: 'image' },
      
      // Movies posts
      { community: 'movies', title: 'Dune Part 2 is a masterpiece', content: 'Denis Villeneuve outdid himself. The cinematography is breathtaking.', type: 'text' },
      { community: 'movies', title: 'What movie can you watch over and over?', content: 'Mine is The Dark Knight. Never gets old.', type: 'text' },
      
      // Music posts
      { community: 'music', title: 'What album changed your life?', content: 'For me it was OK Computer by Radiohead.', type: 'text' },
      { community: 'music', title: 'My vinyl collection', content: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800', type: 'image' },
      
      // Science posts
      { community: 'science', title: 'New study shows coffee may extend lifespan', content: 'Finally some good news for coffee addicts!', type: 'text' },
      { community: 'science', title: 'James Webb telescope captures stunning new image', content: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800', type: 'image' },
      
      // Fitness posts
      { community: 'fitness', title: 'Hit a 405lb deadlift today!', content: 'Started at 135lbs two years ago. Consistency is key!', type: 'text' },
      { community: 'fitness', title: 'Best exercises for beginners?', content: 'Just started going to the gym. What should I focus on?', type: 'text' },
      { community: 'fitness', title: 'Home gym setup complete', content: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', type: 'image' },
      
      // Food posts
      { community: 'food', title: 'Homemade ramen from scratch', content: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800', type: 'image' },
      { community: 'food', title: 'Best pizza I\'ve ever made', content: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', type: 'image' },
      { community: 'food', title: 'What\'s your comfort food?', content: 'Mine is mac and cheese. Simple but perfect.', type: 'text' },
      
      // Technology posts
      { community: 'technology', title: 'AI is changing everything - are we ready?', content: 'The pace of AI development is incredible. What do you think the next 5 years will bring?', type: 'text' },
      { community: 'technology', title: 'My desk setup for remote work', content: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800', type: 'image' },
      
      // Books posts
      { community: 'books', title: 'Just finished Project Hail Mary - WOW', content: 'Andy Weir did it again. Even better than The Martian!', type: 'text' },
      { community: 'books', title: 'What book are you currently reading?', content: 'I\'m halfway through Dune. Finally understanding the hype.', type: 'text' },
      
      // Aww posts
      { community: 'aww', title: 'My cat learned to high-five!', content: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800', type: 'image' },
      { community: 'aww', title: 'Adopted this good boy today', content: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800', type: 'image' },
      { community: 'aww', title: 'Baby elephant playing in water', content: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800', type: 'image' },
      
      // Pics posts
      { community: 'pics', title: 'Sunset in Santorini', content: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', type: 'image' },
      { community: 'pics', title: 'Northern lights in Iceland', content: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800', type: 'image' },
      { community: 'pics', title: 'Cherry blossoms in Japan', content: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800', type: 'image' },
      
      // Funny posts
      { community: 'funny', title: 'My cat judging my life choices', content: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800', type: 'image' },
      { community: 'funny', title: 'Monday mood', content: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800', type: 'image' },
      
      // World News posts
      { community: 'worldnews', title: 'Major climate agreement reached at summit', content: 'World leaders commit to ambitious new targets.', type: 'text' },
      { community: 'worldnews', title: 'Tech companies announce new AI regulations', content: 'Industry-wide standards being developed.', type: 'text' },
    ];

    const posts = [];
    for (const template of postTemplates) {
      const community = communities.find(c => c.name === template.community);
      const author = users[randomInt(0, users.length - 1)];
      
      const post = await Post.create({
        title: template.title,
        type: template.type,
        content: template.content,
        author: author._id,
        authorUsername: author.username,
        community: community._id,
        communityName: community.name,
        upvotes: randomInt(10, 500),
        downvotes: randomInt(0, 50),
        createdAt: new Date(Date.now() - randomInt(0, 7) * 86400000 - randomInt(0, 86400000))
      });
      posts.push(post);
    }
    console.log(`   Created ${posts.length} posts`);


    // Create comments
    console.log('Creating comments...');
    const commentTemplates = [
      'This is so true!',
      'Great post, thanks for sharing.',
      'I completely agree with this.',
      'Interesting perspective, never thought of it that way.',
      'Can you elaborate more on this?',
      'This made my day!',
      'Saving this for later.',
      'Underrated comment right here.',
      'This is the way.',
      'Take my upvote!',
      'Came here to say this.',
      'Well said!',
      'This deserves more attention.',
      'Facts.',
      'I had a similar experience.',
      'Thanks for the info!',
      'This is helpful.',
      'Bookmarking this thread.',
      'Quality content right here.',
      'This community is the best.',
    ];

    const comments = [];
    for (const post of posts) {
      const numComments = randomInt(2, 8);
      for (let i = 0; i < numComments; i++) {
        const author = users[randomInt(0, users.length - 1)];
        const comment = await Comment.create({
          content: commentTemplates[randomInt(0, commentTemplates.length - 1)],
          post: post._id,
          author: author._id,
          authorUsername: author.username,
          upvotes: randomInt(1, 100),
          downvotes: randomInt(0, 10),
          createdAt: new Date(post.createdAt.getTime() + randomInt(1, 24) * 3600000)
        });
        comments.push(comment);
        post.commentCount++;
      }
      await post.save();
    }
    console.log(`   Created ${comments.length} comments`);

    // Create some nested replies
    console.log('Creating reply comments...');
    let replyCount = 0;
    for (const comment of comments.slice(0, 30)) {
      if (Math.random() > 0.5) {
        const author = users[randomInt(0, users.length - 1)];
        await Comment.create({
          content: commentTemplates[randomInt(0, commentTemplates.length - 1)],
          post: comment.post,
          author: author._id,
          authorUsername: author.username,
          parentComment: comment._id,
          depth: 1,
          upvotes: randomInt(1, 50),
          downvotes: randomInt(0, 5),
          createdAt: new Date(comment.createdAt.getTime() + randomInt(1, 12) * 3600000)
        });
        replyCount++;
        
        // Update post comment count
        const post = posts.find(p => p._id.toString() === comment.post.toString());
        if (post) {
          post.commentCount++;
          await post.save();
        }
      }
    }
    console.log(`   Created ${replyCount} reply comments`);

    // Create votes
    console.log('Creating votes...');
    let voteCount = 0;
    for (const post of posts) {
      const numVoters = randomInt(5, 15);
      const voters = getRandomItems(users, numVoters);
      for (const voter of voters) {
        if (voter._id.toString() !== post.author.toString()) {
          await Vote.create({
            user: voter._id,
            target: post._id,
            targetType: 'post',
            voteType: Math.random() > 0.2 ? 1 : -1
          });
          voteCount++;
        }
      }
    }
    console.log(`   Created ${voteCount} votes`);

    // Create notifications for first user
    console.log('Creating notifications...');
    const firstUser = users[0];
    const notificationTypes = ['upvote', 'comment', 'reply', 'follow'];
    
    for (let i = 0; i < 10; i++) {
      const fromUser = users[randomInt(1, users.length - 1)];
      const type = notificationTypes[randomInt(0, notificationTypes.length - 1)];
      const post = posts[randomInt(0, posts.length - 1)];
      
      let message, link;
      switch (type) {
        case 'upvote':
          message = `${fromUser.username} upvoted your post`;
          link = `/post/${post._id}`;
          break;
        case 'comment':
          message = `${fromUser.username} commented on your post`;
          link = `/post/${post._id}`;
          break;
        case 'reply':
          message = `${fromUser.username} replied to your comment`;
          link = `/post/${post._id}`;
          break;
        case 'follow':
          message = `${fromUser.username} started following you`;
          link = `/user/${fromUser.username}`;
          break;
      }
      
      await Notification.create({
        user: firstUser._id,
        type,
        message,
        link,
        fromUser: fromUser._id,
        fromUsername: fromUser.username,
        read: Math.random() > 0.5,
        createdAt: new Date(Date.now() - randomInt(0, 3) * 86400000)
      });
    }
    console.log('   Created 10 notifications');

    // Create a custom feed for first user
    console.log('Creating custom feeds...');
    const customFeed = await CustomFeed.create({
      name: 'Tech & Gaming',
      description: 'My favorite tech and gaming communities',
      creator: firstUser._id,
      creatorUsername: firstUser.username,
      communities: [
        communities.find(c => c.name === 'programming')._id,
        communities.find(c => c.name === 'gaming')._id,
        communities.find(c => c.name === 'technology')._id
      ],
      isFavorite: true
    });
    console.log('   Created 1 custom feed');

    // Create a sample chat
    console.log('Creating sample chat...');
    const user1 = users[0];
    const user2 = users[1];
    await Chat.create({
      participants: [user1._id, user2._id],
      participantUsernames: [user1.username, user2.username],
      messages: [
        { sender: user1._id, senderUsername: user1.username, content: 'Hey! How are you?', read: true },
        { sender: user2._id, senderUsername: user2.username, content: 'Good! Just checking out this Reddit clone.', read: true },
        { sender: user1._id, senderUsername: user1.username, content: 'Pretty cool right?', read: false }
      ],
      lastMessage: {
        content: 'Pretty cool right?',
        senderUsername: user1.username,
        createdAt: new Date()
      }
    });
    console.log('   Created 1 sample chat');

    // Summary
    console.log('\n========================================');
    console.log('Database seeded successfully!');
    console.log('========================================');
    console.log(`Users: ${users.length}`);
    console.log(`Communities: ${communities.length}`);
    console.log(`Posts: ${posts.length}`);
    console.log(`Comments: ${comments.length + replyCount}`);
    console.log(`Votes: ${voteCount}`);
    console.log('========================================');
    console.log('\nTest login credentials:');
    console.log('Username: techguru');
    console.log('Password: password123');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
