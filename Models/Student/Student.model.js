const mongoose = require('mongoose');
const Health = require('./Health.model')

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

const StudentSchema = new mongoose.Schema({
    LastUpdate: String,

    Student: {
        firstName: textField,
        fatherName: textField,
        lastName: textField,
        motherName: textField,
        bloodGroup: textField,
        gender: textField,
        height: textField,
        weight: textField,
        adhaarNo: numberField,
        remark: textField,
        reference: textField,
        caste: textField,
        orphanCategory: textField,
        admitDate: textField,
        class: textField,
        dateOfBirth: textField
    },
    Address: {
        homeNo: textField,
        village: textField,
        post: textField,
        tehsil: textField,
        dist: textField,
        state: textField,
        pin: numberField
    },
    Guardian: {
        name: textField,
        relition: textField,
        address: textField,
        mobile: numberField,
        addharNo: numberField
    },
    Guardian2: {
        name: textField,
        relition: textField,
        address: textField,
        mobile: numberField,
        addharNo: numberField
    },
    Whitness: {
        name: textField,
        relition: textField,
        Address: textField,
        mobile: numberField,
        addharNo: numberField
    },
    Whitness2: {
        name: textField,
        relition: textField,
        address: textField,
        mobile: numberField,
        addharNo: numberField
    }
    , Mother: {
        name: textField,
        DateOfDeath: textField
    },
    Father: {
        name: textField,
        dateOfDeath: textField,
    },
    Uploaded: {
        passPhoto: textField,
        adharCard: textField,
        residentLivingCertificate: textField
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });
// virtual Populate
StudentSchema.virtual('health', {
    ref: 'Health',
    foreignField: 'studentId',
    localField: '_id'
});
StudentSchema.virtual('cloth', {
    ref: 'Cloth',
    foreignField: 'studentId',
    localField: '_id'
});
const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;
