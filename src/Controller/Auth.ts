import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import Tutor from "../Models/tutors"

const AuthController = {
    async register(req: Request, res: Response) {
        const { email, password, confirmpassword } = req.body;

        if (!email) {
            return res.status(422).json({ message: 'Email is required!' });
        }
        if (!password) {
            return res.status(422).json({ message: 'Password is required!' });
        }
        if (password !== confirmpassword) {
            return res.status(422).json({ message: 'Passwords do not match!' });
        }
        // Verificando se o usuário existe
        const userExists = await Tutor.findOne({ email: email });
        if (userExists) {
            return res.status(422).json({ message: 'User already registered' });
        }
        // Criando a senha
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Criando o Usuário
        const user = new Tutor({
            email,
            password: passwordHash,
        });
        try {
            await user.save();
            return res
                .status(201)
                .json({ user, message: 'User created successfully' });
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ error, message: 'Request error check and try again' });
        }
    },

    async Login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email) {
            return res.status(422).json({ message: 'Email is required!' });
        }
        if (!password) {
            return res.status(422).json({ message: 'Password is required!' });
        }
        const user = await Tutor.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verificando se as senhas são iguais
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(422).json({ message: 'Invalid password' });
        }

        try {
            const secret: Secret = process.env.SECRET || "defaultSecret";

            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret
            );

            res
                .status(200)
                .json({ message: 'Authentication performed successfully', token });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ error, message: 'Server error please try again later' });
        }
    },
};

export default AuthController;
