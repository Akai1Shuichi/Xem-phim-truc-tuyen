const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routers/user');
const movieFavouriteRouter = require('./routers/movieFavourtie');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(movieFavouriteRouter);

module.exports = app;
