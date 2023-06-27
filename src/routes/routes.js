const express = require('express');
const router = express.Router();
const multer = require('multer');

const authMiddleware = require('../middlewares/auth.middleware');
const preStoreHelper = require('../helpers/imgNameFormater.helper');
const createController = require('../controllers/create.controller');
const authController = require('../controllers/auth.controller');
const deleteBookController = require('../controllers/delete.controller');

const upload = multer({ storage: preStoreHelper.store });

router.post('/register', authMiddleware, createController.fillUser);
router.post('/login', authController.login);
router.delete('/delete-product', authMiddleware, deleteBookController.deleteBook);
router.post('/store', [authMiddleware, upload.single('img')], 
    (req, res)=>{
        createController.store(req, res);
        return res.status(200).json({ message: 'Book added successfully' });
    
    }
);

module.exports = router;