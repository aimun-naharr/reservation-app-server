import express from 'express'
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from '../Controller/Room.js'


const router=express.Router()

// create

router.post('/:id',  createRoom)

// update

router.put('/:id',  updateRoom)
// delete
router.delete('/:id/:hotelid',  deleteRoom)

// get

router.get('/:id', getRoom)
// get all
router.get('/', getAllRoom)


export default router