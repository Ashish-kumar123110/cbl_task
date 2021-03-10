const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let bookingDetails = new Schema({

    fillingtype: {

        type: String, trim: true, required: true
    },
    vehicles: [{
        type: String

    }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdetails'
    },
    pump_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pumpDetail'
    },
    person_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'personDetails'
    },
    status: {

        type: String,
        enum: ["complete", "pending"],
        default: "pending"

    },
  
}, {
    timestamps: true
})
module.exports = mongoose.model('bookingDetails', bookingDetails)