const queryRow = require('../db/db');

const movieController = {
  movieCategory: async (req, res) => {
    const category = req.params.category;
    try {
      const sql = `SELECT * FROM movie WHERE category = ?`;
      const movies = await queryRow(sql, category);
      res.status(201).send(movies);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  movie: async (req, res) => {
    try {
      const category = req.params.category;
      const id_movie = req.query.id;
      // In-band SQLI
      const sql = `SELECT * FROM movie WHERE category = '${category}' AND id_movie = '${id_movie}'`;
      const movie = await queryRow(sql);

      // const sql = `SELECT * FROM movie WHERE category = ? AND id_movie = ?`;
      // const movie = await queryRow(sql, [category, id_movie]);
      res.status(201).send(movie);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
};

module.exports = movieController;
