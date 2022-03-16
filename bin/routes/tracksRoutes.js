"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Track_1 = __importDefault(require("../models/Track"));
class TracksRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }
    async getTracks(req, res) {
        const allTracks = await Track_1.default.find().populate('user');
        if (allTracks.length == 0) {
            res.status(404).send("There are no tracks yet!");
        }
        else {
            res.status(200).send(allTracks);
        }
    }
    async getTrackByName(req, res) {
        const trackFound = await Track_1.default.findOne({ name: req.params.nameTrack }).populate('user');
        if (trackFound == null) {
            res.status(404).send("The track doesn't exist!");
        }
        else {
            res.status(200).send(trackFound);
        }
    }
    async addTrack(req, res) {
        console.log(req.body);
        const { id, title, singer, year, duration, user } = req.body;
        const newTrack = new Track_1.default({ id, title, singer, year, duration, user });
        const savedTrack = newTrack.save();
        res.status(200).send('Track added!');
    }
    async updateTrack(req, res) {
        const trackToUpdate = await Track_1.default.findOneAndUpdate({ name: req.params.nameUser }, req.body);
        if (trackToUpdate == null) {
            res.status(404).send("The track doesn't exist!");
        }
        else {
            res.status(200).send('Updated!');
        }
    }
    async deleteTrack(req, res) {
        const trackToDelete = await Track_1.default.findOneAndDelete({ name: req.params.nameUser }, req.body);
        if (trackToDelete == null) {
            res.status(404).send("The track doesn't exist!");
        }
        else {
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
exports.default = trackRoutes.router;
