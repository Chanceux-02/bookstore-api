const con = require('../database/db');

 const storeBook = async(bookname, desc, img)=>{
    const query = "INSERT INTO books (bookname, description, imgName) VALUES (?,?,?);";
    try {
        await con(query, [bookname, desc, img]);
    } catch (error) {
        res.status(500).send('There was an error in inserting books in database ', error);
    }
}
 const addToCart = async(b_id, u_id, quantity)=>{
    const query = "INSERT INTO cart (book_id, u_id, quantity) VALUES (?,?,?);";
    try {
        await con(query, [b_id, u_id, quantity]);
    } catch (error) {
        res.status(500).send('There was an error in adding to cart in database ', error);
    }
}
 const placeOrder = async(item_id)=>{
    const query = "INSERT INTO orders (item_id) VALUES (?);";
    try {
        await con(query, [item_id]);
    } catch (error) {
        res.status(500).send('There was an error in adding to cart in database ', error);
    }
}

module.exports = {
    storeBook,
    addToCart,
    placeOrder
}