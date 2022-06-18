const router = require('express').Router();
const handle = require('../handlers');

//router.get('/', handle.getUsers); // for development only
router.post('/login');
router.post('/register');

module.exports = router;