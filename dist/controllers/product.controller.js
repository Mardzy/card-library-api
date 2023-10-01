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
import { insertCards, createProduct, fetchProducts, fetchProductById, updateProductById, deleteProductById } from 'services';
export function addProduct(_a, res, next) {
    var body = _a.body;
    return __awaiter(this, void 0, void 0, function () {
        var fileData, manufacturer, name, year, _b, message, status, product_id, _c, message_1, status_1, err, err_1, error;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, , 6]);
                    fileData = body.fileData, manufacturer = body.manufacturer, name = body.name, year = body.year;
                    return [4, createProduct({
                            manufacturer: manufacturer,
                            name: name,
                            year: year
                        })];
                case 1:
                    _b = _d.sent(), message = _b.message, status = _b.status, product_id = _b.product_id;
                    if (!(status === 201)) return [3, 3];
                    return [4, insertCards(fileData, product_id)];
                case 2:
                    _c = _d.sent(), message_1 = _c.message, status_1 = _c.status;
                    res.status(status_1).json({
                        status: status_1,
                        message: message_1
                    });
                    return [3, 4];
                case 3:
                    err = new Error(message);
                    res.status(status).send(err);
                    _d.label = 4;
                case 4: return [3, 6];
                case 5:
                    err_1 = _d.sent();
                    error = err_1;
                    console.error('Add Product Error', error.message, error.stack);
                    res.status(500).send(error);
                    next(error);
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
}
export var getAllProducts = function (_, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, message, status, products, err_2, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4, fetchProducts()];
            case 1:
                _a = _b.sent(), message = _a.message, status = _a.status, products = _a.products;
                console.info('GET products', message);
                res.status(status).json({ products: products, status: status });
                next();
                return [3, 3];
            case 2:
                err_2 = _b.sent();
                error = err_2;
                console.error('Add Product Error', error.message, error.stack);
                res.status(500).json({ status: 500, products: undefined });
                next(error);
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
export var getProductById = function (_a, res, next) {
    var uid = _a.params.uid;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, message, status, product, err_3, error, message;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4, fetchProductById(uid)];
                case 1:
                    _b = _c.sent(), message = _b.message, status = _b.status, product = _b.product;
                    console.info('GET product by id', message);
                    res.status(status).json({ product: product, status: status });
                    next();
                    return [3, 3];
                case 2:
                    err_3 = _c.sent();
                    error = err_3;
                    message = "Add Product Error: ".concat(error.message);
                    console.error(message, error.stack);
                    next(error);
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
};
export var getSpecificProducts = function (req, res) {
    console.log('request: ', req);
    console.log('response: ', res);
};
export var updateProduct = function (_a, res, next) {
    var id = _a.params.id, body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, message, status, product, err_4, error, message;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4, updateProductById(body, id)];
                case 1:
                    _b = _c.sent(), message = _b.message, status = _b.status, product = _b.product;
                    console.log('product: ', product);
                    console.info('Update Product: ', message);
                    res.status(status).json({ product: product, status: status });
                    next();
                    return [3, 3];
                case 2:
                    err_4 = _c.sent();
                    error = err_4;
                    message = "Add Product Error: ".concat(error.message);
                    console.error(message, error.stack);
                    next(error);
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
};
export var deleteProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, message, status, err_5, error, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4, deleteProductById(req.params.id)];
            case 1:
                _a = _b.sent(), message = _a.message, status = _a.status;
                res.status(status).json({ message: message, status: status });
                console.info('Delete Product Success: ', message);
                next();
                return [3, 3];
            case 2:
                err_5 = _b.sent();
                error = err_5;
                message = "Delete Product Error: ".concat(error.message);
                console.error(message, error.stack);
                next(error);
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
