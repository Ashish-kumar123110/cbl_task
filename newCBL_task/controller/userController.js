const model = require("../models")
// const Bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken')
let commonFunc = require("../config/commonFunction");
let APP_CONSTANTS = require('../Config/appConstants');
let tokenManager = require("../tokenManger/tokenManager")


exports.userSignUp = async (req, res) => {
    try {
        let result = await model.UsersModel.findOne({
            email: req.body.email
        });
        console.log("result", result)
        if (result !== null && result !== undefined) {
            return res.send(APP_CONSTANTS.ERROR.EMAIL_ALREADY_EXISTS)
        } else {
            let setData = {
                email: req.body.email,
                password: commonFunc.hashPassword(req.body.password),
                name: req.body.name,
                phone_number: req.body.phone_number
            }
            let userResult = await model.UsersModel.create(setData)
            console.log("userData...............", userResult)
            let userOb = {
                id: userResult._id,
                email: userResult.email,

            };
            // generate and save access token in userTable
            await tokenManager.generateAndUpdateJwtAccessToken(userOb)


            return res.send(userResult)
        }
    } catch (error) {
        return res.send(error)
    }
}

exports.userLogin = async (req, res) => {
    try {
        let loginData = {
            email: req.body.email,
        }
        let result = await model.UsersModel.findOne(loginData);
        if (result == null && result == undefined) {
            return res.send(APP_CONSTANTS.SERVER.INVALID_EMAIL)
        } else {
            let Password = {
                password: req.body.password,
                bcryptPassword: result.password
            }

            if (commonFunc.compareHashPassword(Password)) {

                var userOb = {
                    id: result._id,
                    email: result.email,
                };

                let accessToken = await tokenManager.generateAndUpdateJwtAccessToken(userOb)
                result.acessToken = accessToken
                return res.send(result)

            }
            return res.send(APP_CONSTANTS.ERROR.INVALID_PASSWORD)
        }

    } catch (error) {
        return error
    }
}
exports.nearestPumpDetail = async (req, res) => {
        try {


            let result = await model.PumpModel.aggregate(
                [{
                        $match: {
                            $expr: {
                                $and: [{
                                    $in: [req.body.fillingtype, "$feultype"]
                                }]
                            }
                        }
                    },
                    {
                        $geoNear: {
                           near: { type: "Point", coordinates: [ req.body.latitude,req.body.longitude ] },
                           distanceField: "dist.calculated",
                           spherical: true
                        }
                      }
                ]
            );
            return res.send(result)

        } catch (error) {

            res.status(500).send(error)
        }
    },

    exports.addBookings = async (req, res) => {
            try {
                let data = {
                    fillingtype: req.body.fillingtype,
                    pump_id: req.body.pump_id,
                    vehicles: req.body.vehicles,
                    user_id: req.user.id
                }
                const result = await model.BookingModel.create(data)

                return res.send(result)

            } catch (err) {
                return err
            }
        },

        exports.uploadProfilePic = async (req, res) => {
            {
                try {
                    // get user Id from authorization
                    let criteria = {
                        _id: req.user.id
                    }
                    // get file path from multer function
                    let setData = {
                        profilePic: req.file.path
                    }
                    let result = await model.UsersModel.findByIdAndUpdate(criteria, setData)
                    return res.send(result)
                } catch (err) {
                    return err
                }

            }
        }