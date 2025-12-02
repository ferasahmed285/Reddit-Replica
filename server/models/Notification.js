const mongoose = require('mongoose');
const { getTimeAgo } = require('../utils/helpers');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['upvote', 'comment', 'reply', 'follow', 'mention'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fromUsername: String,
  relatedPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  relatedComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

notificationSchema.methods.getTimeAgo = function() {
  return getTimeAgo(this.createdAt);
};

notificationSchema.methods.toJSON = function() {
  const obj = this.toObject();
  obj.id = obj._id;
  obj.time = this.getTimeAgo();
  return obj;
};

notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ user: 1, read: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
