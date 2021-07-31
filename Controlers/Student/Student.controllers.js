const { json, static } = require("express");
const Student = require('../../Models/Student/Student.model');
const Times = require("../Suger/Times");
const public = "../../public";
var fs = require('fs');

exports.addStudent = async (req, res) => {
    try {
        const formPost = {}
        const Form = JSON.parse(req.body.Form);
        console.log(Form);
        Form.Uploaded = req.fileUploadName;
        Form.LastUpdate = Times.LastUpdate();
        const student = await Student.create({ ...Form });
        res.status(200).json({
            status: 'success',
            data: {
                data: student
            }
        })
    } catch (err) {
        console.log(err);
    }
};
exports.updateStudentById = async (req, res) => {
    try {
        //
        // fs.unlinkSync()
        const formPost = {}
        console.log(req.body)
        const Form = JSON.parse(req.body.Form);
        // console.log(Form)
        if (Form.deletefile) {
            Object.keys(Form.deletefile).forEach(el => {
                fs.unlink(__dirname + `./../../public/${Form.deletefile[el]}`, (err => {
                    if (!err) {
                        console.log('data deleted')
                    } else {
                        console.log(err)
                    }

                }));
            })
        }

        // console.log(Form.deletefile)
        Form.Uploaded = { ...req.fileUploadName, ...Form.document }
        Form.LastUpdate = Times.LastUpdate();
        //       
        await Student.findByIdAndUpdate(Form.id, { ...Form });
        res.status(200).json({ msg: 'data update success' });
        console.log('success');
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: err });
    }
}

exports.getStudents = async (req, res) => {
    try {
        const requireField = req.params.field;
        let StField;
        if (requireField === 'Student') {
            StField = await Student.find({})
        } else {
            StField = await Student.find({}).populate(requireField);
        }
        let list = {}
        // console.log(StField)
        StField.forEach((key, i) => {
            const id = StField[i]._id;
            let laStField = {}
            const fullName = StField[i].Student.firstName + " " + StField[i].Student.fatherName + " " + StField[i].Student.lastName;
            if (requireField === 'Student') {
                laStField = StField[i][requireField]
            } else {
                if (StField[i][requireField].length > 0) {
                    laStField = StField[i][requireField][StField[i][requireField].length - 1]._doc;
                }
            }
            list[id] = { ...laStField, name: fullName, sr: i + 1 }
        })

        res.status(202).json({ message: 'success', list });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: 'fail', body: err });
    }
}
exports.getStudent = async (req, res) => {
    try {
        const requireField = req.params.field;
        console.log(requireField)
        let StField;
        if (requireField === 'Student') {
            StField = await Student.findById(req.params.id)
            console.log(StField)

        } else {
            StField = await Student.findById(req.params.id).populate(requireField);
        }
        let list = {}
        //
        if (requireField === 'Student') {
            laStField = StField._doc
            list = { ...laStField }
        } else {
            StField[requireField].forEach((key, i) => {
                const id = StField[requireField][i]._id;
                let laStField = {}
                const fullName = StField.Student.firstName + " " + StField.Student.fatherName + " " + StField.Student.lastName;
                if (StField[requireField].length > 0) {
                    laStField = StField[requireField][StField[requireField].length - 1]._doc;
                }
                list[id] = { ...laStField, name: fullName, sr: i + 1 }
            })

        }
        res.status(202).json({ message: 'success', list });
        //
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: 'fail', body: err });
    }
}
exports.getCount = async (req, res) => {
    try {
        console.log('hi');
        const student = await Student.find();
        const totalStudents = student.length;
        let totalBoyes = 0;
        let totalGirls = 0;
        console.log('hi');
        student.forEach(el => {


            if (el.Student.gender === "Male") {
                console.log('hi');
                totalBoyes = totalBoyes + 1;
            }
            if (el.Student.gender === "Female") {
                totalGirls = totalGirls + 1;
            }
        });
        console.log(totalStudents, totalGirls, totalBoyes)
        res.status(200).json({ message: 'success', totalStudents, totalGirls, totalBoyes });

    } catch (err) {
        res.status(400).json({ message: 'err' });
    }

}