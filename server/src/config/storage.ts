import multer from "multer";
import path from "path";


const storage = multer.diskStorage({

      destination: (req, file, cb) => {
        cb(null, 'src/public/pdf'); 
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },

});

export default multer({ storage });
