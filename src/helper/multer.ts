import path from 'path';
import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import fs from 'fs';

class FileOrganizer {
  private uploadPath: string;
  private uploader: multer.Multer;

  constructor() {


    // Tentukan folder penyimpanan
    this.uploadPath = path.join(__dirname, '../public/photos');

    // Pastikan folder penyimpanan ada, jika tidak buat
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }

    // Setup multer
    this.uploader = multer({
      limits: { fileSize: 800000 }, // Batas ukuran file
      storage: multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb) => {
          cb(null, this.uploadPath); // Set path penyimpanan
        },
        filename: (req: Request, file: Express.Multer.File, cb) => {
          const ext = path.extname(file.originalname);
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
          
          // Simpan path file dalam req.filePath
          const  imagePath : string = `public/photos/${uniqueName}`
          
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const allowedFileTypes = ["jpg", "jpeg", "png"];
        const fileType = file.mimetype.split("/")[1];
        if (allowedFileTypes.includes(fileType)) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type. Only jpg, jpeg, and png are allowed."));
        }
      },
    });
  }

  // Method untuk handle upload file single
  public single(fieldName: string) {
    return this.uploader.single(fieldName);
  }

  public static delete(name: string) {
    const filePath = path.join(__dirname, `../public/photos/${name}`);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error( "delete error ", err)
        return
      } else {
        console.log("success delete ", name)
      }
    
      //file removed
    })
  }
}

export default FileOrganizer;