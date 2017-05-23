import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import passport from 'passport'

const auth = Router()

auth.get('/user', passport.authenticate('jwt') , (req, res) => {
  res.status(200).json({ message: 'Authenticated', auth: req.isAuthenticated(), user: req.user})
})

auth.get('/logout', (req, res) =>{
  req.session = null;
  res.status(200)
  res.json({loggedOut: true})
})

auth.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }
  User.findOne({ username: req.body.username })
  .then(user => {
    if(!user) return res.status(400).json({ message: 'No user' })
    user.comparePassword(req.body.password, (err,result)=>{
      if(result) {
        const token = jwt.sign({id: req.body.username},  process.env.JWT_SECRET)
        req.session.jwt_token = token;
        return res.status(200).json({ message: 'ok', token })
      }
      else {
        return res.status(400).json({ message: 'Invalid password or username' })
      }
    })
  })
  .catch((err) => {
    return res.status(400).json(err)
  })
})

export default auth