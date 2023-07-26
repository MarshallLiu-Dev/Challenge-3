import { server } from '../server';
import supertest from 'supertest';

export const testServer = supertest(server);
