const express = require('express');
const movieRouter = new express.Router();

const auth = require('../middleware/auth');
const movieController = require('../controller/movieController');

// nhớ thêm auth sau này

// Get All Trending Movie
movieRouter.get('/movies/:category', movieController.movieCategory);

// Get movie
movieRouter.get('/movie/:category', movieController.movie);
module.exports = movieRouter;
