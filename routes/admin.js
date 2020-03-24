const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const adminUsersController = require('../controllers/adminUsersController');

router.get('/admin', adminController.getAdminPage);
router.get('/admin/posts/create', adminController.getAdminCreatePost);

router.get('/admin/users/create', adminUsersController.createUser);

module.exports = router;
