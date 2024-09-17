const express = require('express');
const router = express.Router();
const {allUsers,createUser,showUser,updateUser,deleteUser, userLogin} = require('../Controllers/userController'); //controllers
const { validateUser } = require('../middlewares/middlewares'); //middlewares
const { isLoggedIn } = require('../middlewares/authMiddleware'); //middlewares

router.post('/login', userLogin);
router.get('/users', isLoggedIn, allUsers);
router.post('/user-create',isLoggedIn,validateUser,createUser);
router.get('/user/:id',isLoggedIn, showUser);
router.put('/user/:id/update',isLoggedIn, updateUser);
router.delete('/user/:id/delete',isLoggedIn, deleteUser); 


module.exports = router;