const con = require('../database/db');

 const createUser = async(fullname, email, password)=>{
    const query = "INSERT INTO users (fullname, email, password) VALUES (?,?,?);";
    try {
        await con(query, [fullname, email, password]);
    } catch (error) {
        console.log('There was an error in creating a new user ',error);
        res.status(500).send('There was an error in creating a new user ', error);
    }
}

module.exports = {
    createUser
}