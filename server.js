const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('./database');

const express = require('express');
const mongodb= require('mongodb');


const app = express();
app.use(express.json());

const bookRoutes= require('./routes/bookRoutes');
app.use('/books', bookRoutes);


app.listen(process.env.PORT)
