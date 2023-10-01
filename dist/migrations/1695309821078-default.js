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
var Default1695309821078 = (function () {
    function Default1695309821078() {
        this.name = 'Default1695309821078';
    }
    Default1695309821078.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("CREATE TABLE \"products\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"manufacturer\" text NOT NULL, \"year\" text NOT NULL, \"name\" text NOT NULL, CONSTRAINT \"PK_0806c755e0aca124e67c0cf6d7d\" PRIMARY KEY (\"id\"))")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"cards\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"set_name\" text NOT NULL, \"card\" text NOT NULL, \"description\" text NOT NULL, \"team_city\" text, \"team_name\" text, \"rookie\" text, \"auto\" text, \"mem\" text, \"serial_numbered\" text, \"odds\" text NOT NULL, \"point\" integer NOT NULL, \"product_id\" uuid NOT NULL, CONSTRAINT \"PK_5f3269634705fdff4a9935860fc\" PRIMARY KEY (\"id\"))")];
                    case 2:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"cards\" ADD CONSTRAINT \"FK_a3127809fa59bcff2205e2f44b5\" FOREIGN KEY (\"product_id\") REFERENCES \"products\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Default1695309821078.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE \"cards\" DROP CONSTRAINT \"FK_a3127809fa59bcff2205e2f44b5\"")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"cards\"")];
                    case 2:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"products\"")];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return Default1695309821078;
}());
export { Default1695309821078 };
