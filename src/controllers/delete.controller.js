const deleteBookModel = require('../models/delete.model');
const { body, validationResult } = require('express-validator');

const deleteBook = async (req, res)=>{
    try{
        await body('id').notEmpty().withMessage('Book id is missing!').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('There was an error passing an book id');
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.body;
        await deleteBookModel.deleteBook(id);
        return res.status(200).json({ message: 'Book data deleted successfully' });

    }catch(err){
        res.status(500).send('There was an error for deleting books in the proceess');
    }
}
const deleteUser = async (req, res)=>{
    try{
        await body('id').notEmpty().withMessage('Book id is missing!').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('There was an error passing an user\'s id');
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.body;
        await deleteBookModel.deleteUser(id);
        return res.status(200).json({ message: 'User data deleted successfully' });

    }catch(err){
        res.status(500).send('There was an error for deleting user\'s in the proceess');
    }
}

const removeToCartProcess = async (req, res)=>{
    try{
        await body('u_id').notEmpty().withMessage('User id is missing!').run(req);
        await body('book_id').notEmpty().withMessage('Book id is missing!').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('There was an error passing an user\'s id');
            return res.status(400).json({ errors: errors.array() });
        }

        const {u_id} = req.body;
        const {book_id} = req.body;
        await deleteBookModel.removeToCart(u_id, book_id);
        return res.status(200).json({ message: 'Cart data deleted successfully' });

    }catch(err){
        res.status(500).send('There was an error for deleting user\'s in the proceess');
    }
}

module.exports = {
    deleteBook,
    deleteUser,
    removeToCartProcess
}