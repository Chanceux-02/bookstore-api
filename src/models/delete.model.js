const con = require('../database/db');

 const deleteBook = async(id)=>{
    const query = "DELETE FROM `books` WHERE id = ?;";
    try {
        await con(query, [id]);
    } catch (error) {
        console.log('There was an error deleting a book data ',error);
        res.status(500).send('There was an error deleting a book data ', error);
    }
}
 const deleteUser = async(id)=>{
    const query = "DELETE FROM `users` WHERE id = ?;";
    try {
        await con(query, [id]);
    } catch (error) {
        console.log('There was an error deleting a user\'s data ',error);
        res.status(500).send('There was an error deleting a user\'s data ', error);
    }
}
 const removeToCart = async(u_id, b_id)=>{
    const query = "DELETE FROM `cart` WHERE u_id = ? AND book_id = ?;";
    try {
        await con(query, [u_id, b_id]);
    } catch (error) {
        console.log('There was an error deleting a user\'s data ',error);
        res.status(500).send('There was an error deleting a user\'s data ', error);
    }
}

module.exports = {
    deleteBook,
    deleteUser,
    removeToCart
}