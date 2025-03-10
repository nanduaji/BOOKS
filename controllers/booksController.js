const books = [
    { title: '1984', author: 'George Orwell' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
];

const booksController = {
    getBooks: (req, res) => {
        try {
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Books retrieved successfully',
                count:books.length,
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

    addBooks: (req, res) => {
        try {
            const { title, author } = req.body;

            if (!title || !author) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: 'Title and author are required',
                    data: null
                });
            }

            const newBook = { title, author };
            books.push(newBook);

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Book added successfully',
                data: newBook
            });
        } catch (err) {
            res.status(500).json({
                statusCode: 500,
                message: 'Server error',
                error: err.message
            });
        }
    }
};

module.exports = booksController; 
