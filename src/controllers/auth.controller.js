const model = require('../models/auth.model');
const { body, validationResult } = require('express-validator');

const login = async (req, res)=>{
    try{
        await Promise.all([
            body('email').notEmpty().exists().trim().isEmail().normalizeEmail().withMessage('Invalid Email!').run(req),
            body('password').notEmpty().exists().isLength({min: 3}).run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('There was an error!');
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;
        const loginResult = await model.loginUser(email, password);

        if (!loginResult.success) {
            return res.status(401).json({ message: loginResult.message });
        } else {
            return res.status(200).json({ token: loginResult.token, refreshToken:loginResult.refreshToken});
        }
        
    }catch(err){
        throw err;
    }
}

module.exports = {
    login
}