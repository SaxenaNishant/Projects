const express = require("express");
const { login, logout, signUp } = require("../controllers.js/user.controllers");
const router = express.Router();


router.post("/signup", signUp);
router.post("/login", login)
router.post("/logout", logout)


module.exports = { userRoutes: router }