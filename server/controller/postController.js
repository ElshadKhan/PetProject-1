const ApiError = require('../error/ApiError.js')
const uuid = require('uuid')
const path = require('path')
const { User, Post } = require('../models/models')

class PostController {
    async createPost (req, res, next) {
      try { 
        const id = req.params.id
        const { content } = req.body
        const { picture } = req.files 
        let fileName = uuid.v4() + ".jpg"   
        picture.mv(path.resolve(__dirname, "..", 'static', fileName))
        const post = await Post.create({content, picture: fileName, userId: id})
        const username = await user
        return res.json(post)
      } catch (error) { 
          next(ApiError.badRequest(error.massage))
      }
        
    }
    // async updatePost (req, res) {

    // }
    // async deletePost (req, res) {

    // }
    async getAllPosts (req, res) {
        const posts = await Post.findAll()
        return res.json(posts)
    } 
    // async getUserPosts (req, res) {

    // }
    // async getOnePost (req, res) {

    // }
}

module.exports = new PostController()