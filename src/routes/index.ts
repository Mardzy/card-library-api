import * as Express from 'express';
import { addProduct } from '../controllers';

const router = Express.Router();

router.get('add-product', addProduct);
