import express from 'express'
import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// neqjIJdfTDtYbbpu
mongoose.connect(process.env.MONGO).then(() => console.log('Mongodb is connected')).catch((err) => console.log(err))

const app = express()

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})