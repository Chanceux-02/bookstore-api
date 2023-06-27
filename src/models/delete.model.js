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

module.exports = {
    deleteBook
}