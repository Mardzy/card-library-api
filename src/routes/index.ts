import * as Express from 'express';
import { addProduct } from '../controllers';

const router = Express.Router();

router.post('/products', addProduct);

export = router;
