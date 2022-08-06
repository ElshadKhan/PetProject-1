const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter.js');
const postRouter = require("./postRouter.js")

router.use('/post', postRouter)
router.use('/user', userRouter)

module.exports = router