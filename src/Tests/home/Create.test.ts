import request from 'supertest';
import { server } from '../jest.setup';
import { Response } from 'supertest';
import { describe } from 'node:test';

describe('Home - Create', () => {
    it('Deve retornar status 200 e uma mensagem de sucesso', async () => {
        const response = await server.get('/');
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('Success');
    });
});


