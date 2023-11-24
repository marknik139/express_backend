import {Schema, model} from 'mongoose';

const User= new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    roles: [{type: String, ref: 'Role'}],
    key: {type: String}
});

export default model('User', User);