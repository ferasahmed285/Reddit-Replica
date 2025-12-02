require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../models/User');
const Community = require('../models/Community');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');
const UserActivity = require('../models/UserActivity');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Community.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Notification.deleteMany({});
    await UserActivity.deleteMany({});

    // Create users
    console.log('👤 Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const usersData = [
      { username: 'CuriousGuy99', bio: 'Just a curious guy asking questions on the internet.', bannerColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', karma: 12500 },
      { username: 'CodeNinja', bio: 'Full-stack developer | Open source maintainer | Coffee powered', bannerColor: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', karma: 91700 },
      { username: 'ChefBoy', bio: 'Home chef | Food lover | Grilling enthusiast', bannerColor: 'linear-gradient(135deg, #ffa500 0%, #ff6347 100%)', karma: 45200 },
      { username: 'GymRat_22', bio: 'Fitness enthusiast | Gym 6 days a week | Gains over everything', bannerColor: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', karma: 28300 },
      { username: 'PhotographerX', bio: 'Professional photographer | Travel lover | Capturing moments', bannerColor: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)', karma: 89200 },
      { username: 'MemeLord', bio: 'Professional meme curator | Making the internet laugh since 2018', bannerColor: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)', karma: 156700 },
      { username: 'TechGuru2024', bio: 'Tech enthusiast | Gadget reviewer | Always online', bannerColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', karma: 34700 },
      { username: 'GameMaster', bio: 'Hardcore gamer | Speedrunner | Streaming on weekends', bannerColor: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)', karma: 67400 },
      { username: 'BookWorm', bio: 'Avid reader | Book reviewer | 100+ books a year', bannerColor: 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)', karma: 42100 },
      { username: 'ScienceNerd', bio: 'PhD in Physics | Science communicator | Making science fun', bannerColor: 'linear-gradient(135deg, #00ff00 0%, #32cd32 100%)', karma: 78900 },
    ];

    const users = [];
    for (const userData of usersData) {
      const user = await User.create({
        ...userData,
        password: hashedPassword,
        avatar: `https://placehold.co/100/ff4500/white?text=${userData.username.substring(0, 2).toUpperCase()}`,
        cakeDay: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      });
      users.push(user);
      
      // Create user activity
      await UserActivity.create({ user: user._id });
    }
    console.log(`   Created ${users.length} users`);

    // Create communities
    console.log('🏘️  Creating communities...');
    const communitiesData = [
      { name: 'askmen', title: 'AskMen', description: "A place to discuss men's lives and opinions.", memberCount: 1250, creatorIndex: 0, bannerColor: '24292e', iconColor: 'orangered', category: 'Q&As & Stories' },
      { name: 'askwomen', title: 'AskWomen', description: 'A space for women to share their perspectives.', memberCount: 980, creatorIndex: 0, bannerColor: 'pink', iconColor: 'pink', category: 'Q&As & Stories' },
      { name: 'reactjs', title: 'React.js', description: 'A community for learning and developing with React.', memberCount: 2340, creatorIndex: 1, bannerColor: '61dafb', iconColor: '20232a', category: 'Technology' },
      { name: 'funny', title: 'Funny', description: "Welcome to r/Funny, Reddit's largest humour depository.", memberCount: 5670, creatorIndex: 5, bannerColor: 'ff4500', iconColor: 'ff4500', category: 'Entertainment' },
      { name: 'pics', title: 'Pictures', description: 'A place for pictures and photographs.', memberCount: 3450, creatorIndex: 4, bannerColor: 'green', iconColor: 'green', category: 'Entertainment' },
      { name: 'gaming', title: 'Gaming', description: 'A subreddit for (almost) anything related to games.', memberCount: 4560, creatorIndex: 7, bannerColor: '8b00ff', iconColor: '8b00ff', category: 'Gaming' },
      { name: 'technology', title: 'Technology', description: 'Subreddit dedicated to the news and discussions about technology.', memberCount: 2890, creatorIndex: 6, bannerColor: '00bfff', iconColor: '00bfff', category: 'Technology' },
      { name: 'books', title: 'Books', description: 'This is a moderated subreddit for book lovers.', memberCount: 1560, creatorIndex: 8, bannerColor: '8b4513', iconColor: '8b4513', category: 'Entertainment' },
      { name: 'music', title: 'Music', description: 'The musical community of Reddit.', memberCount: 3210, creatorIndex: 5, bannerColor: 'ff1493', iconColor: 'ff1493', category: 'Entertainment' },
      { name: 'science', title: 'Science', description: 'This community is a place to share and discuss new scientific research.', memberCount: 2780, creatorIndex: 9, bannerColor: '00ff00', iconColor: '00ff00', category: 'News' },
      { name: 'fitness', title: 'Fitness', description: 'Discussion of physical fitness/exercise goals.', memberCount: 1890, creatorIndex: 3, bannerColor: 'ff6347', iconColor: 'ff6347', category: 'Sports' },
      { name: 'food', title: 'Food', description: 'Cooking, restaurants, recipes, food network, foodies!', memberCount: 2340, creatorIndex: 2, bannerColor: 'ffa500', iconColor: 'ffa500', category: 'Entertainment' },
      { name: 'movies', title: 'Movies', description: 'The goal of /r/Movies is to provide an inclusive place for discussions.', memberCount: 3670, creatorIndex: 7, bannerColor: 'ff0000', iconColor: 'ff0000', category: 'Entertainment' },
      { name: 'aww', title: 'Aww', description: 'Things that make you go AWW! -- like puppies, bunnies, babies...', memberCount: 4120, creatorIndex: 0, bannerColor: 'ffb6c1', iconColor: 'ffb6c1', category: 'Entertainment' },
    ];

    const communities = [];
    for (const commData of communitiesData) {
      const creator = users[commData.creatorIndex];
      const community = await Community.create({
        name: commData.name,
        displayName: `r/${commData.name}`,
        title: commData.title,
        description: commData.description,
        memberCount: commData.memberCount,
        creator: creator._id,
        creatorUsername: creator.username,
        category: commData.category,
        iconUrl: `https://placehold.co/100/${commData.iconColor}/white?text=${commData.name.substring(0, 2).toUpperCase()}`,
        bannerUrl: `https://placehold.co/1000x150/${commData.bannerColor}/white?text=${commData.title}+Banner`
      });
      communities.push(community);
    }
    console.log(`   Created ${communities.length} communities`);

    // Create posts
    console.log('📝 Creating posts...');
    const postsData = [
      { title: 'Men of Reddit, what is the one compliment you received that you still think about?', type: 'text', content: 'I was told I have nice eyebrows 6 years ago by a cashier. I still think about it weekly.', communityName: 'askmen', authorIndex: 0, upvotes: 44, downvotes: 3 },
      { title: 'How do you balance work and gym?', type: 'text', content: 'I feel like I am always tired after work. Any tips?', communityName: 'askmen', authorIndex: 3, upvotes: 31, downvotes: 5 },
      { title: 'React 19 is coming. Are we ready?', type: 'text', content: 'The new compiler looks amazing, but I am worried about breaking changes.', communityName: 'reactjs', authorIndex: 1, upvotes: 25, downvotes: 2 },
      { title: 'My cat trying to understand physics', type: 'image', content: 'https://placehold.co/600x400/orange/white?text=Confused+Cat+Meme', communityName: 'funny', authorIndex: 5, upvotes: 120, downvotes: 8 },
      { title: 'Sunset in Kyoto, Japan', type: 'image', content: 'https://placehold.co/600x400/purple/white?text=Kyoto+Sunset', communityName: 'pics', authorIndex: 4, upvotes: 220, downvotes: 12 },
      { title: 'Just finished Elden Ring after 200 hours. What a masterpiece!', type: 'text', content: 'The level design, boss fights, and exploration are unmatched.', communityName: 'gaming', authorIndex: 7, upvotes: 89, downvotes: 7 },
      { title: 'AI is getting scary good at coding. Should developers be worried?', type: 'text', content: 'I just used GPT-4 to build an entire app in 30 minutes.', communityName: 'technology', authorIndex: 1, upvotes: 156, downvotes: 34 },
      { title: 'Just finished "Project Hail Mary" and I am blown away', type: 'text', content: 'Andy Weir did it again. This book is even better than The Martian!', communityName: 'books', authorIndex: 8, upvotes: 67, downvotes: 4 },
      { title: 'New study shows coffee may extend lifespan by 20%', type: 'text', content: 'Finally, some good news for coffee addicts like me!', communityName: 'science', authorIndex: 9, upvotes: 345, downvotes: 23 },
      { title: 'Hit a 405lb deadlift today! 2 years of training paid off', type: 'text', content: 'Started at 135lbs. Consistency is key!', communityName: 'fitness', authorIndex: 3, upvotes: 56, downvotes: 2 },
      { title: 'Homemade ramen from scratch - 8 hours of work', type: 'image', content: 'https://placehold.co/600x400/ffa500/white?text=Ramen+Bowl', communityName: 'food', authorIndex: 2, upvotes: 345, downvotes: 15 },
      { title: 'Dune Part 2 is a masterpiece. Best sci-fi film in decades', type: 'text', content: 'Denis Villeneuve is a genius. The cinematography alone deserves an Oscar.', communityName: 'movies', authorIndex: 7, upvotes: 189, downvotes: 11 },
      { title: 'My cat learned to high-five!', type: 'image', content: 'https://placehold.co/600x400/ff69b4/white?text=Cat+High+Five', communityName: 'aww', authorIndex: 0, upvotes: 678, downvotes: 21 },
    ];

    for (const postData of postsData) {
      const author = users[postData.authorIndex];
      const community = communities.find(c => c.name === postData.communityName);
      
      await Post.create({
        title: postData.title,
        type: postData.type,
        content: postData.content,
        author: author._id,
        authorUsername: author.username,
        community: community._id,
        communityName: community.name,
        upvotes: postData.upvotes,
        downvotes: postData.downvotes || 0,
        createdAt: new Date(Date.now() - Math.random() * 86400000 * 7) // Random time in last 7 days
      });
    }
    console.log(`   Created ${postsData.length} posts`);

    // Get all posts for comments
    const allPosts = await Post.find({});

    // Create comments
    console.log('💬 Creating comments...');
    const commentsData = [
      // Comments for post 0 (Men of Reddit compliment)
      { postIndex: 0, authorIndex: 1, content: 'A girl told me I smell nice 10 years ago. Still using the same cologne.', upvotes: 234, downvotes: 5 },
      { postIndex: 0, authorIndex: 3, content: 'Someone said I have a nice smile once. Made my whole year.', upvotes: 156, downvotes: 3 },
      { postIndex: 0, authorIndex: 5, content: 'My barber said I have good hair. I think about it every haircut.', upvotes: 89, downvotes: 2 },
      
      // Comments for post 2 (React 19)
      { postIndex: 2, authorIndex: 6, content: 'The new compiler is going to be a game changer for performance!', upvotes: 45, downvotes: 2 },
      { postIndex: 2, authorIndex: 0, content: 'I hope they maintain backward compatibility. Migration fatigue is real.', upvotes: 78, downvotes: 8 },
      { postIndex: 2, authorIndex: 9, content: 'Server components are the future. Excited to see how this evolves.', upvotes: 34, downvotes: 1 },
      
      // Comments for post 3 (Cat physics)
      { postIndex: 3, authorIndex: 0, content: 'Cats are liquid, they defy physics by nature 😂', upvotes: 567, downvotes: 12 },
      { postIndex: 3, authorIndex: 2, content: 'If I fits, I sits - the only physics law cats follow', upvotes: 423, downvotes: 8 },
      
      // Comments for post 5 (Elden Ring)
      { postIndex: 5, authorIndex: 1, content: 'Malenia took me 50+ tries. Worth every death.', upvotes: 123, downvotes: 4 },
      { postIndex: 5, authorIndex: 5, content: 'The open world design is incredible. So much to discover!', upvotes: 89, downvotes: 2 },
      { postIndex: 5, authorIndex: 9, content: 'FromSoftware really outdid themselves with this one.', upvotes: 67, downvotes: 1 },
      
      // Comments for post 6 (AI coding)
      { postIndex: 6, authorIndex: 8, content: 'AI is a tool, not a replacement. Good developers will adapt.', upvotes: 234, downvotes: 15 },
      { postIndex: 6, authorIndex: 3, content: 'The real skill is knowing what to ask and how to verify the output.', upvotes: 189, downvotes: 7 },
      { postIndex: 6, authorIndex: 0, content: 'Junior devs should still learn fundamentals. AI can\'t replace understanding.', upvotes: 156, downvotes: 12 },
      
      // Comments for post 8 (Coffee study)
      { postIndex: 8, authorIndex: 2, content: 'Finally, a study that validates my 5 cups a day habit!', upvotes: 234, downvotes: 23 },
      { postIndex: 8, authorIndex: 5, content: 'Correlation vs causation though... coffee drinkers might just be more active.', upvotes: 178, downvotes: 8 },
      
      // Comments for post 9 (Deadlift)
      { postIndex: 9, authorIndex: 1, content: 'Congrats! That\'s a huge milestone. What program did you follow?', upvotes: 34, downvotes: 0 },
      { postIndex: 9, authorIndex: 7, content: 'Form check? 405 is no joke, want to make sure you\'re staying safe!', upvotes: 28, downvotes: 1 },
      
      // Comments for post 11 (Dune)
      { postIndex: 11, authorIndex: 4, content: 'The sandworm scenes were absolutely breathtaking on IMAX.', upvotes: 145, downvotes: 5 },
      { postIndex: 11, authorIndex: 8, content: 'Hans Zimmer\'s score elevated every scene. Masterful work.', upvotes: 123, downvotes: 3 },
      { postIndex: 11, authorIndex: 2, content: 'Timothée Chalamet really grew into the role of Paul.', upvotes: 98, downvotes: 12 },
      
      // Comments for post 12 (Cat high-five)
      { postIndex: 12, authorIndex: 5, content: 'This is the content I\'m here for! 🐱✋', upvotes: 345, downvotes: 4 },
      { postIndex: 12, authorIndex: 6, content: 'How long did it take to train? My cat just ignores me lol', upvotes: 234, downvotes: 2 },
    ];

    const createdComments = [];
    for (const commentData of commentsData) {
      const post = allPosts[commentData.postIndex];
      const author = users[commentData.authorIndex];
      
      const comment = await Comment.create({
        content: commentData.content,
        post: post._id,
        author: author._id,
        authorUsername: author.username,
        upvotes: commentData.upvotes,
        downvotes: commentData.downvotes,
        createdAt: new Date(Date.now() - Math.random() * 86400000 * 5)
      });
      createdComments.push(comment);

      // Update post comment count
      post.commentCount++;
      await post.save();
    }
    console.log(`   Created ${commentsData.length} comments`);

    // Auto-join users to communities where they have posts or comments
    console.log('🔗 Auto-joining users to communities...');
    
    // Track which users should be joined to which communities
    const userCommunityMap = new Map(); // userId -> Set of communityIds
    
    // Add post authors to their communities
    for (const postData of postsData) {
      const author = users[postData.authorIndex];
      const community = communities.find(c => c.name === postData.communityName);
      if (!userCommunityMap.has(author._id.toString())) {
        userCommunityMap.set(author._id.toString(), new Set());
      }
      userCommunityMap.get(author._id.toString()).add(community._id.toString());
    }
    
    // Add comment authors to their communities
    for (const commentData of commentsData) {
      const author = users[commentData.authorIndex];
      const post = allPosts[commentData.postIndex];
      const community = communities.find(c => c._id.toString() === post.community.toString());
      if (community) {
        if (!userCommunityMap.has(author._id.toString())) {
          userCommunityMap.set(author._id.toString(), new Set());
        }
        userCommunityMap.get(author._id.toString()).add(community._id.toString());
      }
    }
    
    // Also add community creators to their communities
    for (const commData of communitiesData) {
      const creator = users[commData.creatorIndex];
      const community = communities.find(c => c.name === commData.name);
      if (!userCommunityMap.has(creator._id.toString())) {
        userCommunityMap.set(creator._id.toString(), new Set());
      }
      userCommunityMap.get(creator._id.toString()).add(community._id.toString());
    }
    
    // Update UserActivity for each user
    let joinCount = 0;
    for (const [userId, communityIds] of userCommunityMap) {
      const activity = await UserActivity.findOne({ user: userId });
      if (activity) {
        for (const communityId of communityIds) {
          if (!activity.joinedCommunities.includes(communityId)) {
            activity.joinedCommunities.push(communityId);
            joinCount++;
          }
        }
        await activity.save();
      }
    }
    console.log(`   Created ${joinCount} community memberships`);

    // Create some sample notifications for CodeNinja (user index 1)
    console.log('🔔 Creating notifications...');
    const codeNinja = users[1];
    const notificationsData = [
      { type: 'upvote', message: 'Your post "React 19 is coming" received 25 upvotes', link: `/post/${allPosts[2]._id}`, fromIndex: 0 },
      { type: 'comment', message: 'CuriousGuy99 commented on your post', link: `/post/${allPosts[2]._id}`, fromIndex: 0 },
      { type: 'reply', message: 'TechGuru2024 replied to your comment', link: `/post/${allPosts[6]._id}`, fromIndex: 6 },
      { type: 'follow', message: 'GameMaster started following you', link: '/user/GameMaster', fromIndex: 7 },
    ];

    for (const notifData of notificationsData) {
      await Notification.create({
        user: codeNinja._id,
        type: notifData.type,
        message: notifData.message,
        link: notifData.link,
        fromUser: users[notifData.fromIndex]._id,
        fromUsername: users[notifData.fromIndex].username,
        read: Math.random() > 0.5,
        createdAt: new Date(Date.now() - Math.random() * 86400000 * 3)
      });
    }
    console.log(`   Created ${notificationsData.length} notifications`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Demo credentials:');
    console.log('   Username: CodeNinja');
    console.log('   Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
