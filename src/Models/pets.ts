import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
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
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tutors',
    },
});

export = mongoose.model('pet', Schema);
