const mongoose = require('mongoose');
const textField = {
    type: String,
    trim: true
};
const numberField = {
    type: Number,
    trim: true
}
const dateField = {
    type: Date
}

const CartSchema = new mongoose.Schema({
    Fname: textField,
    Lname: textField,
    Mname: textField
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });
// virtual Populate
CartSchema.virtual('cartField', {
    ref: 'CartField',
    foreignField: 'cartId',
    localField: '_id'
});
// StudentSchema.virtual('cloth', {
//     ref: 'Cloth',
//     foreignField: 'studentId',
//     localField: '_id'
// });
const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
