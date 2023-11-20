import User from '../models/User.js';
import config from '../config.js';
const {secret} = config;
class userController {
    async getUser(req, res){
        const {username} = req.params;
        try {
            const user= await User.findOne({username});
            if (!user){
                return res.status(404).json({message: `User with ${username} username not found`});
            }
            res.json(user);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'GetUser error'});
        }
    };

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'GetUsers error'});
        }
    };
}

export default new userController();