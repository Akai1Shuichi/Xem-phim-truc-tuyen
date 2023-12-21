const express = require('express');
const movieFavouriteRouter = new express.Router();

const auth = require('../middleware/auth');
const movieFavouriteController = require('../controller/movieFavouriteController');

// Add Movie Favourite
movieFavouriteRouter.post(
  '/yourFavourite',
  auth,
  movieFavouriteController.addMovieFavourtie
);

// Get Movies Favourite
movieFavouriteRouter.get(
  '/yourFavourite',
  auth,
  movieFavouriteController.getMovieAllFavourite
);

// Get Movie Favourite
movieFavouriteRouter.get(
  '/yourFavourite/:id_movie',
  auth,
  movieFavouriteController.getMovieFavourite
);

// Update Movie Favourite
movieFavouriteRouter.patch(
  '/yourFavourite/:id',
  auth,
  movieFavouriteController.updateMovieFavourite
);

// Delete movie
movieFavouriteRouter.delete(
  '/yourFavourite/:id',
  auth,
  movieFavouriteController.removeMovieFavourite
);

module.exports = movieFavouriteRouter;
