const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User= require("../models/user");
const BorrowedBook= require("../models/borrowedBooks");
const Book= require("../models/books");


//post request for user
router.post('/', async (req, res) => {
    
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "user added successfully" });
    }
});



//get call for users 
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        .populate('borrowedBooks', "title price genre publicationYear");

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to add a borrowed book to a user
router.post('/:id/borrow', async (req, res) => {
      
    try {
        const {bookId}= req.body;
        const userId = req.params.id;
        // console.log(bookId, userId);
       
        if(!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(404).json({ message:"book id not found"});
        }
        
        const user= await User.findById(userId);
        if(!user){
            return res.status(404).json({ message:"user not found"});
        }

        const book= await Book.findById(bookId);
        if(!book){
            return res.status(404).json({ message:"book not found"});
        }

        const isBorrowed = await BorrowedBook.findOne({ book: bookId, returnDate: null });
        if (isBorrowed) {
            return res.status(400).json({ message: "Book is already borrowed" });
        }

        const borrowRecord=new BorrowedBook({
            book: bookId,
            user: userId,
            dateIssued: Date.now(),
        });
        await borrowRecord.save();

        res.status(200).json({message: "Book borrowed successfully", borrowRecord: borrowRecord});

    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
});


router.post('/:id/return', async (req, res) => {
    try {
        const {bookId}= req.body;
        const userId = req.params.id;


        const book= await Book.findById(bookId);
       
       if (!book) {
        return res.status(400).json({ message: " book not found" });
      }

      const user= await User.findById(userId);
      if(!user){
        return res.status(404).json({ message:"user not found"});
      }

      const borrowedBook= await BorrowedBook.findOne({
        user:userId,
        book: bookId,
        returnDate: null
      });
      if(!borrowedBook){
        return res.status(404).json({ message:"book not borrowed by the user"});
      }

      
      await BorrowedBook.findByIdAndUpdate(bookId,{returnDate:new Date(Date.now())});

      await Book.findByIdAndUpdate(bookId, { assignedTo: null });

    res.status(200).json({
      message: "Book returned successfully",
      borrowedBook,
    });


    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 

