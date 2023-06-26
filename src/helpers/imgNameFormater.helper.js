const multer = require('multer');

const store = multer.diskStorage({
        // storage: function (req, file, cb) {
        // cb(null, 'public/images'); 
        // },
        filename: function (req, file, cb) {
            const {originalname} = file;
            const formatName = originalname.toLowerCase().replace(/\s+/g, '-');
            const currentDate = new Date();
            const finalName= currentDate.getTime() +'-'+ formatName;
        cb(null, finalName); 
        },
    });


module.exports = {
    store
}