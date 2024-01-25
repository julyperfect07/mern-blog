import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body
    if (!username || !email || !password || username === '' || email === '' || password === '') {
      return res.status(400).json('All fields are required')
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = await User.create({ username, email, password: hashedPassword })
    res.json('sign up successful 123123')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}