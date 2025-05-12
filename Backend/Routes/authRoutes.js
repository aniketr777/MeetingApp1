const express = require('express');
const router = express.Router();

const {signIn,login} = require('../Controllers/authController')


router.post('/signIn',signIn )
router.post('/login',login )

module.exports = router;
