const router = require("express").Router();


const {
  jwtVerify,
  createUser,
  loginUser,
  logout
} = require('../controllers/authController')

router.route("/auth").get(jwtVerify);
router.route("/signup").post(createUser)
router.route("/login").post(loginUser)
//router.route("/logout").post(logout)


module.exports = router;
