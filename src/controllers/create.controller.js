const createModel = require('../models/create.model');
const storeModel = require('../models/store.model');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const fs = require('fs');

const fillUser = async(req, res)=>{
    
    try {
        await Promise.all([
            body('fullname').notEmpty().withMessage('Fullname is required!').exists().trim().escape().run(req),
            body('email').notEmpty().exists().trim().isEmail().normalizeEmail().withMessage('Invalid Email!').run(req),
            body('password').notEmpty().exists().isLength({min: 3}).run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('There was an error in inputs');
            return res.status(400).json({ errors: errors.array() });
        }

        const {fullname, email, password} = req.body;
        const saltRound = 10;
        const hash = await bcrypt.hash(password, saltRound);
        await createModel.createUser(fullname, email, hash);
        res.status(200).send('User created successfuly!');
    } catch (error) {
        res.status(500).send('There was an error for creating user in the proceess');
    }

}

const store = async(req, res)=>{
    try {
        await Promise.all([
            body('bookname').notEmpty().withMessage('Fullname is required!').exists().trim().escape().run(req),
            body('desc').notEmpty().withMessage('Fullname is required!').exists().trim().escape().run(req),
        ]);

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('There was an error in inputs');
            return res.status(400).json({ errors: errors.array() });
        }

        const {bookname, desc} = req.body;
        const {filename} = req.file;
        await storeModel.storeBook(bookname, desc, filename);

        const filePath = 'public/images/' + req.file.filename;
        const fileData = fs.readFileSync(req.file.path);
    
        fs.writeFileSync(filePath, fileData);
        fs.unlinkSync(req.file.path);

    } catch (error) {
        res.status(500).send('There was an error for creating user in the proceess');
    }

}

const addToCartProcess = async (req, res)=>{
    try {
        await Promise.all([
            body('book_id').notEmpty().withMessage('Book id is required!').run(req),
            body('u_id').notEmpty().withMessage('User\'s id is required!').run(req),
            body('quantity').notEmpty().withMessage('Quantity is required!').run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('There was an error in inputs');
            return res.status(400).json({ errors: errors.array() });
        }
        
        const {book_id} = req.body;
        const {u_id} = req.body;
        const {quantity} = req.body;

        await storeModel.addToCart(book_id, u_id, quantity);
        res.status(200).send('Added to cart successfuly!');
    } catch (error) {
        console.log('There was an error adding to cart in the process')
        res.status(500).send('There was an error adding to cart in the process', error)
    }
}

const placeOrderProcess = async (req, res)=>{
    try {
        await body('itme_id').notEmpty().withMessage('Quantity is required!').run(req)

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('There was an error in inputs');
            return res.status(400).json({ errors: errors.array() });
        }
        console.log(req.body)
        const {itme_id} = req.body;
        await storeModel.placeOrder(itme_id);
        res.status(200).send('Place order successfuly!')
    } catch (error) {
        res.status(500).send('There was an error placing order in the process')
    }
}

module.exports = {
    fillUser,
    store,
    addToCartProcess,
    placeOrderProcess
}