const mongoose = require('mongoose');
const AuthorSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        
    },
    nationality:{
        type:String,
    },
    books:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        default:[]
    }]
});

module.exports = mongoose.model("Author", AuthorSchema);