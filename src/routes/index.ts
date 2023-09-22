import * as Express from 'express';
import { addProduct, getAllProducts } from '../controllers';

const router = Express.Router();

router.get('/products', getAllProducts);
router.post('/products', addProduct);

export = router;
