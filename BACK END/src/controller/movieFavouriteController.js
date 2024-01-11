const queryRow = require('../db/db');

const movieFavouriteController = {
  // add movie
  addMovieFavourtie: async (req, res) => {
    try {
      const movie = req.body;
      const sql = 'INSERT INTO movieInteractions SET ?';
      await queryRow(sql, movie);
      res
        .status(201)
        .send({ message: 'Add favourite movie successfully !!!', movie });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  // get movies all
  getMovieAllFavourite: async (req, res) => {
    try {
      const sql = `SELECT movie.*
        FROM movieInteractions
        INNER JOIN movie ON movieInteractions.id_movie = movie.id where movieInteractions.id_user = ? AND movieInteractions.love = 1
        `;
      let movies = await queryRow(sql, [req.user.id]);

      if (!movies) {
        movies = [];
      } else if (typeof movies == 'object' && !Array.isArray(movies)) {
        movies = [movies];
      }
      res.status(201).send(movies);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
  //  get movie
  getMovieFavourite: async (req, res) => {
    try {
      // /* Phòng chống tấn công BLIND SQL INJECTION */

      // const sql = `SELECT movieInteractions.*, movie.id_movie, movie.id
      //   FROM movieInteractions
      //   INNER JOIN movie ON movieInteractions.id_movie = movie.id WHERE movieInteractions.id_user = ? AND movieInteractions.love = 1 AND movie.id_movie = ? LIMIT 1`;
      // const movie = await queryRow(sql, [req.user.id, req.params.id_movie]);

      /* tấn công BLIND SQL INJECTION */
      const sql = `SELECT movieInteractions.*, movie.id_movie, movie.id
      FROM movieInteractions
      INNER JOIN movie ON movieInteractions.id_movie = movie.id WHERE movieInteractions.id_user = '${req.user.id}' AND movieInteractions.love = 1 AND movie.id_movie = '${req.user.id}' LIMIT 1`;
      const movie = await queryRow(sql);

      if (!movie) {
        res.status(404).send({ message: 'Khong tim thay movie !!!' });
      }
      res.status(201).send(movie);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  updateMovieFavourite: async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['love'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    try {
      if (!isValidOperation) {
        throw new Error('Invalid updates!');
      }
      const movieId = req.params.id;
      const sql =
        'UPDATE movieInteractions SET ? WHERE id_user = ? AND id_movie = ?';
      await queryRow(sql, [req.body, req.user.id, movieId]);
      res.status(201).send({ message: 'Update Successfully!!!' });
    } catch (e) {
      res.status(500).send({ message: e.message });
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
      res.status(500).send({ message: e.message });
    }
  },
};

module.exports = movieFavouriteController;
