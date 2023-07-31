import request from "supertest";
import { server } from "../../../server";
import { App } from "../../../app/app";

describe('CreatePetController', () => {
    let app: App;
    const PORT = 5001;
    let httpServer: any;
    let tutorId: string; // Vamos armazenar o ID do tutor criado para usar na rota /pet/:tutorId
    let petId: string; // Vamos armazenar o ID do pet criado para usar nos testes de delete e put

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

    it('should get all Pets of the Tutor', async () => {
        try {
            const response = await request(app.server)
                .get(`/pet/${tutorId}`)
                .expect(200);

            expect(response.body).toBeDefined();
            expect(response.statusCode).toBe(200);

            console.log("All Pets of the Tutor:", response.body);
            return response.statusCode;
        } catch (error) {
            console.log("Error getting all Pets:", error);
        }
    }, 15000);
});
