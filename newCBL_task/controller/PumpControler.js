const model = require("../models")
const mongoose = require("mongoose");



exports.pumpDetail = async (req, res) => {
        try {
            let data = {
                name: req.body.name,
                city: req.body.city,
                phone_number: req.body.phone_number,
                location: req.body.location,
                feultype: req.body.feultype,
                location:req.body.location
            }
            let result = await model.PumpModel.create(data)
            return res.send(result)
        } catch (err) {
            console.log(err)
            return res.send(err)
        }

    },
    exports.personDetails = async (req, res) => {
            try {
                console.log("persone")
                let data = {
                    name: req.body.name,
                    pump_id: req.body.pump_id,
                    phone_number: req.body.phone_number
                }
                let result = await model.PersonModel.create(data)
                return res.send(result)
            } catch (err) {
                return err
            }
        },
        exports.updateBooking = async (req, res) => {
                try {
                    let criteria = {
                        _id: req.query.pumpId
                    }
                    let Updatedata = {
                        person_id: req.body.person_id,
                        status: req.body.status
                    }
                    const result = await model.BookingModel.findByIdAndUpdate(criteria, Updatedata)
                    return res.send(result)
                } catch (err) {
                    return err
                }
            },
            exports.showBookingDetails = async (req, res) => {
                try {
                    // booking detail with user populate and populate persone who fill 
                    const result = await model.BookingModel.aggregate([{
                            $match: {
                                pump_id: mongoose.Types.ObjectId(req.query.pumpId),
                            }
                        },
                        {
                            $lookup: {
                                from: "userdetails",
                                let: {
                                    userId: "$user_id"
                                },
                                pipeline: [{
                                        $match: {
                                            $expr: {
                                                $eq: ["$_id", "$$userId"]
                                            }
                                        },
                                    },
                                    {
                                        $project: {
                                            _id: 1,

                                            name: 1,
                                            phone_number: 1
                                        }
                                    },
                                ],
                                as: "user_id",
                            }
                        },
                        {
                            $lookup: {
                                from: "personDetails",
                                let: {
                                    userId: "$person_id"
                                },
                                pipeline: [{
                                        $match: {
                                            $expr: {
                                                $eq: ["$_id", "$$userId"]
                                            }
                                        },
                                    },
                                    {
                                        $project: {
                                            _id: 1,

                                            name: 1,
                                            phone_number: 1
                                        }
                                    },
                                ],
                                as: "person_id",
                            }
                        },
                    ])

                    console.log(result)
                    res.status(200).send(result)
                } catch (err) {
                    res.status(500).send(err)
                }

            }