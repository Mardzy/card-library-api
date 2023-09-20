import { Response, Request } from 'express';
import { parse } from 'csv-parse/sync';

import { postgresDataSource } from '../connections';
import { Card, Product } from '../entities';

/**
 * Add product
 * POST /api/addProduct
 * @param req
 * @param res
 */
export const addProduct = ({ body }: Request, res: Response) => {
    try {
        const { manufacturer, year, name, fileData } = body;
        const productCards: Card[] = parse(fileData, {
            columns: true,
            from_line: 3
        });

        const product = postgresDataSource.getRepository(Product).create({
            manufacturer,
            year,
            name
        });

        productCards.forEach((card) => {
            postgresDataSource.getRepository(Card).create(card);
        });

        const results = postgresDataSource
            .getRepository(Product)
            .insert(product);

        console.log('productCards: ', productCards);

        res.status(201).json({
            code: 201,
            message: 'Successfully added product',
            productCards
        });

        res.send(productCards);
    } catch (e) {
        console.error('Add Product Error', e);

        res.status(500).send(e);
    }
};

export const getAllProducts = (req: Request, res: Response) => {
    console.log('request: ', req);
    console.log('response: ', res);
};

export const getProduct = (req: Request, res: Response) => {
    console.log('request: ', req);
    console.log('response: ', res);
};

export const getSpecificProducts = (req: Request, res: Response) => {
    console.log('request: ', req);
    console.log('response: ', res);
};

export const updateProduct = (req: Request, res: Response) => {
    console.log('request: ', req);
    console.log('response: ', res);
};

export const deleteProduct = (req: Request, res: Response) => {
    console.log('request: ', req);
    console.log('response: ', res);
};
