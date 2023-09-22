import { postgresDataSource } from '../connections';
import { Product } from '../entities';

const productRepository = postgresDataSource.getRepository(Product);

const matchProduct = async ({
    id: proposedId,
    manufacturer,
    name,
    year
}: Partial<Product>) => {
    let message: string;
    let status: number;

    try {
        const product = await productRepository.findOne({
            where: {
                id: proposedId,
                manufacturer: manufacturer,
                name: name,
                year: year
            }
        });

        if (product?.id) {
            message = 'Item found in PRODUCTS table.';
            status = 200;
        } else {
            message = 'Item not found in PRODUCTS table';
            status = 404;
        }
        return { message, status };
    } catch (err) {
        const error = err as Error;
        message = `Match product service error ${error.message}`;
        status = 500;
        console.log('Match product service error', error.stack);
        return { message, status };
    }
};

export const createProduct = async (product: Partial<Product>) => {
    const { status: matchProductStatus, message } = await matchProduct(product);

    if (matchProductStatus === 200) {
        const error = new Error(message);
        console.error(
            'Create product service error',
            error.message,
            error.stack
        );

        return { message, status: 409, product_id: '' };
    }

    const newProduct = productRepository.create(product);

    try {
        await productRepository.insert(newProduct);

        return {
            message: 'Item added to PRODUCTS table',
            status: 201,
            product_id: newProduct.id
        };
    } catch (err) {
        const error = err as Error;
        const errorMessage = `Create product service error ${error.message}`;
        console.error(errorMessage, error.stack);

        return { message: errorMessage, status: 500, product_id: '' };
    }
};

export const fetchProducts = async () => {
    let message: string;
    try {
        const products = await productRepository.find({
            select: { id: true, name: true, manufacturer: true, year: true }
        });
        message = `${products.length} items found in PRODUCTS table`;

        return { message, status: 200, products };
    } catch (err) {
        const error = err as Error;
        message = `Add Product Service Error: ${error.message}`;
        console.error(message, error.stack);

        return { message, status: 500 };
    }
};
