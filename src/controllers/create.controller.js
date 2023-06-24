const model = require('../models/create.model');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

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
        await model.createUser(fullname, email, hash);
        res.status(200).send('User created successfuly!');
    } catch (error) {
        res.status(500).send('There was an error for creating user in the proceess');
    }

}

const store = async(req, res)=>{
    
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
        await model.createUser(fullname, email, hash);
        res.status(200).send('User created successfuly!');
    } catch (error) {
        res.status(500).send('There was an error for creating user in the proceess');
    }

}

module.exports = {
    fillUser,
    store
}