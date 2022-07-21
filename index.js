import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './Routes/auth.js'
import hotelsRoute from './Routes/hotels.js'
import roomsRoute from './Routes/room.js'
import usersRoute from './Routes/users.js'

dotenv.config()
const app=express()

const connect =async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
      
      } catch (error) {
       console.log(error)
      }
    
}

// middlewares
app.use('/auth', authRoute)
app.use('/users', usersRoute)
app.use('/hotels', hotelsRoute)
app.use('/rooms', roomsRoute)

app.get('/', (req,res)=>{
    res.send('hello from node ')
})

app.listen(5000, ()=>{
   connect()
    console.log('connected')
})