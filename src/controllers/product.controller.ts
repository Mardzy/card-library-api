import { Response, Request, NextFunction } from 'express';

import {
    insertCards,
    createProduct,
    fetchProducts,
    fetchProductById,
    updateProductById,
    deleteProductById
} from '../services';

/**
 * Add product
 * POST /api/products
 * @param req
 * @param res
 * @param next
 */
export async function addProduct(
    { body }: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { fileData, manufacturer, name, year } = body;

        const { message, status, product_id } = await createProduct({
            manufacturer,
            name,
            year
        });

        if (status === 201) {
            const { message, status } = await insertCards(fileData, product_id);

            res.status(status).json({
                status,
                message
            });
        } else {
            const err = new Error(message);
            res.status(status).send(err);
        }
    } catch (err) {
        const error = err as Error;
        console.error('Add Product Error', error.message, error.stack);

        res.status(500).send(error);
        next(error);
    }
}

export const getAllProducts = async (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { message, status, products } = await fetchProducts();
        console.info('GET products', message);

        res.status(status).json({ products, status });
        next();
    } catch (err) {
        const error = err as Error;
        console.error('Add Product Error', error.message, error.stack);

        res.status(500).json({ status: 500, products: undefined });
        next(error);
    }
};

export const getProductById = async (
    { params: { uid } }: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { message, status, product } = await fetchProductById(uid);
        console.info('GET product by id', message);

        res.status(status).json({ product, status });
        next();
    } catch (err) {
        const error = err as Error;
        const message = `Add Product Error: ${error.message}`;
        console.error(message, error.stack);

        next(error);
    }
};

export const getSpecificProducts = (req: Request, res: Response) => {
    console.log('request: ', req);
    console.log('response: ', res);
};

export const updateProduct = async (
    { params: { id }, body }: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { message, status, product } = await updateProductById(body, id);
        console.log('product: ', product);
        console.info('Update Product: ', message);

        res.status(status).json({ product, status });
        next();
    } catch (err) {
        const error = err as Error;
        const message = `Add Product Error: ${error.message}`;
        console.error(message, error.stack);

        next(error);
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { message, status } = await deleteProductById(req.params.id);
        res.status(status).json({ message, status });
        console.info('Delete Product Success: ', message);
        next();
    } catch (err) {
        const error = err as Error;
        const message = `Delete Product Error: ${error.message}`;
        console.error(message, error.stack);

        next(error);
    }
};
