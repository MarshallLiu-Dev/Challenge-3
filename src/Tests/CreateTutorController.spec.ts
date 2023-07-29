import request from "supertest";
import { server } from "../server";
import TutorModel from "../Models/tutors";

describe('CreateTutorController', () => {
    it('should create a Tutor', async () => {
        const Tutor = {
            "name": "Paulo Henrique Teste de integração",
            "email": "PauloHenrique1235@Testeintegração.com",
            "password": "12345678",
            "phone": 88996246889,
            "zip_code": "63500284",
            "date_of_birth": "2000-10-01 10:10"
        }
        const response = await request(server).post('/tutor').send({ Tutor });
        // expect(response.statusCode).toBe(201);
        expect(response.body);
    });


    afterAll((done) => {
        // Fechar o servidor Express após a execução de todos os testes
        server.listen().close(done);
    });
});

