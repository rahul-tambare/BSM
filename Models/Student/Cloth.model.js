const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothSchema = new Schema({
    shirts:{
        type:Number
    },
    pants:{
        type:Number
    },
    tShirts:{
        type:Number
    },
    nightPant:{
        type:Number
    },
    towel:{
        type:Number
    },    
    pantSize:{
        type:String
    },
    shirtSize:{
        type:String
    },
    lastUpdate:{
        type:String
    },
    studentId:{
        type:Schema.Types.ObjectId,
        ref:'Student',
        required: [true, 'clothes must belong to a Student.']
    }
     
},
{
toJSON:{virtuals:true},
toObject:{virtuals:true}
});
const Cloth = mongoose.model("Cloth",clothSchema)
module.exports = Cloth;