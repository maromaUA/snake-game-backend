const express = require("express");
const {
    registrationSchema,
    loginSchema,
} = require("../../models/user")
const {validateBody} = require("../../middlewares/validateBody")
const {
    registration,
    login,
    logout,
    getCurrent
} = require("../../controllers/auth")

const authenticate = require("../../middlewares/authenticate");
const router = express.Router();

router.post("/register", validateBody(registrationSchema), registration)
router.post("/login", validateBody(loginSchema), login)
router.post("/logout", authenticate, logout)
router.get("/current", authenticate, getCurrent)

module.exports = router
