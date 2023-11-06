const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routers/user');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);

module.exports = app;
