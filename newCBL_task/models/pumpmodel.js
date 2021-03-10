const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const pumpDetail = new Schema({
    name: {  type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true} ,
    feultype: [{ type: String, trim: true }],  // three types of fuel so use array

    phone_number: {
        type: String,
        /*not required by default**/
        validate: {
            validator: function (v) {
                var re = /^\d{10}$/;
                return (v == null || v.trim().length < 1) || re.test(v)
            },
            message: 'Provided phone number is invalid.'
        },
    },
    location: {
        type: {type: String },
        coordinates: [ Number ]  // save lattitude longitude
    },
     status: { type: String, enum: ["active", "inactive"],default: "inactive" },

},{
    timestamps: true
})
pumpDetail.index({"location.coordinates": "2dsphere"});  // use 2d sphare indexing for location
module.exports = mongoose.model('pumpDetail', pumpDetail)