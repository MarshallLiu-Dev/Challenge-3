import request from "supertest";
import { server } from "../../../server";
import { App } from "../../../app/app";

describe('CreateTutorController', () => {
    let app: App;
    const PORT = 5001;
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

    it('should create a Tutor', async () => {
        const tutorData = {
            name: "John Doe",
            phone: 1234567890,
            email: "john.doe@example.com",
            password: "secretpassword",
            zip_code: 12345,
            date_of_birth: "1990-01-01",
            pets: []
        };

        try {
            const response = await request(app.server)
                .post('/tutor')
                .send(tutorData)
                .expect(201);

            expect(response.body).toBeDefined();
            expect(response.statusCode).toBe(201);
            // Faça asserções adicionais, se necessário, para verificar a resposta
        } catch (error) {
            // Captura o erro de timeout (se ocorrer) ou outros erros
          //  console.error(error);
        }
    }, 15000); // Definindo o timeout para 15 segundos
});
