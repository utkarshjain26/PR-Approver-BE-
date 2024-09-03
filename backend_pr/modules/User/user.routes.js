const router = require('express').Router();
const { userController } = require('./user.controller');

router.get("/", userController.getUsers);

exports.userRouter = router;