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
const SubPoroductSchema = new Schema({
    LastUpdate: String,
    Condation: textField,
    Details: textField,
    EntryDate: textField,
    ExpiryDate: textField,
    Price: textField,
    ProductName: textField,
    Quantity: textField,
    SelfOrDonation: textField,
    SubProduct: textField,
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: [true, 'subStore must belong to a Store.']
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });
// virtual Populate
// StudentSchema.virtual('health', {
//     ref: 'Health',
//     foreignField: 'studentId',
//     localField: '_id'
// });
// StudentSchema.virtual('cloth', {
//     ref: 'Cloth',
//     foreignField: 'studentId',
//     localField: '_id'
// });
const SubProduct = mongoose.model('SubProduct', SubPoroductSchema);
module.exports = SubProduct;
