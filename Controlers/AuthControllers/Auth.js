const jwt = require('jsonwebtoken')
const { check, validationResult, body } = require('express-validator/check');
const bcrypt = require('bcryptjs');
module.exports = (req, res, next) => {
    console.log(req.headers);
    const token = req.header('token')
    if (!token) {
        res.status(401).json({ msg: 'auth error' })
    }
    try {
        const decoded = jwt.verify(token, 'randomString')
        req.user = decoded.user
        next();
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'invalid token' })
    }
}
