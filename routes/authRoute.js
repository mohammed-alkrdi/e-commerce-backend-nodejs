const express = require('express');
const {createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, blockuser, unblockuser, unblockUser, blockUser} = require('../controller/userCtrl');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleWare');
const router = express.Router();
//route for register 
router.post("/register",createUser);
//route for login
router.post("/login",loginUserCtrl);
//route for get all users 
router.get('/all-users', getallUser);
//route for get one user
router.get('/:id', authMiddleware, isAdmin, getaUser);
//route for delete a user 
router.delete('/:id', deleteaUser);
//route for update a user 
router.put('/edit-user', authMiddleware, updatedUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
module.exports = router;
