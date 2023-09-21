import { postgresDataSource } from '../connections';
import { Product } from '../entities';

const productRepository = postgresDataSource.getRepository(Product);

export const createProduct = async (product: Partial<Product>) => {
    const newProduct = productRepository.create(product);

    const res = await productRepository.insert(newProduct);
    return { res, ...newProduct };
};
