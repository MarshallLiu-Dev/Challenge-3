// Importando os tipos Request e Response do módulo 'express'
import { Request, Response } from 'express';

// Importando o modelo Tutors e Pet
const Tutors = require('../Models/tutors');
const Pet = require('../modules/pet');

// Definição do controlador TutorController
const TutorController = {
    // Função assíncrona para criar um novo tutor
    async createtutors(req: Request, res: Response) {
        const bodyData = req.body;
        try {
            // Criar um novo tutor com os dados do corpo da solicitação
            const newtutors = await Tutors.create(bodyData);
            // Resposta de sucesso com o novo tutor criado
            return res
                .status(201)
                .json({ newtutors, message: 'tutors created successfully' });
        } catch (error) {
            // Resposta de erro caso ocorra uma exceção na criação do tutor
            return res
                .status(400)
                .json({ error, message: 'Request error check and try again' });
        }
    },

    // Função assíncrona para atualizar um tutor existente
    async updatetutors(req: Request, res: Response) {
        const { tutors_id } = req.params;
        const updatedData = req.body;

        try {
            // Procurar e atualizar o tutor pelo ID fornecido
            const updatedtutors = await Tutors.findByIdAndUpdate(tutors_id, updatedData, {
                new: true,
            });

            // Verificar se o tutor foi encontrado e atualizado com sucesso
            if (!updatedtutors) {
                return res.status(404).json({ message: 'tutors not found' });
            }

            // Resposta de sucesso com o tutor atualizado
            return res
                .status(200)
                .json({ updatedtutors, message: 'tutors updated successfully' });
        } catch (error) {
            // Resposta de erro caso ocorra uma exceção na atualização do tutor
            return res
                .status(400)
                .json({ error, message: 'Request error check and try again' });
        }
    },

    // Função assíncrona para obter todos os tutores com seus animais de estimação associados
    async gettutorss(req: Request, res: Response) {
        try {
            // Encontrar todos os tutores
            const tutorss = await Tutors.find();
            const tutorssWithPets = [];

            // Iterar sobre todos os tutores encontrados
            for (const tutors of tutorss) {
                // Encontrar os animais de estimação associados a cada tutor
                const pets = await Pet.find({ tutors: tutors._id });

                // Formatar os dados dos animais de estimação para cada tutor
                const formattedPets = pets.map((pet: {
                    _id: any;
                    name: any;
                    species: any;
                    carry: any;
                    weight: any;
                    date_of_birth: any;
                }) => ({
                    id: pet._id,
                    name: pet.name,
                    species: pet.species,
                    carry: pet.carry,
                    weight: pet.weight,
                    date_of_birth: pet.date_of_birth,
                }));

                // Adicionar o tutor formatado com seus animais de estimação ao array
                tutorssWithPets.push({
                    id: tutors._id,
                    name: tutors.name,
                    phone: tutors.phone,
                    email: tutors.email,
                    date_of_birth: tutors.date_of_birth,
                    zip_code: tutors.zip_code,
                    pets: formattedPets,
                });
            }

            // Resposta de sucesso com todos os tutores e seus animais de estimação associados
            return res.status(200).json(tutorssWithPets);
        } catch (error) {
            // Resposta de erro caso ocorra uma exceção na busca dos tutores e animais de estimação
            return res.status(500).json({ error, message: 'Internal server error' });
        }
    },

    // Função assíncrona para obter um tutor pelo ID
    async gettutorssById(req: Request, res: Response) {
        const { tutors_id } = req.params;

        try {
            // Encontrar o tutor pelo ID fornecido
            const tutors = await Tutors.findById(tutors_id);
            // Verificar se o tutor foi encontrado
            if (!tutors)
                return res.status(404).send({ message: 'tutors does not exists' });
            // Resposta de sucesso com o tutor encontrado
            return res.status(200).json(tutors);
        } catch (error) {
            // Resposta de erro caso ocorra uma exceção na busca do tutor
            return res
                .status(400)
                .json({ error, message: 'Request error check and try again' });
        }
    },

    // Função assíncrona para deletar um tutor pelo ID
    async deletetutors(req: Request, res: Response) {
        const { tutors_id } = req.params;

        try {
            // Verificar se o tutor possui animais de estimação associados a ele
            const tutorsHasPets = await Pet.exists({ tutors: tutors_id });
            if (tutorsHasPets) {
                return res
                    .status(400)
                    .json({ message: 'Cannot delete tutors with associated pets' });
            }

            // Deletar o tutor pelo ID fornecido
            const deletetutors = await Tutors.findByIdAndDelete(tutors_id);

            // Resposta de sucesso após a exclusão do tutor
            return res.status(204).json({ deletetutors, message: 'Delete successful' });
        } catch (error) {
            // Resposta de erro caso ocorra uma exceção na exclusão do tutor
            return res
                .status(400)
                .json({ error, message: 'Request error check and try again' });
        }
    },
};

// Exportar o controlador TutorController para uso em outros módulos
module.exports = TutorController;
