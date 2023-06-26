const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const authMiddleware = require('../middlewares/auth.middleware');
const preStoreHelper = require('../helpers/imgNameFormater.helper');
const createController = require('../controllers/create.controller');
const authController = require('../controllers/auth.controller');

const upload = multer({ storage: preStoreHelper.store });

router.post('/register', authMiddleware, createController.fillUser);
router.post('/login', authController.login);
router.post('/store', [authMiddleware, upload.single('img')], 
    async (req, res)=>{
        try {

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
            await createController.store(req, res);
        
            const filePath = 'public/images/' + req.file.filename;
            const fileData = fs.readFileSync(req.file.path);
        
            fs.writeFileSync(filePath, fileData);
            fs.unlinkSync(req.file.path);
        
            return res.status(200).json({ message: 'Book added successfully' });

        } catch (error) {
        
        return res.status(500).json({ message: 'Error saving file' });
        }
    }
);

module.exports = router;