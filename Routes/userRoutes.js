const express = require('express');
const router = express.Router();
const {allUsers,createUser,showUser,updateUser,deleteUser, userLogin} = require('../Controllers/userController'); //controllers
const { validateUser } = require('../middlewares/middlewares'); //middlewares
const { isLoggedIn, adminRoute } = require('../middlewares/authMiddleware'); //middlewares

router.post('/login', userLogin);
router.get('/users',isLoggedIn, adminRoute, allUsers);
router.post('/user-create',isLoggedIn, adminRoute, validateUser,createUser);
router.get('/user/:id',isLoggedIn, adminRoute, showUser);
router.put('/user/:id/update',isLoggedIn, updateUser);
router.delete('/user/:id/delete',isLoggedIn,adminRoute, deleteUser); 


module.exports = router;