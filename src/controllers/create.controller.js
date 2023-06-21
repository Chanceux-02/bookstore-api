const model = require('../models/create.model');
const bcrypt = require('bcrypt');

const fillUser = async(req, res)=>{
    const {fullname} = req.body;
    const {email} = req.body;
    const {password} = req.body;
    const saltRound = 10;

    try {
        const hash = await bcrypt.hash(password, saltRound);
        try {
            await model.createUser(fullname, email, hash);
            res.status(200).send('User created successfuly!');
        } catch (error) {
            res.status(500).send('There was an error for creating user in the proceess');
        }

      } catch (error) {
        console.error('There was an error for hashing password:', error);
      }
      
}

module.exports = {
    fillUser
}