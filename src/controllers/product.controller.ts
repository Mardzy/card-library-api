import { Response, Request, NextFunction } from 'express';

import { addCards, createProduct } from '../services';

/**
 * Add product
 * POST /api/products
 * @param req
 * @param res
 * @param next
 * @todo don't let sets be added that are already in the system
 */
export async function addProduct(
    { body }: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { fileData, manufacturer, name, year } = body;

        const { id: product_id } = await createProduct({
            manufacturer,
            name,
            year
        });

        const { cardsLength } = await addCards(fileData, product_id);
        const message = `Successfully added ${year} ${manufacturer} ${name}, ${cardsLength} cards!!`;
        res.status(201).json({
            status: 201,
            message
        });

        console.info(message);
    } catch (err) {
        const error = err as Error;
        console.error('Add Product Error', error.message, error.stack);

        res.status(500).send(error);
        next(error);
    }
}

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
