const mongoose = require('mongoose');

const borrowedBookSchema = new mongoose.Schema({
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateIssued:{
        type: Date,
        
    },
    dueDate:{
        type:Date,
        // default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
    },
    returnDate:{
        type: Date
    }
});

module.exports= mongoose.model("BorrowedBook", borrowedBookSchema);