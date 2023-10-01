var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { postgresDataSource } from 'connections';
import { Product } from 'entities';
import { deleteCardById, getAllCardsByProductId } from 'services';
var productRepository = postgresDataSource.getRepository(Product);
var matchProduct = function (_a) {
    var proposedId = _a.id, manufacturer = _a.manufacturer, name = _a.name, year = _a.year;
    return __awaiter(void 0, void 0, void 0, function () {
        var message, status, product, err_1, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4, productRepository.findOne({
                            where: {
                                id: proposedId,
                                manufacturer: manufacturer,
                                name: name,
                                year: year
                            }
                        })];
                case 1:
                    product = _b.sent();
                    if (product === null || product === void 0 ? void 0 : product.id) {
                        message = 'Item found in PRODUCTS table.';
                        status = 200;
                    }
                    else {
                        message = 'Item not found in PRODUCTS table';
                        status = 404;
                    }
                    return [2, { message: message, status: status }];
                case 2:
                    err_1 = _b.sent();
                    error = err_1;
                    message = "Match product service error ".concat(error.message);
                    status = 500;
                    console.log('Match product service error', error.stack);
                    return [2, { message: message, status: status }];
                case 3: return [2];
            }
        });
    });
};
export var createProduct = function (product) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, matchProductStatus, message, error, newProduct, err_2, error, errorMessage;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4, matchProduct(product)];
            case 1:
                _a = _b.sent(), matchProductStatus = _a.status, message = _a.message;
                if (matchProductStatus === 200) {
                    error = new Error(message);
                    console.error('Create product service error', error.message, error.stack);
                    return [2, { message: message, status: 409, product_id: '' }];
                }
                newProduct = productRepository.create(product);
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4, productRepository.insert(newProduct)];
            case 3:
                _b.sent();
                return [2, {
                        message: 'Item added to PRODUCTS table',
                        status: 201,
                        product_id: newProduct.id
                    }];
            case 4:
                err_2 = _b.sent();
                error = err_2;
                errorMessage = "Create product service error ".concat(error.message);
                console.error(errorMessage, error.stack);
                return [2, { message: errorMessage, status: 500, product_id: '' }];
            case 5: return [2];
        }
    });
}); };
export var fetchProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var message, products, err_3, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, productRepository.find({
                        select: { id: true, name: true, manufacturer: true, year: true }
                    })];
            case 1:
                products = _a.sent();
                message = "".concat(products.length, " items found in PRODUCTS table");
                return [2, { message: message, status: 200, products: products }];
            case 2:
                err_3 = _a.sent();
                error = err_3;
                message = "Fetch Products Service Error: ".concat(error.message);
                console.error(message, error.stack);
                return [2, { message: message, status: 500 }];
            case 3: return [2];
        }
    });
}); };
export var fetchProductById = function (product_id) { return __awaiter(void 0, void 0, void 0, function () {
    var message, product, err_4, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, productRepository.findOne({
                        where: { id: product_id },
                        relations: { cards: true },
                        select: { id: true, name: true, manufacturer: true, year: true }
                    })];
            case 1:
                product = _a.sent();
                message = "".concat(product === null || product === void 0 ? void 0 : product.year, " ").concat(product === null || product === void 0 ? void 0 : product.name, " item found in PRODUCTS table with ").concat(product === null || product === void 0 ? void 0 : product.cards.length, " cards");
                return [2, { message: message, status: 200, product: product }];
            case 2:
                err_4 = _a.sent();
                error = err_4;
                message = "Fetch Product by Id Service Error: ".concat(error.message);
                console.error(message, error.stack);
                return [2, { message: message, status: 500 }];
            case 3: return [2];
        }
    });
}); };
export var updateProductById = function (productToUpdate, id) { return __awaiter(void 0, void 0, void 0, function () {
    var message, manufacturer, name, year, product, err_5, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                manufacturer = productToUpdate.manufacturer, name = productToUpdate.name, year = productToUpdate.year;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, productRepository.update({ id: id }, { manufacturer: manufacturer, name: name, year: year })];
            case 2:
                _a.sent();
                return [4, productRepository.findOne({
                        where: { id: id }
                    })];
            case 3:
                product = _a.sent();
                message = "".concat(product === null || product === void 0 ? void 0 : product.year, " ").concat(product === null || product === void 0 ? void 0 : product.name, " updated in PRODUCTS table");
                return [2, { message: message, status: 200, product: product }];
            case 4:
                err_5 = _a.sent();
                error = err_5;
                message = "Update Product Service Error: ".concat(error.message);
                console.error(message, error.stack);
                return [2, { message: message, status: 304 }];
            case 5: return [2];
        }
    });
}); };
export var deleteProductById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var message, _a, cards, fetchCardsMessage, fetchCardsStatus, product, i, err_6, error, err_7, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                return [4, getAllCardsByProductId(id)];
            case 1:
                _a = _b.sent(), cards = _a.cards, fetchCardsMessage = _a.message, fetchCardsStatus = _a.status;
                return [4, productRepository.findOne({
                        where: { id: id }
                    })];
            case 2:
                product = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 8, , 9]);
                if (!cards) return [3, 7];
                i = 0;
                _b.label = 4;
            case 4:
                if (!(i < (cards === null || cards === void 0 ? void 0 : cards.length))) return [3, 7];
                return [4, deleteCardById(cards[i].id)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                i++;
                return [3, 4];
            case 7: return [3, 9];
            case 8:
                err_6 = _b.sent();
                error = err_6;
                message = "Delete product cards service error: ".concat(error.message);
                console.error(message, error.stack);
                return [2, { message: message, status: 500 }];
            case 9: return [4, productRepository.delete({
                    id: id
                })];
            case 10:
                _b.sent();
                message = "Product ".concat(product === null || product === void 0 ? void 0 : product.year, " ").concat(product === null || product === void 0 ? void 0 : product.name, " and ").concat(fetchCardsMessage, " deleted from PRODUCTS & CARDS tables");
                return [2, { message: message, status: fetchCardsStatus }];
            case 11:
                err_7 = _b.sent();
                error = err_7;
                message = "Delete Product Service Error: ".concat(error.message);
                console.error(message, error.stack);
                return [2, { message: message, status: 500 }];
            case 12: return [2];
        }
    });
}); };
