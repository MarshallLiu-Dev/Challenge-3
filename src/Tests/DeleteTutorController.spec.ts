import request from "supertest";
import { server } from "../server";
import TutorModel from "../Models/tutors";
import { App } from '../app/app';

describe('DeleteTutorController', () => {
        it('should delete a Tutor', async () => {
            // Primeiro, insira um tutor para depois excluí-lo
            const tutorData = {
                "name": "Paulo Henrique",
                "email": "Paulo_Henrique_Moraes@compasso.com",
                "password": "12345678",
                "phone": 88996246889,
                "zip_code": "63500284",
                "date_of_birth": "2000-10-01 10:10"
            };
            const createdTutor = await TutorModel.create(tutorData);

            // Faça a solicitação para excluir o tutor
            const response = await request(server).delete(`/tutor/${createdTutor.id}`);
            expect(response.body);
            // Verifique se a resposta indica sucesso (status 204)
            expect(response.status).toBe(204);

            // Verifique se o tutor foi excluído do banco de dados
            const deletedTutor = await TutorModel.findById(createdTutor.id);
            expect(deletedTutor).toBeNull();
        });


    afterAll((done) => {
        // Fechar o servidor Express após a execução de todos os testes
        server.listen().close(done);
    });
});  
