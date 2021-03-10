const mongoose = require('mongoose');
let validator = require('validator')
let Schema = mongoose.Schema;


let userdetails = new Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,


        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email not valid")
            }
        }
    },
    profilePic: {

        type: String,
        required: false

    },
    password: {
        type: String,
        required: true
    },
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
    accessToken: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["active", "inactive", "delete"],
        default: "active"
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('userdetails', userdetails)