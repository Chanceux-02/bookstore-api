const getModel = require('../models/get.model');

const singleBook =  async (req, res)=>{
   
    const {id} = req.params;
    
    const result = await getModel.fetchSingleBook(id);
    return res.status(200).json({ result });

}
const singleUser =  async (req, res)=>{
   
    const {id} = req.params;
    
    const result = await getModel.fetchSingleUser(id);
    return res.status(200).json({ result });

}
const fetchCartProcess =  async (req, res)=>{
   
    const {uId} = req.params;
    const {bookId} = req.params;   

    const result = await getModel.fetchCart(uId, bookId);
    return res.status(200).json({ result });
}
const fetchUserAddedCartsProcess =  async (req, res)=>{
   
    const {uId} = req.params;

    const result = await getModel.fetchUserAddedCarts(uId);
    return res.status(200).json({ result });
}

module.exports = {
    singleBook,
    singleUser,
    fetchCartProcess,
    fetchUserAddedCartsProcess
}