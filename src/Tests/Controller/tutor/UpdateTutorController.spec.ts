import request from "supertest"; 
import { server } from "../../../server";
import { App } from "../../../app/app"; 

describe('TutorController', () => {
    let app: App; // Declaração da variável que armazenará a instância da classe "App"
    const PORT = 5001; // Porta usada para testar o servidor (pode ser alterada conforme necessário)
    let httpServer: any; // Variável para armazenar o servidor HTTP criado pelo Express
    let tutorId: number; // Variável para armazenar o ID do tutor criado (será usado na atualização)

    // Antes de todos os testes, é executado esse trecho de código
    beforeAll((done) => {
        app = new App(); // Cria uma instância da classe "App"
        httpServer = app.server.listen(PORT, () => {
            console.log(`Test server is running at http://localhost:${PORT}`);
            done(); // Chama a função "done()" quando o servidor estiver pronto para os testes
        });
    });

    // Após todos os testes, é executado esse trecho de código
    afterAll((done) => {
        httpServer.close(() => {
            console.log('Test server closed.');
            done(); // Chama a função "done()" quando o servidor for fechado após os testes
        });
    });

    // Teste para verificar a atualização de um tutor
    it('should update a Tutor', async () => {
        try {
            // Primeiro, cria um tutor para atualizar (usando o endpoint POST)
            const tutorData = {
                name: "John Doe",
                phone: 1234567890,
                email: "john.doe@example.com",
                password: "secretpassword",
                zip_code: 12345,
                date_of_birth: "1990-01-01",
            };

            const postResponse = await request(app.server)
                .post('/tutor')
                .send(tutorData)
                .expect(201); // Espera que a resposta tenha o status de "201 Created"

            tutorId = postResponse.body.id; // Armazena o ID do tutor criado para atualização posterior

            // Agora, atualiza o tutor usando o endpoint PUT
            const updatedTutorData = {
                name: "Updated John Doe",
                phone: 9876543210,
                email: "updated.john.doe@example.com",
                password: "updatedsecretpassword",
                zip_code: 54321,
                date_of_birth: "1995-05-05",
            };

            const response = await request(app.server)
                .put(`/tutor/${tutorId}`)
                .send(updatedTutorData)
                .expect(201); // Espera que a resposta tenha o status de "201 Created"

            // Verificações para garantir que a atualização foi bem-sucedida
            expect(response.body).toBeDefined();
            expect(response.body.name).toBe(updatedTutorData.name);
            expect(response.body.phone).toBe(updatedTutorData.phone);
            expect(response.body.email).toBe(updatedTutorData.email);
            expect(response.body.zip_code).toBe(updatedTutorData.zip_code);
            expect(response.body.date_of_birth).toBe(updatedTutorData.date_of_birth);
            expect(response.statusCode).toBe(201);

        } catch (error) {
            return error; // Retorna o erro, caso ocorra algum problema durante o teste
        }
    }, 15000); // Tempo limite para o teste (15 segundos)
});

