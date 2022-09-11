import Express from 'express'
import { signIn, signUp } from '../Controllers/User.js'

const router = Express.Router()

router.route('/signIn').post(signIn)
router.route('/signUp').post(signUp)

export default router
