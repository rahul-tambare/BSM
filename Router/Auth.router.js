const express = require('express');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const User = require('../Models/Auth/User.model')
const Authset = require('../Controlers/AuthControllers/Setauth');
const Auth = require('../Controlers/AuthControllers/Auth');
const router = express.Router();
router.post('/signup', [
    check('username', 'plese Enter valid username')
        .not()
        .isEmpty(),
    check('email', 'plese Enter valid email')
        .isEmail(),
    check('password', 'plese Enter valid password')
        .isLength({ min: 6 })
], async (req, res) => {
    console.log(req, 'hi');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                msg: 'user already exist'
            })
        }
        user = new User({
            email,
            username,
            password
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            "randomString",
            { expiresIn: 10000 },
            (err, token) => {
                if (err) throw err;

                // res.json({ token });
                // res.setHeader('Set-Cookie', ['item1=value1']);
                res.status(200).json({ token })
            }
        )
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
})
router.post('/login', [
    check('email', 'plese Enter valid email  address').isEmail(),
    check('password', 'plese Enter valid password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({
            errors: errors.array()
        }
        )
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: 'user not exist' })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ msg: 'incorrect password!!!!!!!!!!!!!!!!' });
        }
        const payload = { user: { id: user.id } }
        jwt.sign(
            payload,
            'randomString',
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token })
            }
        )
    } catch (err) {
        res.status(500).json({ msg: "server Error" });
    }

});
router.get('/me', Auth, async (req, res) => {
    console.log('ramee')
    const user = await User.findById(req.user.id)
    res.status(200).json({
        user,
        hi: req.user
    })
})
router.get('/valid', Auth, async (req, res) => {
    try {
        console.log('ramee')
        const user = await User.findById(req.user.id)
        res.status(200).json({
            valid: true
        })
    } catch (err) {
        res.status(403).json({
            valid: false
        })
    }

})


module.exports = router;