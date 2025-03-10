const Book = require('../models/booksModels');

const booksController = {
    getBooks: async (req, res) => {
        try {
            const books = await Book.find();
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Books retrieved successfully',
                count: books.length,
                data: books
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: 'Server error',
                error: err.message
            });
        }
    },

    addBooks: async (req, res) => {
        try {
            const { title, author, price, stock } = req.body;

            if (!title || !author || price === undefined || stock === undefined) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: 'Title, author, price, and stock are required',
                    data: null
                });
            }


            if (typeof price !== 'number' || price <= 0) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: 'Price must be a positive number',
                    data: null
                });
            }
            if (typeof stock !== 'number' || stock < 0) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: 'Stock must be a non-negative number',
                    data: null
                });
            }

            const newBook = new Book({ title, author, price, stock });
            await newBook.save();

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Book added successfully',
                data: newBook
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: 'Server error',
                error: err.message
            });
        }
    },


    getBooksByAuthor: async (req, res) => {
        try {
            const {author} = req.body;
            if(!author){
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: 'Author is required',
                    data: null
                });
            }
            const books = await Book.find({author});
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Books retrieved successfully',
                count: books.length,
                data: books
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: 'Server error',
                error: err.message
            });
        }
    },
};

module.exports = booksController;
