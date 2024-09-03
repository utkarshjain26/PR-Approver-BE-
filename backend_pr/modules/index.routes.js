const router = require('express').Router();
const { authRouter } = require('./Auth/auth.routes');
const { requestRouter } = require('./Request/request.routes');
const { userRouter } = require('./User/user.routes');

router.use('/auth', authRouter);

router.use('/request', requestRouter);

router.use('/user', userRouter);

exports.appRouter = router;
