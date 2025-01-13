const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('./database');

const express = require('express');
const mongodb= require('mongodb');


const app = express();
app.use(express.json());

const bookRoutes= require('./routes/bookRoutes');
app.use('/books', bookRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const authorRoutes = require('./routes/authorRoutes');
app.use('/authors', authorRoutes);

const borrowedBooksRoutes = require('./routes/borrowedBooksRoutes');
app.use('/borrow', borrowedBooksRoutes);




app.listen(process.env.PORT)
