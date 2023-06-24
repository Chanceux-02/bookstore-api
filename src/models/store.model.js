const con = require('../database/db');

 const storeBook = async(bookname, desc, img)=>{
    const query = "INSERT INTO books (bookname, description, imgName) VALUES (?,?,?);";
    try {
        await con(query, [bookname, desc, img]);
    } catch (error) {
        res.status(500).send('There was an error in inserting books in database ', error);
    }
}

module.exports = {
    storeBook
}