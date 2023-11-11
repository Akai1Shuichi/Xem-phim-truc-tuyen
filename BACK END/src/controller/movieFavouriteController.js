const queryRow = require('../db/db');

const movieFavouriteController = {
  // add movie
  addMovieFavourtie: async (req, res) => {
    try {
      const movie = req.body;
      const sql = 'INSERT INTO movie SET ?';
      await queryRow(sql, movie);
      res
        .status(201)
        .send({ message: 'Add favourite movie successfully !!!', movie });
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  },

  // get movies all
  getMovieAllFavourite: async (req, res) => {
    try {
      let movies = await queryRow('SELECT * FROM movie');

      if (!movies) {
        movies = [];
      } else if (typeof movies == 'object' && !Array.isArray(movies)) {
        movies = [movies];
      }
      res.status(201).send(movies);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  },
  //  get movie
  getMovieFavourite: async (req, res) => {
    try {
      const movie = await queryRow(
        'SELECT * FROM movie WHERE id_movie = ?',
        `${req.params.id}`
      );

      if (!movie) {
        res.status(404).send({ message: 'Khong tim thay movie !!!' });
      }
      res.status(201).send(movie);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  },

  // delete movie
  removeMovieFavourite: async (req, res) => {
    const movieId = req.params.id;
    try {
      const sql = 'DELETE FROM movie WHERE id_movie = ?';
      await queryRow(sql, movieId);
      res.status(201).send({ message: 'Delete successfully !!!' });
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  },
};

module.exports = movieFavouriteController;
