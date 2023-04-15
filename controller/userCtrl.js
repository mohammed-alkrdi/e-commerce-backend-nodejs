const { generateToken } = require('../config/jwttoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

//create a user if not exists = register ctrl
const createUser = asyncHandler(async(req,res) => {

    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser) {
        //create new user
        const newUser = await User.create(req.body);
        res.json(newUser);

    }else {
        //User already exists
        throw new Error('User Already Exists')
    }
      
});
//login ctrl
const loginUserCtrl = asyncHandler(async(req,res) => {
    const {email, password} = req.body;
    // check if user exisits or not
    const findUser = await User.findOne({email});
    if(findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id : findUser?._id,
            fristname : findUser?.firstname,
            lastname : findUser?.lastname,
            email : findUser?.email,
            mobile : findUser?.mobile,
            token : generateToken(findUser?._id)
        });
    } else {
        throw new Error('Invalid Credentails');
    }
});
//Update The User
const updatedUser = asyncHandler(async(req, res) => {
    const {_id} = req.user;
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname : req?.body?.firstname,
            lastname : req?.body?.lastname,
            email : req?.body?.email,
            mobile : req?.body?.mobile,
        }, {
            new : true,
        });
        res.json(updatedUser);
    }catch(error) {
        throw new Error(error);
    }
});
//Get All Users ctrl
const getallUser = asyncHandler(async(req,res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    }catch(error) {
        throw new Error(error);
    }
});
//get one user ctrl
const getaUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const getaUser = await User.findById(id);
        res.json({getaUser});
    }catch(error) {
        throw new Error(error);
    }
});

//delete one user ctrl
const deleteaUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({deleteaUser});
    }catch(error) {
        throw new Error(error);
    }
});

const blockUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const block = await User.findByIdAndUpdate(id, {isBlocked : true},{
            new: true,
        });
        res.json({
            massege: "User Blocked"
        });
    } catch(error) {
        throw new Error(error);
    }
});
const unblockUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const unblock = await User.findByIdAndUpdate(id, {isBlocked : false},{
            new: true,
        });
        res.json({
            massege: "User UnBlocked"
        });
    } catch(error) {
        throw new Error(error);
    }
});

module.exports = {createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser};