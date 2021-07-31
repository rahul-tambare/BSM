const express = require('express');
const Health = require('../Controlers/Student/Health.controllers')
const Student = require('../Controlers/Student/Student.controllers');
const Cloth = require('../Controlers/Student/Cloth.controllers');
const router = express.Router();
const multer = require('multer');
const FormData = require('form-data');
const fileUpload = require('express-fileupload');
// multet as middlewhere
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        req.fileUploadName[file.fieldname] = file.fieldname + Date.now() + file.originalname
        cb(null, req.fileUploadName[file.fieldname]);
    }
})
const upload = multer({ storage: storage }).any()
const multerUploadMiddleware = (req, res, next) => {
    req.fileUploadName = {}
    upload(req, res, (err) => {
        if (err) {
            res.sendStatus(500);
        }
        next();
    });
    next();
}
router.post('/addstudent', multerUploadMiddleware, fileUpload, Student.addStudent);
router.get('/studentlist/:id', Student.getStudent)
router.put('/studentlist/:id', multerUploadMiddleware, fileUpload, Student.updateStudentById)
router.post('/addhealth', Health.postHealth);
router.get('/student/:field', Student.getStudents);
router.get('/student/:id/:field', Student.getStudent);
router.post('/addcloth', Cloth.addCloth);
router.get('/count', Student.getCount)

module.exports = router;