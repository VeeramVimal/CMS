const express = require("express");
const { authController } = require("../Controllers");
const upload = require("../Config/multer")
const router = express.Router();

// users authendication 
router.post('/customer/login', authController.authLogIn);

//admin authendication
router.post('/Admin/login', authController.authAdminLogIn);

module.exports = router;
