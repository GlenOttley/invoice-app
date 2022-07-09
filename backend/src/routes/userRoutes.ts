import { Router } from 'express'
const router = Router()
import { protect } from '../middleware/authMiddleware'
import {
  authUser,
  updateUser,
  createUser,
  deleteUser,
} from '../controllers/userController'

router.route('/login').post(authUser)
router.route('/profile').put(protect, updateUser)
router.route('/').post(createUser)
router.route('/:id').delete(protect, deleteUser)

export default router
