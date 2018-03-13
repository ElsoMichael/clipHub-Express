const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  // Comment Section???
}, {
  timestamps: true
});

const Forum = mongoose.model('Forum', ForumSchema);

module.exports = Forum;