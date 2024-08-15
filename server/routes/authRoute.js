const express = require("express")
const { registerCtrl, loginCtrl,subscribe } = require("../controllers/authCtrl")
const { userRegister, userLogin } = require("../controllers/userCtrl")
const router = express.Router()


router.post("/login", loginCtrl)
router.post("/register", registerCtrl)
router.post("/subscribe", subscribe)


router.post("/userlogin", userLogin)
router.post("/userregister", userRegister)

module.exports = router