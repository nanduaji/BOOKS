const { getBooks, addBooks, getBooksByAuthor } = require('../controllers/booksController');
const authMiddleware = require('../middleware/authMiddleware');

const routes = require('express').Router();
routes.get('/getBooks', authMiddleware, getBooks);
routes.post('/getBooksByAuthor',authMiddleware,getBooksByAuthor);
routes.post('/addBooks', authMiddleware, addBooks);
module.exports = routes;