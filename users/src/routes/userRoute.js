const router = require("express").Router();

const controller = require("../controllers/userController");
const tokenMiddleware = require("../middleware/tokenMiddleware");
const userMiddleware = require("../middleware/userMiddleware");

router.post("/signup", userMiddleware.register, controller.register);
router.post("/signin", userMiddleware.login, controller.signin);
router
    .route("/profile/:id")
    .put(tokenMiddleware.tokenAuth, userMiddleware.profileEdit, controller.updateUser)
    .delete(tokenMiddleware.tokenAuth, controller.deleteUser);

module.exports = router;