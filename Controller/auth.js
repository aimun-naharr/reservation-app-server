import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json("User has been created");
  } catch (error) {
    res.status(500).json(error)
  }
};


export const logIn = async (req, res) => {
  try {
   const user=await  User.findOne({userName: req.body.userName})
   
    if(!user){
        return res.status(404).json("User not found")
    }
   const isPasswordCorrect=await bcrypt.compare(req.body.password, user.password)
   if(!isPasswordCorrect){
     return res.status(400).json("Wrong password")
     
   }
   const token=jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)
   const {password, isAdmin, ...otherDetails}=user._doc
    res.cookie("access_token", token, {
      httpOnly:true
    }).status(200).json({...otherDetails});
  } catch (error) {
    res.status(500).json(error)
  }
};
