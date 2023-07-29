//DeleteTutorController.spec.ts
import request from "supertest";
import { server } from "../server";
import { App } from "../app/app";

describe('DeleteTutorController', () => {
    let app: App;
    const PORT = 5002;
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

    it('should delete a Tutor', async () => {
        // Implemente o teste para deletar um tutor, seguindo o mesmo padrão usado no teste de criação
        const tutorId = "64c42a3d84bbdf23fac9e8df";
        const response = await request(app.server)
            .delete(`/tutor/${tutorId}`)
            .expect(204); // Espera-se que o status de retorno seja 204 (No Content)

        expect(response.body).toBeDefined();
        expect(response.statusCode).toBe(204);
        // Faça asserções adicionais, se necessário, para verificar a resposta
    }, 15000); // Definindo o timeout para 15 segundos
});
