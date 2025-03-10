const { getBooks, addBooks, getBooksByAuthor, updateBooks, deleteBooks, getBooksByPrice } = require('../controllers/booksController');
const authMiddleware = require('../middleware/authMiddleware');

const routes = require('express').Router();
routes.get('/getBooks', authMiddleware, getBooks);
routes.post('/getBooksByAuthor',authMiddleware,getBooksByAuthor);
routes.post('/addBooks', authMiddleware, addBooks);
routes.post('/updateBooks',authMiddleware,updateBooks);
routes.post('/deleteBooks',authMiddleware,deleteBooks);
routes.get('/getBooksByPrice',authMiddleware,getBooksByPrice);
module.exports = routes;