"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TracksSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    singer: { type: String, required: true },
    year: { type: Number },
    duration: { type: Number }
});
exports.default = (0, mongoose_1.model)('Track', TracksSchema);
