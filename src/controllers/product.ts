import { Response, Request } from 'express';

/**
 * Add product
 * POST /api/addProduct
 * @param req
 * @param res
 */
export const addProduct = ({ body }: Request, res: Response) => {
    try {
        console.log('Add Product', body);

        res.status(201).json({
            code: 201,
            message: 'Successfully added product'
        });
    } catch (e) {
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
