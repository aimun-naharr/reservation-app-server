import express from 'express'
import { logIn, register } from '../Controller/auth.js'

const router=express.Router()

router.post('/register', register)
router.post('/login', logIn)
export default router