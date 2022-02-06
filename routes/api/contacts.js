const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts');

const {auth} = require('../../middlewares');


router.get("/", auth, ctrl.getAllContacts)

router.get("/:id", auth, ctrl.getContactById);

router.post("/", auth, ctrl.addContact);

router.put("/:id", auth, ctrl.updateContactById);

router.patch("/:id/favorite", auth, ctrl.patchContactById);

router.delete("/:id", auth, ctrl.removeContactById);



module.exports = router
