import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './Routes/auth.js'
import hotelsRoute from './Routes/hotels.js'
import roomsRoute from './Routes/room.js'
import usersRoute from './Routes/users.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
const app=express()
app.use(cookieParser())
app.use(cors())
const connect =async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
      
      } catch (error) {
       console.log(error)
      }
    
}



// middlewares
app.use(express.json())

// app.use((err, req, res, next)=>{
//     const errorStatus= err.status||500
//     const errorMessage=err.message|| "something went wrong"
    
//     return res.status(errorStatus).json({
//         success:false,
//         status:errorStatus,
//         message: errorMessage
//     })
    
// })
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