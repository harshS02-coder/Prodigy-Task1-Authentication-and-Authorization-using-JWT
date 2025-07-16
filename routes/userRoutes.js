const express = require('express');
const router = express.Router();
const {authenticate, authorize} = require('../middleware/auth.js');

router.get('/users', authenticate, (req,res)=>{
    res.json({message : `Welcome ${req.user.role}`, user : req.user});
});

router.get('/admin-panel', authenticate, authorize('admin'), (req, res)=>{
    res.json({message: 'Welcome to the admin panel'});
});

module.exports = router;