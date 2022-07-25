import Room from '../Models/Room.js'
import Hotel from '../Models/Hotel.js'

export const createRoom=async(req,res)=>{
const hotelId=req.params.id

const newRoom=new Room(req.body)

try {
    const savedRoom=await newRoom.save()
   
    try {
        await Hotel.findByIdAndUpdate(hotelId, {$push:{rooms: savedRoom._id}})
    } catch (error) {
        res.status(500).json('Something went wrong')
    }
    res.status(200).json(savedRoom)
} catch (error) {
    res.status(500).json('Something went wrong')
}
}

export const updateRoom = async (req, res) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  export const deleteRoom = async (req, res) => {
    const hotelId=req.params.hotelid
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {$pull:{rooms: req.params.id}})
    } catch (error) {
        res.status(500).json('Something went wrong')
    }
      res.status(200).json("deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  export const getRoom = async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  export const getAllRoom = async (req, res) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  