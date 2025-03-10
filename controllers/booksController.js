const Book = require('../models/booksModels');

const booksController = {
    // Get All Books
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
    // Add Books
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
    // Get Books By Author
    getBooksByAuthor: async (req, res) => {
        try {
            const { author } = req.body;
            if (!author) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: 'Author is required',
                    data: null
                });
            }
            const books = await Book.find({ author });
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
    // Update Books By Title (Price and Stock)
    updateBooks: async (req, res) => {
        try {
            const { price, stock, title } = req.body;
            if (!price) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: 'Price is required',
                    data: null
                });
            }
            if (!stock) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: 'Stock is required',
                    data: null
                });
            }
            if (!title) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: 'Title is required',
                    data: null
                });
            }
            const updatedBook = await Book.findOneAndUpdate(
                { title: title },
                { $set: { price: price, stock: stock } },
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Books retrieved successfully',
                count: updatedBook.length,
                data: updatedBook
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
    // Delete Book By Title 
    deleteBooks: async (req, res) => {
        try {
            const { title } = req.body;
            if (!title) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: 'Title is required',
                    data: null
                });
            }
            const deletedbook = await Book.findOneAndDelete(
                { title: title }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Book deleted successfully',
                count: deletedbook.length,
                data: deletedbook
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
    // Querying books with a price range priced between $10 and $20
    getBooksByPrice: async (req, res) => {
        try {
            const books = await Book.find({
                price: { $gte: 10, $lte: 20 }
            });
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
    // Counting the number of Books in the collection
    getCountOfBooks: async (req, res) => {
        try {
            const books = await Book.find();
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Books count retrieved successfully',
                count: books.length,
                // data: books
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
    // Sort Books by price ascending order
    sortBooksbyPrice: async (req, res) => {
        try {
            const books = await Book.find().sort({ price: 1 });
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Books sorted successfully',
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
