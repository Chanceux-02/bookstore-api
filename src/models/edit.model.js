const con = require('../database/db');

 const updateBookData = async(id)=>{
    const query = "UPDATE `books` SET bookname description imgName  WHERE id = ?;";
    try {
        await con(query, [id]);
    } catch (error) {
        console.log('There was an error deleting a book data ',error);
        res.status(500).send('There was an error deleting a book data ', error);
    }
}
 const updateUserData = async(fname, email, pwd, id)=>{
    const query = "UPDATE users SET fullname = ?, email = ?, password = ?  WHERE id = ?;";
    try {
        await con(query, [fname, email, pwd, id]);
    } catch (error) {
        console.log('There was an error updating a user\'s data ',error);
        res.status(500).send('There was an error updating a user\'s data ', error);
    }
}

module.exports = {
    updateBookData,
    updateUserData
}