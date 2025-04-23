const express = require('express')
const {FeeDataCreation, ShowFees} = require("../controllers/fees-controller")
const router = express.Router()

router.post('/Fee/', FeeDataCreation)
router.get('/get-fees/:courseId', ShowFees)

module.exports = router