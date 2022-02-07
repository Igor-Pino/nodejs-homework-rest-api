const express = require('express');

const router = express.Router()

const {auth} = require('../../middlewares')

const ctrl = require('../../controllers/auth')

router.post('/signup', ctrl.register);

router.post('/login', ctrl.login);

router.get('/current', auth, ctrl.getCurrent);

router.get('/logout', auth, ctrl.logout); 

router.patch("/:id/subscription", ctrl.patchUser);

module.exports = router