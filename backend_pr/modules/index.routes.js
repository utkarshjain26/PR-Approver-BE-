const router = require('express').Router();
const { verifyToken } = require('../middleware/verifyToken');
const { authRouter } = require('./Auth/auth.routes');
const { requestRouter } = require('./Request/request.routes');
const { userRouter } = require('./User/user.routes');

router.use('/auth', authRouter);

router.use('/request', verifyToken ,requestRouter);

router.use('/user',verifyToken, userRouter);

exports.appRouter = router;
