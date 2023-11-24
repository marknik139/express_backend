import User from '../models/User.js';

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
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'GetUsers error'});
        }
    }

    async isKeySpecified(req, res){
        const {username} = req.params;
        try{
            const user = await User.findOne({username});
            if (!user || !user.key){
                return res.json({isKeySpecified: false});
            }
            res.json({isKeySpecified: true});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'isKeySpecified error'});
        }
    }

    async specifyKey(req, res) {
        const {username} = req.params;
        const {key} = req.body;
        try {
            if (!key) {
                return res.status(400).json({message: 'Key is not provided'});
            }
            await User.updateOne({ username: username }, { $set: { key: key } });
            res.json({message: 'Key was specified'});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Specify Key error'});
        }
    }
}

export default new userController();