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
const editController = require('../controllers/edit.controller');

const upload = multer({ storage: preStoreHelper.store });

router.get('/all-books', authMiddleware, getModel.fetchBooks);
router.get('/all-users', authMiddleware, getModel.fetchUsers);
router.get('/single-book/:id', authMiddleware, getController.singleBook);
router.get('/single-user/:id', authMiddleware, getController.singleUser);
router.get('/fetch-single-cart/:uId/:bookId', authMiddleware, getController.fetchCartProcess);
router.get('/fetch-user-cart/:uId', authMiddleware, getController.fetchUserAddedCartsProcess);

router.delete('/delete-product', authMiddleware, deleteBookController.deleteBook);
router.delete('/delete-user', authMiddleware, deleteBookController.deleteUser);
router.delete('/remove-to-cart', authMiddleware, deleteBookController.removeToCartProcess);

router.patch('/edit-quantity', authMiddleware, editController.editQuantityProcess);
router.put('/edit-user', authMiddleware, editController.updateUserProcess);
router.put('/edit-book', [authMiddleware, upload.single('img')], (req, res)=>{
        editController.updateBookProcess(req, res);
        return res.status(200).json({ message: 'Book updated successfully' });
});

router.post('/register', createController.fillUser);
router.post('/login', authController.login);
router.post('/place-order', authMiddleware, createController.placeOrderProcess);
router.post('/add-to-cart', authMiddleware, createController.addToCartProcess);
router.post('/store', [authMiddleware, upload.single('img')], (req, res)=>{
        createController.store(req, res);
        return res.status(200).json({ message: 'Book added successfully' });
    }
);

module.exports = router;