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

module.exports = {
    deleteBook
}