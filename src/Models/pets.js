"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
    },
    species: {
        type: String,
        require: true,
    },
    carry: {
        type: String,
        require: true,
    },
    weight: {
        type: String,
        require: true,
    },
    date_of_birth: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'tutors',
    },
});
module.exports = mongoose_1.default.model('pet', Schema);
