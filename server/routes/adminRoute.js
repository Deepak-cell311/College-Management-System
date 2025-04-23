const router = require('express').Router();
const { adminLogIn, deleteAdmin, getAdminDetail, updateAdmin, uploadProfileImage } = require('../controllers/admin-controller.js');

router.post('/AdminLogin', adminLogIn);
router.get("/Admin/:id", getAdminDetail);
router.delete("/Admin/:id", deleteAdmin);
router.put("/Admin/:id", updateAdmin);
router.post("/Admin/profileImage", uploadProfileImage);

module.exports = router;