const express = require('express');
const router = express.Router();
const { allUsers, createUser, showUser, updateUser, deleteUser } = require('../Controllers/userController');
const { validateUser } = require('../middlewares');

router.get('/users', allUsers);
router.post('/user-create', validateUser, createUser);
router.get('/user/:id', showUser);
router.put('/user/:id/update', updateUser);
router.delete('/user/:id/delete', deleteUser);


module.exports = router;