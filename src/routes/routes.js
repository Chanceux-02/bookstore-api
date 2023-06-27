const express = require('express');
const router = express.Router();
const multer = require('multer');

const getModel = require('../models/get.model');
const authMiddleware = require('../middlewares/auth.middleware');
const preStoreHelper = require('../helpers/imgNameFormater.helper');
const createController = require('../controllers/create.controller');
const authController = require('../controllers/auth.controller');
const deleteBookController = require('../controllers/delete.controller');
const getController = require('../controllers/get.controller');

const upload = multer({ storage: preStoreHelper.store });

router.get('/all-books', authMiddleware, getModel.fetchBooks);
router.get('/all-users', authMiddleware, getModel.fetchUsers);
router.get('/single-book/:id', authMiddleware, getController.singleBook);
router.get('/single-user/:id', authMiddleware, getController.singleUser);

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