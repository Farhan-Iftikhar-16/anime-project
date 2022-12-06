const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  animeId: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

const Comments = module.exports = mongoose.model('Comment', commentsSchema);

module.exports.addComment = (animeId, userId, comment, callback) => {
  const comments = new Comments({
    userId: userId,
    animeId: animeId,
    comments: comment
  });

  comments.save((error, anime) => {
    if (error) {
      return callback(error, null);
    }

    if (!error) {
      return callback(null, anime);
    }
  });
}

module.exports.getComments = (userId, callback) => {
  Comments.find({userId: userId}, (err, result) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, result);
    }
  })
}

module.exports.deleteComment = (data, callback) => {
  Comments.find({$and: [{userId: data.user_id}, {animeId: data.anime_id}]}, (err, result) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, result);
    }
  })
}
