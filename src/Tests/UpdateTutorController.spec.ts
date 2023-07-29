import request from "supertest";
import { server } from "../server";
import { App } from "../app/app";

describe('UpdateTutorController', () => {
    let app: App;
    const PORT = 5003;
    let httpServer: any;

    beforeAll((done) => {
        app = new App();
        httpServer = app.server.listen(PORT, () => {
            console.log(`Test server is running at http://localhost:${PORT}`);
            done();
        });
    });

    afterAll((done) => {
        httpServer.close(() => {
            console.log('Test server closed.');
            done();
        });
    });

    it('should update a Tutor', async () => {
        // Primeiro, crie um Tutor fictício para atualizar seus dados
        const tutorData = {
            name: "John Doe",
            phone: 1234567890,
            email: "john.doe@example.com",
            password: "secretpassword",
            zip_code: 12345,
            date_of_birth: "1990-01-01",
            pets: []
        };

        const createResponse = await request(app.server)
            .post('/tutor')
            .send(tutorData)
            .expect(201);

        const tutorId = createResponse.body.id;

        // Em seguida, defina os novos dados que você deseja atualizar
        const updatedTutorData = {
            name: "John Doe Updated",
            phone: 9876543210,
            email: "john.updated@example.com",
            password: "newsecretpassword",
            zip_code: 54321,
            date_of_birth: "1990-02-02",
            pets: []
        };

        // Faça a solicitação PUT para a rota /tutor/:tutorId
        const updateResponse = await request(app.server)
            .put(`/tutor/${tutorId}`)
            .send(updatedTutorData)
            .expect(200); // Espera-se que o status de retorno seja 200 (OK)

        // Verifique se a resposta possui os dados atualizados
        expect(updateResponse.body).toEqual({
            id: tutorId,
            ...updatedTutorData
        });

        // Você também pode fazer outras asserções para verificar se os dados foram atualizados corretamente no banco de dados
        // ...

    }, 15000); // Definindo o timeout para 15 segundos
});
