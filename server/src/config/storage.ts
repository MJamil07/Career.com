import fs from "fs";
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(process.cwd(), "src/public/pdf");
    
    // Create the directory if it doesn't exist
    fs.mkdirSync(destinationPath, { recursive: true });

    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export default multer({ storage });
