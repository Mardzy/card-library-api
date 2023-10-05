import { Router } from 'express';

import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from '../controllers';

const router = Router();

router.post('/products', addProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export { router };
