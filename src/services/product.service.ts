import { postgresDataSource } from '../connections';
import { Product } from '../entities';
import { deleteCardById, getAllCardsByProductId } from '../services';

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
        console.error('Create product service error', error.message);

        return { message, status: 409, product_id: '' };
    }

    const newProduct = productRepository.create(product);

    try {
        await productRepository.insert(newProduct);
        const { id, manufacturer, name, year } = newProduct;
        const productMessage = `${year} ${manufacturer} ${name} created`;
        return {
            message: productMessage,
            status: 201,
            product_id: id
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
            relations: { cards: true },
            select: { id: true, name: true, manufacturer: true, year: true }
        });
        message = `${products.length} items found in PRODUCTS table`;

        return { message, status: 200, products };
    } catch (err) {
        const error = err as Error;
        message = `Fetch Products Service Error: ${error.message}`;
        console.error(message, error.stack);

        return { message, status: 500 };
    }
};

export const fetchProductById = async (product_id: string) => {
    let message: string;

    try {
        const product = await productRepository.findOne({
            select: { id: true, name: true, manufacturer: true, year: true },
            relations: { cards: true },
            where: { id: product_id }
        });
        message = `${product?.year} ${product?.name} item found in PRODUCTS table with ${product?.cards.length} cards`;

        return { message, status: 200, product };
    } catch (err) {
        const error = err as Error;
        message = `Fetch Product by Id Service Error: ${error.message}`;
        console.error(message, error.stack);

        return { message, status: 500 };
    }
};

export const updateProductById = async (
    productToUpdate: Product,
    id: string
) => {
    let message: string;
    const { manufacturer, name, year } = productToUpdate;

    try {
        await productRepository.update(
            { id: id },
            { manufacturer, name, year }
        );
        const product = await productRepository.findOne({
            where: { id }
        });
        message = `${product?.year} ${product?.name} updated in PRODUCTS table`;

        return { message, status: 200, product };
    } catch (err) {
        const error = err as Error;
        message = `Update Product Service Error: ${error.message}`;
        console.error(message, error.stack);

        return { message, status: 304 };
    }
};

export const deleteProductById = async (id: string) => {
    let message: string;

    try {
        const {
            cards,
            message: fetchCardsMessage,
            status: fetchCardsStatus
        } = await getAllCardsByProductId(id);

        const product = await productRepository.findOne({
            where: { id: id }
        });

        try {
            if (cards) {
                for (let i = 0; i < cards?.length; i++) {
                    await deleteCardById(cards[i].id);
                }
            }
        } catch (err) {
            const error = err as Error;
            message = `Delete product cards service error: ${error.message}`;
            console.error(message, error.stack);

            return { message, status: 500 };
        }

        await productRepository.delete({
            id: id
        });

        message = `Product ${product?.year} ${product?.name} and ${fetchCardsMessage} deleted from PRODUCTS & CARDS tables`;

        return { message, status: fetchCardsStatus };
    } catch (err) {
        const error = err as Error;
        message = `Delete Product Service Error: ${error.message}`;
        console.error(message, error.stack);

        return { message, status: 500 };
    }
};
