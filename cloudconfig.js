// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET,

// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'StayHaven_dev', // Folder to store images in Cloudinary
//         format: async (req, file) => {
//           const allowedFormats = ['jpg', 'jpeg', 'png'];
//           const fileFormat = file.mimetype.split('/')[1]; // Extract file type (e.g., 'jpg', 'png')
    
//           // Check if the file format is allowed
//           if (allowedFormats.includes(fileFormat)) {
//             return fileFormat; // Return allowed file format
//           } else {
//             throw new Error('Invalid file type'); // Throw error for unsupported file formats
//           }
//         },
//         public_id: (req, file) => file.originalname, // Use original file name for public ID
//       },
//     });

//   module.exports = {
//     cloudinary,
//     storage
//   }
// cloudconfig.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
console.log('Cloudinary config:', cloudinary.config());
// Set up Cloudinary Storage with Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'StayHaven_dev',
    format: async (req, file) => {
      const allowedFormats = ['jpg', 'jpeg', 'png']; // Allowed image formats
      const fileFormat = file.mimetype.split('/')[1];
      if (allowedFormats.includes(fileFormat)) {
        return fileFormat;
      } else {
        throw new Error('Invalid file type');
      }
    },
    public_id: (req, file) => file.originalname, // Use original filename as the public_id
  },
});

module.exports = storage;
