const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/assets/img/profile/')
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        callback(null, `${uuidv4()}.${ext}` )
    }
});

const isImage = (req,file,callback) => {
    if(file.mimetype.startsWith('image')){
        callback(null, true);
    } else {
        callback(new Error('Only image type files are allowed'));
    }
}
const upload = multer({
    storage: multerConfig,
    fileFilter: isImage,
    limits: {fileSize: 6000000}
});
 
module.exports = upload.single('picture');