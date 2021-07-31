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
const Schema = mongoose.Schema;
const CartFieldSchema = new Schema({
    count: numberField,
    subProductId: {
        type: Schema.Types.ObjectId,
        ref: 'SubProduct',
        required: [true, ' subProductId must belong to a subProduc.']

    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: [true, 'subProduct must belong to a cart.']

    }

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });
// virtual Populate
// StoreSchema.virtual('subProduct', {
//     ref: 'SubProduct',
//     foreignField: 'storeId',
//     localField: '_id'
// });
// StudentSchema.virtual('cloth', {
//     ref: 'Cloth',
//     foreignField: 'studentId',
//     localField: '_id'
// });
const CartField = mongoose.model('CartField', CartFieldSchema);
module.exports = CartField;
