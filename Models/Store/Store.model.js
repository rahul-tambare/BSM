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

const StoreSchema = new mongoose.Schema({
    LastUpdate: String,
    Condation: Boolean,
    Details: Boolean,
    EntryDate: Boolean,
    ExpiryDate: Boolean,
    Price: Boolean,
    ProductName: textField,
    Quantity: Boolean,
    SelfOrDonation: Boolean,
    SubProduct: Boolean
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });
// virtual Populate
StoreSchema.virtual('subProduct', {
    ref: 'SubProduct',
    foreignField: 'storeId',
    localField: '_id'
});
// StudentSchema.virtual('cloth', {
//     ref: 'Cloth',
//     foreignField: 'studentId',
//     localField: '_id'
// });
const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;
