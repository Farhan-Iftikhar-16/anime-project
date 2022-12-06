const mongoose = require('mongoose')

const ratingSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  animeId: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  }
});

const Rating = module.exports = mongoose.model('Rating', ratingSchema);

module.exports.addRating = (animeId, userId, animeRating, callback) => {
  const rating = new Rating({
    userId: userId,
    animeId: animeId,
    rating: animeRating
  });

  rating.save((error, anime) => {
    if (error) {
      return callback(error, null);
    }

    if (!error) {
      return callback(null, anime);
    }
  });
}

module.exports.getRatings = (userId, callback) => {
  Rating.find({userId: userId}, (err, result) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, result);
    }
  })
}

module.exports.deleteComment = (data, callback) => {
  rating.find({$and: [{userId: data.user_id}, {animeId: data.anime_id}]}, (err, result) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, result);
    }
  })
}
