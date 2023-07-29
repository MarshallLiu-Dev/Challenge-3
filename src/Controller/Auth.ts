import Tutor from "../Models/tutors"
import { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthController = {
    async Login(req: Request, res: Response) {
        const { email, password } = req.body;

        const tutor = await Tutor.findOne({email}).select("+password");
        
        if (!email) {
            return res.status(422).json({ message: 'Email is required!' });
        }
        if (!password) {
            return res.status(422).json({ message: 'Password is required!' });
        }

        if (!tutor) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!password || !tutor.password) {
            return res.status(400).json({ error: true, code: 400, message: "Invalid email or password" });
          }

        // Verificando se as senhas são iguais
        const checkPassword = await bcrypt.compare(password, tutor.password);

        if (!checkPassword) {
            return res.status(401).json({ error: true, code: 401, message: "Invalid email or password"});
        }
        const secret = `${process.env.JWT_SECRET }`;
        const token = jwt.sign({ id: tutor._id },secret,{expiresIn:process.env.JWT_EXPIRATION});
      
        return res.status(200).json({ access_token:token });
    },
};

export default AuthController;
