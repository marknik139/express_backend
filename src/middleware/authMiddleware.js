import jwt from 'jsonwebtoken';
import config from '../config.js';
const {secret} = config;
const middleware = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: 'User is not authenticated'});
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({message: 'Unauthorized'});
    }
};

export default middleware;