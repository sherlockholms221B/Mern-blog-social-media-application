import User from '../Models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const oldUser = await User.findOne({ email })

    if (!oldUser) {
      return res
        .status(404)
        .json({ message: `User with Email: ${email} does not exit` })
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, 'blog', {
      expiresIn: '78h',
    })

    res.status(200).json({ user: oldUser, token })
  } catch (error) {
    res.status(409).send({ message: error })
  }
}

const signUp = async (req, res) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      profileImage,
    } = req.body

    const oldUser = await User.findOne({ email })
    if (oldUser) {
      return res.status(400).json({ message: `User already exit` })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'password mis-match' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      profileImage: profileImage,
    })
    const token = jwt.sign({ email: user.email, id: user._id }, 'blog', {
      expiresIn: '10h',
    })

    res.status(200).json({ user, token })
  } catch (error) {
    res.status(409).send({ message: error })
  }
}

export { signIn, signUp }
