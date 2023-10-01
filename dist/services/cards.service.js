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
import { parse } from 'csv-parse/sync';
import { postgresDataSource } from 'connections';
import { Card } from 'entities';
import { lowercaseKeys } from 'utils';
var cardRepository = postgresDataSource.getRepository(Card);
export var insertCards = function (fileData, product_id) { return __awaiter(void 0, void 0, void 0, function () {
    var cards, cardList, message, i, cardItem, err_1, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cards = parse(fileData, {
                    columns: true,
                    from_line: 1
                });
                cardList = cards.map(function (cardItem) {
                    var _a = lowercaseKeys(cardItem), set_name = _a.set_name, card = _a.card, description = _a.description, team_name = _a.team_name, rookie = _a.rookie, auto = _a.auto, mem = _a.mem, serial_numbered = _a.serial_numbered, odds = _a.odds, point = _a.point;
                    return {
                        product_id: product_id,
                        set_name: set_name || null,
                        card: card || null,
                        description: description || null,
                        team_name: team_name || null,
                        rookie: rookie || null,
                        auto: auto || null,
                        mem: mem || null,
                        serial_numbered: serial_numbered || null,
                        odds: odds || null,
                        point: Number(point)
                    };
                });
                message = "".concat(cardList.length, " items added to CARDS table.");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < cardList.length)) return [3, 5];
                cardItem = cardList[i];
                cardRepository.create(cardItem);
                return [4, cardRepository.insert(cardItem)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3, 2];
            case 5: return [2, { message: message, status: 201 }];
            case 6:
                err_1 = _a.sent();
                error = err_1;
                message = "CARDS table insert error ".concat(error.message);
                console.log(message, error.stack);
                return [2, { message: message, status: 500 }];
            case 7: return [2];
        }
    });
}); };
export var getAllCardsByProductId = function (product_id) { return __awaiter(void 0, void 0, void 0, function () {
    var message, cards, err_2, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, cardRepository.find({
                        where: { product_id: product_id }
                    })];
            case 1:
                cards = _a.sent();
                message = "".concat(cards.length || 'No', " cards found matching product id ").concat(product_id);
                return [2, { cards: cards, message: message, status: 200 }];
            case 2:
                err_2 = _a.sent();
                error = err_2;
                message = "Get all cards by product id service error: ".concat(error.message);
                console.error(message, error.stack);
                return [2, { message: message, status: 500 }];
            case 3: return [2];
        }
    });
}); };
export var deleteCardById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var err_3, error, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, cardRepository.delete({ id: id })];
            case 1:
                _a.sent();
                return [3, 3];
            case 2:
                err_3 = _a.sent();
                error = err_3;
                message = "Delete card by id service error: ".concat(error.message);
                console.error(message, error.stack);
                return [2, { message: message, status: 500 }];
            case 3: return [2];
        }
    });
}); };
