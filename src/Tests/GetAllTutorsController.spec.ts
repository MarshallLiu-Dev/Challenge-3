import request from "supertest";
import { server } from "../server";
import { App } from "../app/app";

describe('GetAllTutorsController', () => {
    let app: App;
    const PORT = 5004;
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

    it('should get all Tutors', async () => {
        // Primeiro, crie alguns Tutores fictícios para testar a rota
        const tutorData1 = {
            name: "John Doe",
            phone: 1234567890,
            email: "john.doe@example.com",
            password: "secretpassword",
            zip_code: 12345,
            date_of_birth: "1990-01-01",
            pets: []
        };

        const tutorData2 = {
            name: "Jane Doe",
            phone: 9876543210,
            email: "jane.doe@example.com",
            password: "anothersecretpassword",
            zip_code: 54321,
            date_of_birth: "1995-02-02",
            pets: []
        };

        await request(app.server)
            .post('/tutor')
            .send(tutorData1)
            .expect(201);

        await request(app.server)
            .post('/tutor')
            .send(tutorData2)
            .expect(201);

        // Agora, faça a solicitação GET para a rota /tutor
        const response = await request(app.server)
            .get('/tutor')
            .expect(200); // Espera-se que o status de retorno seja 200 (OK)

        // Verifique se a resposta contém um array de Tutores
        expect(Array.isArray(response.body)).toBe(true);

        // Verifique se a resposta contém os Tutores que foram criados anteriormente
        expect(response.body).toContainEqual(expect.objectContaining(tutorData1));
        expect(response.body).toContainEqual(expect.objectContaining(tutorData2));

        // Você também pode verificar o tamanho do array e outras informações, se necessário
    }, 15000); // Definindo o timeout para 15 segundos
});
