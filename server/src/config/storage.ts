import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname)
    cb(null, path.join(__dirname , 'server/src/public/pdf') );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export default multer({ storage });
