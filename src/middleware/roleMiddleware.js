import jwt from 'jsonwebtoken';
import config from '../config.js';
const {secret} = config;

const middleware = function (roles) {
    return function (req, res, next){
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers?.authorization?.split(' ')[1];
            if (!token) {
                return res.status(403).json({message: 'User is not authenticated'});
            }
            const {roles: userRoles} = jwt.verify(token, secret);
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)){
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(403).json({message: 'User doesn\'t have access'});
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({message: 'Unauthorized'});
        }
    };
};

export default middleware;