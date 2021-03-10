let express = require('express')
let router = express.Router()
let multer = require('multer')
let controler = require("../controller/userController")
const {
  authenticateJWT
} = require('../tokenManger/tokenManager')
let userJoiModel = require("../joiModel/userJoiModel")
const validator = require('express-joi-validation').createValidator({})

router.post('/userSignup', validator.body(userJoiModel.userSignUp), controler.userSignUp)
router.post('/userLogin', validator.body(userJoiModel.userLogin), controler.userLogin)


let Storage = multer.diskStorage({
  destination: "upload/",
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname + '-' + Date.now() + '.jpg')
  },

})
// here we define the maximun storage file size is 3 Mb
let upload = multer({
  storage: Storage,
  limits: {
    fileSize: 3 * 1024 * 1024
  }
})
router.post('/uploadProfilePic', authenticateJWT, upload.single('image'), controler.uploadProfilePic)
router.post('/nearestPumpDetail', authenticateJWT, controler.nearestPumpDetail)
router.post('/addBooking', authenticateJWT, validator.body(userJoiModel.addBookings), controler.addBookings)

module.exports = router;