const con = require('../database/db');
const fs = require('fs').promises;
const path = require('path');


 const updateBookData = async(bname, desc, img, id)=>{
    const getImageName = "SELECT imgName FROM books WHERE id = ?";
    const query = "UPDATE books SET bookname = ?, description = ?, imgName = ?  WHERE id = ?;";
    try {
        const resRow = await con(getImageName, [id]);
        const {imgName} = resRow[0];
        const imagePath = path.join(__dirname, '../../public/images/', imgName);
        await fs.unlink(imagePath);
        await con(query, [bname, desc, img, id]);

    } catch (error) {
        console.log('There was an error updating a book\'s data ',error);
        res.status(500).send('There was an error updating a book\'s data ', error);
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
 const updateItemQuantity = async( quantity, id)=>{
    const query = "UPDATE cart SET quantity = ?  WHERE id = ?;";
    try {
        await con(query, [quantity, id]);
        
    } catch (error) {
        console.log('There was an error updating an item\'s quantity ',error);
        res.status(500).send('There was an error updating an item\'s quantity ', error);
    }
}

module.exports = {
    updateBookData,
    updateUserData,
    updateItemQuantity
}