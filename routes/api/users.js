const express = require('express');

const router = express.Router()

const {auth} = require('../../middlewares')

const ctrl = require('../../controllers/users')

router.get('/current', auth, ctrl.getCurrent);

router.get('/logout', auth, ctrl.logout); 




module.exports = router