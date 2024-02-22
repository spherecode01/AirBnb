// middleware.js
import multer from 'multer';
import fs from 'fs';
import imageDownloader from 'image-downloader';

export const photoMiddleware = multer({ dest: 'uploads/' });

export const handleUpload = async (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads/', ''));
  }

  res.json(uploadedFiles);
  
};

export const handleLinkUpload = async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  
  try {
    await imageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json({ error: 'Failed to download image' });
  }
};
