import request from 'supertest';
import { expect } from '@jest/globals';

import { server } from '@connections';
import { Product } from '@entities';

jest.mock('@services', () => ({
    createProduct: (product: Partial<Product>) => {
        if (product.manufacturer && product.name && product.year) {
            return { message: 'pass', status: 201, product_id: '122a' };
        } else {
            return { message: 'fail', status: 500, product_id: '' };
        }
    },
    insertCards: (fileData: string, product_id: string) => {
        return { message: `pass ${fileData} ${product_id}`, status: 201 };
    },

    matchProduct: (product: Partial<Product>) =>
        product.id && product.manufacturer && product.name && product.year
            ? { message: 'pass', status: 200 }
            : { message: 'fail', status: 409 }
}));
describe('Add Product Route: ', () => {
    it('add product request should return 201 status', async () => {
        const fileData = 'aaa';
        const manufacturer = 'Upper Deck';
        const name = 'Series 1';
        const year = '2020-21';
        const body = { fileData, manufacturer, name, year };

        const { body: resBody } = await request(server)
            .post('/api/products')
            .send(body);

        expect(resBody.status).toBe(201);
        expect(resBody.message).toBe('pass aaa 122a');
    });

    it('add product request should return 500 status', async () => {
        const fileData = '';
        const manufacturer = '';
        const name = '';
        const year = '';
        const body = { fileData, manufacturer, name, year };

        const { body: resBody } = await request(server)
            .post('/api/products')
            .send(body);

        expect(resBody.status).toBe(500);
        expect(resBody.message).toBe('fail');
    });
});
