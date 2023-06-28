const updateModel = require('../models/edit.model');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
// 

const updateUserProcess = async (req, res)=>{
    try{
        await  Promise.all([
            body('fullname').notEmpty().withMessage('Fullname is required!').exists().trim().escape().run(req),
            body('email').notEmpty().exists().trim().isEmail().normalizeEmail().withMessage('Invalid Email!').run(req),
            body('password').notEmpty().exists().isLength({min: 3}).run(req),
            body('id').notEmpty().withMessage('User\'s id is missing!').run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('There was an error for validating user\'s data');
            return res.status(400).json({ errors: errors.array() });
        }

        const {fullname} = req.body;
        const {email} = req.body;
        const {password} = req.body;
        const {id} = req.body;

        const saltRound = 10;
        const hash = await bcrypt.hash(password, saltRound);

        console.log(fullname, email, hash, id);
        await updateModel.updateUserData(fullname, email, hash, id);
        return res.status(200).json({ message: 'User\'s data updated successfuly!' });

    }catch(err){
        res.status(500).send('There was an error for updating user\'s data in the proceess');
    }
}
const updateBookProcess = async (req, res)=>{
    try{
        await  Promise.all([
            body('bname').notEmpty().withMessage('Fullname is required!').exists().trim().escape().run(req),
            body('desc').notEmpty().withMessage('Fullname is required!').exists().trim().escape().run(req),
            body('id').notEmpty().withMessage('User\'s id is missing!').run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('There was an error for validating user\'s data');
            return res.status(400).json({ errors: errors.array() });
        }

        const {filename} = req.file;
        const {bname} = req.body;
        const {desc} = req.body;
        const {id} = req.body;

        const filePath = 'public/images/' + req.file.filename;
        const fileData = fs.readFileSync(req.file.path);
        
        fs.writeFileSync(filePath, fileData);
        fs.unlinkSync(req.file.path);

        console.log(bname, desc, filename, id);
        await updateModel.updateBookData(bname, desc, filename, id);
        // return res.status(200).json({ message: 'Book\'s data updated successfuly!' });

    }catch(err){
        res.status(500).send('There was an error for updating book\'s data in the proceess');
    }
}

module.exports = {
    updateUserProcess,
    updateBookProcess
}