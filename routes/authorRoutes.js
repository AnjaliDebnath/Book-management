const express = require('express');
const router = express.Router();
const Author = require("../models/authors");

router.get("/", async(req,res)=>{
    try {
        const result = await Author.find().populate('books', "title price genre publicationYear");
        res.status(200).json(result);
    } catch(err) {
        res.json({message: "error in fetching authors"});
    }
})

router.post("/", async(req,res)=>{
    try {
        const { name, dateOfBirth ,nationality,books } = req.body;
        const newAuthor = new Author({name, dateOfBirth, nationality});
        const savedAuthor= await newAuthor.save();
        res.status(201).json({message: 'author added succesfully'});
    } catch(err) {
        res.json({message: "error in adding author"});
    }
}) 



router.get("/id/:id", async(req,res)=>{
    try {
        const authorId = req.params.id;
        // console.log(authorId);
        const author = await Author.findById(authorId).populate('books');
        res.status(200).json(author);
        console.log(author);
    } catch(err) {
        res.json({message: "error in fetching author id"})
    }
})



module.exports = router;