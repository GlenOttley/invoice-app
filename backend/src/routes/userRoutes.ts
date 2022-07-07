import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware'
import { authUser, updateUser, createUser } from '../controllers/userController'

router.route('/login').post(authUser)
router.route('/profile').put(protect, updateUser)
router.route('/').post(createUser)

export default router
