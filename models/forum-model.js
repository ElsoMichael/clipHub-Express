const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserComment = require('./comment-model');
const UserCommentSchema = UserComment.schema;

const ForumSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  comments: [ UserCommentSchema ]
}, {
  timestamps: true
});

const Forum = mongoose.model('Forum', ForumSchema);

module.exports = Forum;