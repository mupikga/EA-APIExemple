import {Request, response, Response, Router} from 'express';

import Track from '../models/Track';
import User from '../models/User';

class TracksRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }

    public async getTracks(req: Request, res: Response) : Promise<void> { //It returns a void, but internally it's a promise.
        const allTracks = await Track.find().populate('user');
        if (allTracks.length == 0){
            res.status(404).send("There are no tracks yet!")
        }
        else{
            res.status(200).send(allTracks);
        }
    }

    public async getTrackByName(req: Request, res: Response) : Promise<void> {
        const trackFound = await Track.findOne({name: req.params.nameTrack}).populate('user');
        if(trackFound == null){
            res.status(404).send("The track doesn't exist!");
        }
        else{
            res.status(200).send(trackFound);
        }
    }

    public async addTrack(req: Request, res: Response) : Promise<void> {
        console.log(req.body);
        const {id, title, singer, year,duration, user} = req.body;
        const newTrack = new Track({id, title, singer, year,duration, user});
        const savedTrack = newTrack.save();
        res.status(200).send('Track added!');
    }

    public async updateTrack(req: Request, res: Response) : Promise<void> {
        const trackToUpdate = await Track.findOneAndUpdate ({name: req.params.nameUser}, req.body);
        if(trackToUpdate == null){
            res.status(404).send("The track doesn't exist!");
        }
        else{
            res.status(200).send('Updated!');
        }
    }

    public async deleteTrack(req: Request, res: Response) : Promise<void> {
        const trackToDelete = await Track.findOneAndDelete ({name:req.params.nameUser}, req.body);
        if (trackToDelete == null){
            res.status(404).send("The track doesn't exist!")
        }
        else{
            res.status(200).send('Deleted!');
        }
    } 


    routes() {
        this.router.get('/', this.getTracks);
        this.router.get('/:nameUser', this.getTrackByName);
        this.router.post('/', this.addTrack);
        this.router.put('/:nameUser', this.updateTrack);
        this.router.delete('/:nameUser', this.deleteTrack);

    }
}
const trackRoutes = new TracksRoutes();

export default trackRoutes.router;