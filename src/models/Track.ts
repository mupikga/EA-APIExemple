import {Schema, model} from 'mongoose';

const TracksSchema = new Schema({
    id: {type:String, required:true},
    title: {type: String, required:true},
    singer: {type: String, required:true},
    year: {type: Number},
    duration: {type: Number}
})
export default model('Track', TracksSchema);