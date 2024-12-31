const mongoose = require('mongoose');

const bookSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        default:Date.now(),
    },
    genre: {
        type: String,
    },
    price:{
        type: Number,
        
    }
})

const Book=mongoose.model('Book', bookSchema);

module.exports = Book;