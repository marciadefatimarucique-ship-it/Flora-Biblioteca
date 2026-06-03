<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
=======
const express = require("express")
const router = express.Router()

const {
  register,
  login
} = require("../controllers/authController")

router.post("/register", register)

router.post("/login", login)

module.exports = router
>>>>>>> cd4434f4efb6a48be7c5eb8713229f3d55739bca
