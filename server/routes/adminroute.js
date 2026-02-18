const router = require("express").Router();
const c = require("../controllers/admincontroller");
const auth = require("../middlewares/authmiddleware");

router.post("/login", c.login);
router.get("/me", auth, c.me);
router.post("/logout", auth, c.logout);

module.exports = router;
