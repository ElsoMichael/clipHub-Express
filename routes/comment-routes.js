var express = require('express');
var router = express.Router();

const UserComment = require('../models/comment-model');

/* GET Comment listing. */
router.get('/comment', (req, res, next) => {
  UserComment.find((err, forumList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(forumList);
  });
});

/* CREATE a new Comment. */
router.post('/comment', (req, res, next) => {
  const newComment = new UserComment ({
    owner: req.user._id,
    text: req.boby.text
  });

  newComment.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New Comment created!',
      id: newComment._id
    });
  });
});

/* GET a single Comment. */
router.get('/comment/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  UserComment.findById(req.params.id, (err, theComment) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(theComment);
    });
});

/* EDIT a Comment. */
router.put('/comment/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    text: req.boby.text
  };
  
  UserComment.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Comment updated successfully'
    });
  });
})

/* DELETE a Comment. */
router.delete('/comment/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  UserComment.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Comment has been removed!'
    });
  })
});

module.exports = router;