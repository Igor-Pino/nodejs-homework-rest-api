const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts');

const {auth} = require('../../middlewares');


router.get("/", auth, ctrl.getAllContacts)

router.get("/:id", ctrl.getContactById);

router.post("/", auth, ctrl.addContact);

router.put("/:id", ctrl.updateContactById);

router.patch("/:id/favorite", ctrl.patchContactById);

router.delete("/:id", ctrl.removeContactById);



module.exports = router
