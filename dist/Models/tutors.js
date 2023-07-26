"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    zip_code: {
        type: Number,
        required: true,
    },
    date_of_birth: {
        type: String,
        required: true,
    },
    pets: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'pet',
        },
    ],
});
module.exports = mongoose_1.default.model('tutors', Schema);
