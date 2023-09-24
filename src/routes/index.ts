import * as Express from 'express';
import { addProduct, getAllProducts, getProductById } from '../controllers';

const router = Express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', addProduct);

export = router;
