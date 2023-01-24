import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import connect from './database/connect.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

const PORT = process.env.PORT || 8080

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

const startServer = async () => {
  try {
    connect(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT} ⚡️`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
