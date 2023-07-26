import { testServer } from '../jest.setup';

describe('Home - Create', () => {

    it('Cria registro', async () => {
        const res1 = await testServer.post('/tutors').send({
            name: 'Dani Liu',
            email: 'DaniLiu_@compasso.com',
            phone: 8892725344,
            zip_code: '63500284',
            date_of_birth: '1993-03-23 10:10',
        });

        expect(res1.statusCode).toEqual(201);
        expect(typeof res1.body).toEqual('object');
    });
});

