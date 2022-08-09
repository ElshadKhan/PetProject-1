const Router = require('express')
const router = new Router()
const PostController = require('../controller/postController.js')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', PostController.createPost)
router.get('/find', PostController.getAllPosts)

module.exports = router