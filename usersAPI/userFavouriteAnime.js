const mongoose = require('mongoose');

const userFavouriteAnimeSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  animeId: {
    type: String,
    required: true
  }
});

const UserFavouriteAnime = module.exports = mongoose.model('FavouriteAnime', userFavouriteAnimeSchema);

module.exports.addFavourite = (animeId, userId, callback) => {
  const favouriteAnime = new UserFavouriteAnime({
    userId: userId,
    animeId: animeId,
  });

  favouriteAnime.save((error, anime) => {
    if (error) {
      return callback(error, null);
    }

    if (!error) {
      return callback(null, anime);
    }
  });
}

module.exports.viewedFavorite = (anime_id, user_id, callback) => {
  UserFavouriteAnime.findOneAndUpdate({$and: [{animeId: anime_id}, {userId: user_id}]}, {viewed: 'Просмотрено'}, (err, result) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, result);
    }
  })
}
