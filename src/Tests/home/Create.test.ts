import request from 'supertest';
import { testServer } from '../jest.setup';
import { Response } from 'supertest';
import { describe } from 'node:test';

describe('Home - Create', () => {
    it('Deve retornar status 200 e uma mensagem de sucesso', async () => {
        const response: Response = await request(testServer).get('/');
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('Success'); // Replace 'message' with the actual key for the success message in the response body
    });
});


