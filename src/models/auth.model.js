const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const con = require('../database/db');

 const loginUser = async(email, password, res)=>{
    const query = "SELECT * FROM users WHERE email = ?;";
    try {
        const rows = await con(query, [email]);
        console.log(rows.length);
        if(rows.length === 0){
            console.log('No such User');
            return { success: false, message: 'Invalid username or password' };
        }

        const users = rows[0];
        const isPasswordValid = await bcrypt.compare(password, users.password);
        if(!isPasswordValid){
            console.log('Log in failed');
            return { success: false, message: 'Invalid username or password' };
        }

        const token = jwt.sign({userId: users.id}, process.env.KEY, {expiresIn: '7d'});
        // const refreshToken = jwt.sign({userId: users.id}, process.env.REFRESH_KEY, {expiresIn: '7d'});
        console.log('Log in successfully')
        return { success: true, token};

    } catch (error) {
        console.log('There was an error for logging in');
        return { success: false, message: 'There was an error for logging in'};
    }
}

module.exports = {
    loginUser
}