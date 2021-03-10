let mongoose = require('mongoose');
let validator=require('validator')
let Schema = mongoose.Schema;


var personDetails=new Schema({

    name:{  type: String, trim: true, required: true },  
    pump_id:{
        type: Schema.Types.ObjectId,
         ref: 'pumpDetail',
         required:false
    },
    phone_number: { type: String,
        /*not required by default**/ 
        validate: {
            validator: function(v) {
                var re = /^\d{10}$/;
                return (v == null || v.trim().length < 1) || re.test(v)
            },
            message: 'Provided phone number is invalid.'
        },
        
        
    },
    
    status:{type:String,enum:["active","inactive","delete"],default:"active"},  
}, {
    timestamps: true
})
   
    module.exports = mongoose.model('personDetails',personDetails)
    