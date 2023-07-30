import request from "supertest";
import { server } from "../../../server";
import { App } from "../../../app/app";

describe('TutorController', () => {
    let app: App;
    const PORT = 5001;
    let httpServer: any;
    let tutorId: number; // We'll store the tutor's ID for deletion

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
            tutorId = response.body.id; // Store the tutor's ID for deletion
        } catch (error) {
            return error
        }
    }, 15000); // Definindo o timeout para 15 segundos

    it('should retrieve all Tutors', async () => {
        try {
            const response = await request(app.server)
                .get('/tutor')
                .expect(201);

            expect(response.body).toBeDefined();
            expect(response.body.length).toBeGreaterThan(0); // Check if the response contains at least one tutor
            expect(response.statusCode).toBe(200);
            // Add additional assertions, if needed, to verify the response for retrieving all tutors
        } catch (error) {
            return error
        }
    }, 15000); // Definindo o timeout para 15 segundos

    it('should delete a Tutor', async () => {
        try {
            const response = await request(app.server)
                .delete(`/tutor/${tutorId}`) // Use the stored tutor's ID for deletion
                .expect(204);

            expect(response.body).toBeDefined();
            expect(response.statusCode).toBe(200);
            // Add additional assertions, if needed, to verify the response after deletion
        } catch (error) {
            return  error
        }
    }, 15000); // Definindo o timeout para 15 segundos
});

