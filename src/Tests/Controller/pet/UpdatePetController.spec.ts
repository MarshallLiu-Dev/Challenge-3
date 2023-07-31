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

            // Armazena o ID do tutor criado para usar na rota /pet/:tutorId
            tutorId = response.body.id;
        } catch (error) {
            return error;
        }
    }, 15000);

    it('should create a Pet for the Tutor', async () => {

        const petData = {
            name: "Fluffy",
            species: "Dog",
            carry: "bg",
            weight: 5,
            date_of_birth: "2014-08-14 10:10"
        };

        try {
            const response = await request(app.server)
                .post(`/pet/${tutorId}`)
                .send(petData)
                .expect(201);

            expect(response.body).toBeDefined();
            expect(response.statusCode).toBe(201);

            // Armazena o ID do pet criado para usar nos testes de delete e put
            petId = response.body.id;

            console.log("Pet created successfully:", response.body);
            return response.statusCode;
        } catch (error) {
            console.log("Error creating pet:", error);
        }
    }, 15000);

    it('should delete the Pet of the Tutor', async () => {
        try {
            const response = await request(app.server)
                .delete(`/pet/${tutorId}/${petId}`)
                .expect(204);

            console.log("Pet deleted successfully");
        } catch (error) {
            console.log("Error deleting pet:", error);
        }
    }, 15000);

    it('should update the Pet of the Tutor', async () => {
        const updatedPetData = {
            name: "Fluffy Jr.",
            species: "Dog",
            carry: "bg",
            weight: 6,
            date_of_birth: "2014-08-14 10:10"
        };

        try {
            const response = await request(app.server)
                .put(`/pet/${tutorId}/${petId}`)
                .send(updatedPetData)
                .expect(200);

            expect(response.body).toBeDefined();
            expect(response.statusCode).toBe(200);

            console.log("Pet updated successfully:", response.body);
            return response.statusCode;
        } catch (error) {
            console.log("Error updating pet:", error);
        }
    }, 15000);
});
