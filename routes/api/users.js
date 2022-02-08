const express = require('express');

const router = express.Router()

const {auth} = require('../../middlewares')

const ctrl = require('../../controllers/auth')

const {v4} = require ('uuid')

const fs = require('fs/promises')
const multer = require('multer')
const path = require('path');
const tempDir = path.join(__dirname, '../../temp')
const avatarDir = path.join(__dirname, '../../public','avatars')
const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename:(req, file, cb) => {
       cb(null, file.originalname);
    }
  })
  
  const upload = multer ({
    storage: multerConfig
  })

  const avatars = []

router.post('/signup', ctrl.register);

router.post('/login', ctrl.login);

router.get('/current', auth, ctrl.getCurrent);

router.get('/logout', auth, ctrl.logout); 

router.patch("/:id/subscription", ctrl.patchUser);

router.post('/avatars', upload.single('image'), async(req, res, next)=> {
   
    try {
       
        const {path: tempUpload, filename} = req.file;
       
        const resultUpload = path.join(avatarDir, filename)
      
        await fs.rename(tempUpload, resultUpload)
        const image = path.join('avatars', filename)
        const newAvatar = {...req.body, id:v4(), image}
        avatars.push(newAvatar)
        res.status(201).json(newAvatar)

    } catch (error) {
        await fs.unlink(tempUpload)
    }
  })


  router.get('/avatars', async(req, res, next) => {
        try {
    
            res.json(avatars)



        } catch (error) {
    
    }
  });

module.exports = router