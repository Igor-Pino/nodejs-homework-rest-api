const СreateError = require('http-errors');
const {User} = require('../../models');
const fs = require('fs/promises')
const path = require('path');
const avatarDir = path.join(__dirname, '../../public','avatars')
const tempDir = path.join(__dirname, '../../', 'temp');


const patchAvatar = async (req, res, next) => {
 
    try {
        if (!req.file) {
            throw new СreateError (400, 'No file to upload')            
          }
        const {path: tempDir, filename} = req.file; 
        const {_id} = req.user
        const [extension] = filename.split('.').reverse();
        const newFileName = `${_id}.${extension}`;
        const resultUpload = path.join(avatarDir, newFileName);  
        await fs.rename(tempDir, resultUpload);
    
        console.log("result upload: ", req.file)


        const avatarURL = path.join('avatars', newFileName);

        await User.findByIdAndUpdate(_id, {avatarURL});

  
        res.json({avatarURL})
        
    } catch (error) {
        next(error)
        await fs.unlink(tempDir)
    }
}

module.exports = patchAvatar