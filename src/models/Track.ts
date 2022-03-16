import {Schema, model} from 'mongoose';
import User from './User';

const TracksSchema = new Schema({
    id: {type:String, required:true},
    title: {type: String, required:true},
    singer: {type: String, required:true},
    year: {type: Number},
    duration: {type: Number},
    user: [{type: Schema.Types.ObjectId,
        ref: 'User'}]
})
export default model('Track', TracksSchema);