const express = require('express');
const movieFavouriteRouter = new express.Router();

const auth = require('../middleware/auth');
const movieFavouriteController = require('../controller/movieFavouriteController');

// Add Movie Favourite
movieFavouriteRouter.post(
  '/addfavourte',
  auth,
  movieFavouriteController.addMovieFavourtie
);

// Get Movies Favourite
movieFavouriteRouter.get(
  '/yourfavourite',
  auth,
  movieFavouriteController.getMovieAllFavourite
);

// Get Movie Favourite
movieFavouriteRouter.get(
  '/yourfavourite/:id',
  auth,
  movieFavouriteController.getMovieFavourite
);

// Delete movie
movieFavouriteRouter.delete(
  '/yourfavourite/:id',
  auth,
  movieFavouriteController.removeMovieFavourite
);

module.exports = movieFavouriteRouter;
