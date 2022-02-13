const СreateError = require('http-errors');
const {User} = require('../../models');
const fs = require('fs/promises')
const path = require('path');
const { pathToFileURL } = require('url');
const {PORT=3000} = process.env

const avatarDir = path.join(__dirname, '../../public','avatars')
const tempDir = path.join(__dirname, '../../', 'temp');


const patchAvatar = async (req, res, next) => {
 
    try {
        if (!req.file) {
            throw new СreateError (400, 'No file uploaded or invalid file type')            
          }
        const {path: tempDir, filename} = req.file; 
        const {_id} = req.user
        const [extension] = filename.split('.').reverse();
        const newFileName = `${_id}.${extension}`;
        const resultUpload = path.join(avatarDir, newFileName);  
        await fs.rename(tempDir, resultUpload);       
        const avatarURL = path.join(`localhost:${PORT}/avatars`, newFileName)
        
        await User.findByIdAndUpdate(_id, {avatarURL});  
        res.json({avatarURL})
        
    } catch (error) {
        next(error)
        await fs.unlink(tempDir)
    }
}

module.exports = patchAvatar