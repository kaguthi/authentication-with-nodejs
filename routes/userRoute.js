const express = require('express');
const {getUsers, createUser, loginUser, deleteUser, updateUser} = require("../controllers/userController");
const useMiddleware = require('../middleware/useMiddleware')

const router = express.Router();

router.get("/users", getUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/auth", useMiddleware);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);


module.exports = router;