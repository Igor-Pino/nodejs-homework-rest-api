const express = require('express');
const router = express.Router()
const {auth, upload, resizeAvatar} = require('../../middlewares')
const ctrl = require('../../controllers/auth')

router.post('/signup', ctrl.register);

router.post('/login', ctrl.login);

router.get('/current', auth, ctrl.getCurrent);

router.get('/logout', auth, ctrl.logout); 

router.patch("/:id/subscription", ctrl.patchUser);

router.patch('/avatars', auth, upload.single('avatar'), resizeAvatar, ctrl.patchAvatar)

module.exports = router