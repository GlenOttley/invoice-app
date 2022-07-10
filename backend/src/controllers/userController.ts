import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken'
import User, { SavedUserDocument } from '../models/userModel'
import { Request, Response } from 'express'
import { Types } from 'mongoose'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    const user: SavedUserDocument | null = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        image: user.image,
        address: user.address,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  }
)

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (req.user._id === '61f5c55a8b500566a94331ae') {
      res
        .status(405)
        .json(
          "John Doe's details cannot be changed, please sign up as a new user if you wish to use this functionality"
        )
    } else {
      const user: SavedUserDocument | null = await User.findById(req.user._id)
      if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.address = {
          street: req.body.address.street || user.address.street,
          city: req.body.address.city || user.address.city,
          postCode: req.body.address.postCode || user.address.postCode,
          country: req.body.address.country || user.address.country,
        }
        if (req.body.password) {
          user.password = req.body.password
        }

        const updatedUser: SavedUserDocument = await user.save()

        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          image: updatedUser.image,
          address: updatedUser.address,
          email: updatedUser.email,
          token: generateToken(updatedUser._id),
        })
      } else {
        res.status(401)
        throw new Error('User information not found in database')
      }
    }
  }
)

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('Email address already in use')
  }

  const user = await User.create({
    _id: new Types.ObjectId(),
    name,
    email,
    password,
    address,
    image: req.body.image || '',
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      image: user.image,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (req.params.id === '61f5c55a8b500566a94331ae') {
      res
        .status(405)
        .json(
          'John Doe cannot be deleted, please sign up as a new user if you wish to use this functionality'
        )
    } else
      User.findByIdAndDelete(
        req.params.id,
        (err: Error, docs: SavedUserDocument) => {
          if (err) {
            res.status(404).json('User not found')
          } else {
            res.status(200).json(`User with id: ${docs._id} has been deleted`)
          }
        }
      )
  }
)

export { authUser, updateUser, createUser, deleteUser }
