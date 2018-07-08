const User = require('./models/User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

const createSendToken = (res, user) => {
    let payload = {
        sub: user._id
    };
    const token = jwt.encode(payload, 'my-secret');
    res.status(200).send({token});
}

module.exports = {
 
    register: (req, res, next) => {
        const userData = req.body;
        const user = new User(userData);
        user.save((err, newUser) => {
            if (err) {
                return res.status(500).send({message: 'error saving user'});
            }
            createSendToken(res, newUser);
        });
    },
    login: async(req, res, next) => {
        const loginData = req.body;
        const user = await User.findOne({
            email: loginData.email
        });
        bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(401).send({message: 'invalid email or pasword'});
            }
            createSendToken(res, user);
        });
    },
    checkAuthenticated: (req, res, next) => {
        if (!req.header('authorization')) {
            return res.status(401).send({
                message: 'Unauthorized, missing Auth Header'
            });
        }
        const token = req.header('authorization').split(' ')[1];
        const payload = jwt.decode(token, 'my-secret');
        if (!payload) {
            return res.status(401).send({
                message: 'Unauthorized, Auth Header invalid'
            });
        }
        req.userId = payload.sub;
        next();
    }
}