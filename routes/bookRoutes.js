const express = require('express');
const router = express.Router();
const Book= require("../models/books");
const Author= require("../models/authors");

//create a new book
router.post('/', async(req,res)=>{
   try{
        const book = new Book(req.body);
        let author = await Author.findOne({name:book.author});
        if(!author){
            author = new Author({name:book.author, books:[book._id],});
            await author.save();
        }
        else{
            await Author.findOneAndUpdate({name:book.author},  {$addToSet:{book:book._id}}, {new:true})
        }
        const result= await book.save();
        res.status(201).json(result);
   }
   catch(err){
        console.error(err.message);
        res.json({message: err.message})
   }
});

//get all books
router.get('/', async(req,res)=>{
    try{
        const books= await Book.find().populate('assignedTo', 'name email -_id');
        res.json(books)
    }
    catch(err){
        res.json({message:err})
    }    
});


//get a book by id
router.get("/id/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Book.findOne({_id: id}); 
        res.json(book);
        console.log(book);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Unable to fetch book" });
    }
});

  
  // get a Book by title
  router.get("/title/:title", async (req, res) => {
    const paramsTitle = req.params.title;

    try {
        const book = await Book.findOne({ title: paramsTitle }); 
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Unable to fetch book" });
    }
});

  
  // update a Book by Title
  router.put("/:title", async (req, res) => {
    const Title = req.params.title;
    const { title, description, price, author } = req.body;

    try {
        const book = await Book.findOneAndUpdate(
            { title: Title },
            { title, description, price, author },
            { new: true } 
        );

        res.json({
            message: "Book updated successfully",
            updatedBook: book,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Unable to update" });
    }
});

  
  // delete a Book by Title
  router.delete("/:title", async (req, res) => {
    const Title = req.params.title;

    try {
        const book = await Book.findOneAndDelete({ title: Title });
        res.json({
            message: "Book deleted successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Unable to delete" });
    }
});

  
  // search for Books by Genre (Optional)
  router.get("/genre/:genre", async (req, res) => {
    const genre = req.params.genre;

    try {
        const books = await Book.find({ genre });
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Unable to fetch books" });
    }
});

  
 

  




module.exports= router;