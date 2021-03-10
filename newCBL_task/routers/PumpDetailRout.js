let express=require('express');
let router=express.Router()
let controler=require('../controller/PumpControler')
let pumpJoiModel = require("../joiModel/pumpJoiModel")
let validator = require('express-joi-validation').createValidator({})


router.post('/addPumpDetails',controler.pumpDetail)
router.post('/addPersonDetails',validator.body(pumpJoiModel.personDetails),controler.personDetails)
router.post('/updateBooking',validator.body(pumpJoiModel.updateBooking),controler.updateBooking)
router.get('/showBookingDetails',validator.body(pumpJoiModel.showBookingDetails),controler.showBookingDetails)

module.exports=router; 
