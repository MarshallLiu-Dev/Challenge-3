import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const tutorSchema = new mongoose.Schema({
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
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pet',
        },
    ],
});


// Método personalizado para ocultar a senha no retorno do JSON
tutorSchema.methods.toJSON = function () {
    const tutorObject = this.toObject();
    // Substitua o valor do campo "password" por asteriscos antes de enviar a resposta
    tutorObject.password = '******';
    return tutorObject;
};

export = mongoose.model('tutors', tutorSchema);
