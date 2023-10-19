var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import request from 'supertest';
import { expect } from '@jest/globals';
import { server } from '@connections';
jest.mock('@services', () => ({
    createProduct: (product) => {
        if (product.manufacturer && product.name && product.year) {
            return { message: 'pass', status: 201, product_id: '122a' };
        }
        else {
            return { message: 'fail', status: 500, product_id: '' };
        }
    },
    insertCards: (fileData, product_id) => {
        return { message: `pass ${fileData} ${product_id}`, status: 201 };
    },
    matchProduct: (product) => product.id && product.manufacturer && product.name && product.year
        ? { message: 'pass', status: 200 }
        : { message: 'fail', status: 409 }
}));
describe('Add Product Service: ', () => {
    it('add product request should return 201 status', () => __awaiter(void 0, void 0, void 0, function* () {
        const fileData = 'aaa';
        const manufacturer = 'Upper Deck';
        const name = 'Series 1';
        const year = '2020-21';
        const body = { fileData, manufacturer, name, year };
        const { body: resBody } = yield request(server)
            .post('/api/products')
            .send(body);
        expect(resBody.status).toBe(201);
        expect(resBody.message).toBe('pass aaa 122a');
    }));
    it('add product request should return 500 status', () => __awaiter(void 0, void 0, void 0, function* () {
        const fileData = '';
        const manufacturer = '';
        const name = '';
        const year = '';
        const body = { fileData, manufacturer, name, year };
        const { body: resBody } = yield request(server)
            .post('/api/products')
            .send(body);
        expect(resBody.status).toBe(500);
        expect(resBody.message).toBe('fail');
    }));
});
//# sourceMappingURL=product.spec.js.map