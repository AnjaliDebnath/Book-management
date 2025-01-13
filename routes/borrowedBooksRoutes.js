const express = require('express');
const router = express.Router();
const BorrowedBook = require('../models/borrowedBooks');

router.get('/borrow-records', async (req, res) => {
    try {
        // Fetch all borrow records, populating user and book details
        const borrowRecords = await BorrowedBook.find()
            .populate('book', 'title price genre publicationYear') // Populate book details
            .populate('user', 'name email'); // Populate user details

        res.status(200).json(borrowRecords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

module.exports = router;