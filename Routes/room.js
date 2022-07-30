import express from 'express'
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailability } from '../Controller/Room.js'
import { verifyAdmin } from '../utils/verifyToken.js'


const router=express.Router()

// create

router.post('/:id',verifyAdmin,  createRoom)

// update

router.put('/:id', verifyAdmin, updateRoom)
router.put('/availability/:id', updateRoomAvailability)
// delete
router.delete('/:id/:hotelid',  deleteRoom)

// get

router.get('/:id', getRoom)
// get all
router.get('/', getAllRoom)


export default router