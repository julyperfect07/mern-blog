import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"

export const signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body
    if (!username || !email || !password || username === '' || email === '' || password === '') {
      next(errorHandler(400, 'All fields are required'))
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = await User.create({ username, email, password: hashedPassword })
    res.json('sign up successful 123123')
  } catch (error) {
    next(error)
  }
}