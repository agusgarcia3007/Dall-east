import express from 'express'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import Post from '../database/models/post.js'

dotenv.config()

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = 15

  try {
    const totalResults = await Post.countDocuments()
    const totalPages = Math.ceil(totalResults / limit)
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()
    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        totalPages,
        currentPage: page ?? 1,
        totalResults
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
})

router.get('/search', async (req, res) => {
  const { query, page } = req.query
  const limit = 15

  try {
    let posts = []

    if (query) {
      posts = await Post.find({
        $or: [{ prompt: { $regex: query } }, { name: { $regex: query } }, { name: query }]
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec()
    } else {
      posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec()
    }

    const totalResults = await Post.countDocuments({
      prompt: { $regex: query.toLowerCase() }
    })
    const totalPages = Math.ceil(totalResults / limit)

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        totalPages,
        currentPage: page ?? 1,
        totalResults
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, prompt, image } = req.body
    const imageUrl = await cloudinary.uploader.upload(image)

    const newPost = await Post.create({
      name,
      prompt,
      image: imageUrl.url
    })

    res.status(201).json({ success: true, data: newPost })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
})

export default router
