const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthSchema = new Schema({
    hb: Number,
    height: Number,
    weight: Number,
    lastUpdate: String,
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'health must belong to a Student.']
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

const Health = mongoose.model('Health', healthSchema);
module.exports = Health;

