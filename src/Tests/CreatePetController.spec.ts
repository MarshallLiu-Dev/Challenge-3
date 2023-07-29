import request from "supertest";
import { server } from "../server";

describe('CreatePetController', () => {
    it('should create a Pet', async () => {
        const petData = {
            "name": "Baby Shark Teste de integração",
            "species": "Shark",
            "carry": "bg",
            "weight": 5,
            "date_of_birth": "2014-08-14 10:10"
        };

        // Supondo que você já tenha um tutor registrado no banco de dados e tenha o ID dele
        const tutorId = '64c52e331d6dc851f33dc9f2'; // Substitua pelo ID correto do tutor

        const response = await request(server)
            .post(`/pet/${tutorId}`) // Use apenas '/pet' se você estiver enviando o ID no corpo da requisição
            .send(petData);

        expect(response.body);
        // expect(response.body.name).toBe("Baby Shark");
        expect(response.statusCode).toBe(201);
    });

    afterAll((done) => {
        // Fechar o servidor Express após a execução de todos os testes
        server.listen().close(done);
    });
});
