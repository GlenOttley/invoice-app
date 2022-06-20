import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken'
import User from '../models/userModel'
import { Request, Response } from 'express'
import { IUserDB } from '../interfaces/userInterface'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    const user: IUserDB | null = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        image: user.image,
        address: user.address,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  }
)

export { authUser }
