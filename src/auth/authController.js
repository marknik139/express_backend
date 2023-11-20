import User from '../models/User.js';
import Role from '../models/Role.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator';
import config from '../config.js';
const {secret} = config;

const generateAccessToken = (id, roles, username) => {
    const payload = {
        id,
        roles,
        username,
    };
    return jwt.sign(payload, secret, {expiresIn: '24h'});
};

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message: 'Validation error', errors});
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate){
                return res.status(400).json({message: 'User with specified username already exists'});
            }
            const hashPassword = bcryptjs.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'});
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return res.json({message: 'User was created'});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req, res){
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json({message: `User ${username} not found`});
            }
            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: 'Incorrect password'});
            }
            const token = generateAccessToken(user._id, user.roles, user.username);
            return res.json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }
}

export default new authController();