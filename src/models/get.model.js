const con = require('../database/db');

 const fetchSingleBook = async(id)=>{
    const query = "SELECT * FROM `books` WHERE id = ?;";
    try {
        const res = await con(query, [id]);
        return res;
    } catch (error) {
        res.status(500).send('There was an error for fetching sigle book ', error);
    }
}
 const fetchSingleUser = async(id)=>{
    const query = "SELECT * FROM `users` WHERE id = ?;";
    try {
        const res = await con(query, [id]);
        return res;
    } catch (error) {
        res.status(500).send('There was an error for fetching single user ', error);
    }
}
 const fetchBooks = async(req, res)=>{
    const query = "SELECT * FROM `books`;";
    try {
        const results = await con(query);
        res.status(200).json({results});
    } catch (error) {
        res.status(500).send('There was an error for fetching all books ', error);
    }
}
 const fetchUsers = async(req, res)=>{
    const query = "SELECT * FROM `users`;";
    try {
        const results = await con(query);
        res.status(200).json({results});
    } catch (error) {
        res.status(500).send('There was an error for fetching all users ', error);
    }
}
const fetchCart = async (u_id, book_id)=>{
    const query = "SELECT * FROM cart WHERE u_id = ? AND book_id = ?;";
    try {
        const results = await con(query, [u_id, book_id]);
        return results;
    } catch (error) {
        res.status(500).send('There was an error for fetching cart data ', error);
    }
}
const fetchUserAddedCarts = async (u_id)=>{
    const query = "SELECT * FROM cart WHERE u_id = ?;";
    try {
        const results = await con(query, [u_id]);
        return results;
    } catch (error) {
        res.status(500).send('There was an error for fetching cart data ', error);
    }
}

module.exports = {
    fetchSingleBook,
    fetchSingleUser,
    fetchBooks,
    fetchUsers,
    fetchCart,
    fetchUserAddedCarts

}