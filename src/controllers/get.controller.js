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

module.exports = {
    singleBook,
    singleUser
}