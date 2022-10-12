"use strict";
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
        while (_) try {
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
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var mongodb_1 = require("mongodb");
var types_1 = require("./types");
var dotenv_1 = require("dotenv");
var AccountManager = /** @class */ (function () {
    function AccountManager(url) {
        this.client = new mongodb_1.MongoClient(url);
    }
    AccountManager.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _a.sent();
                        this.db = this.client.db("margon");
                        this.collection = this.db.collection("accounts");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AccountManager.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AccountManager.prototype.getAccounts = function (worldname) {
        return __awaiter(this, void 0, void 0, function () {
            var data, accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = worldname === "all" ? {} : { "hero.worldname": worldname };
                        return [4 /*yield*/, this.collection.find(data).toArray()];
                    case 1:
                        accounts = _a.sent();
                        return [2 /*return*/, accounts];
                }
            });
        });
    };
    return AccountManager;
}());
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var router = (0, express_1.Router)();
var PORT = process.env.PORT || 5000;
var URI = process.env.URI;
if (!URI)
    throw new Error("no URI!");
var Manager = new AccountManager(URI);
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use((0, cors_1["default"])());
app.use("/api", router);
app.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Server is running on port ".concat(PORT));
                return [4 /*yield*/, Manager.open()];
            case 1:
                _a.sent();
                console.log("MongoDB is connected");
                return [2 /*return*/];
        }
    });
}); });
app.get('/', function (req, res) {
    res.send('hello world');
});
var checkWorldname = function (worldname) {
    return worldname === "all" || types_1.worlds.includes(worldname);
};
router.route('/getAccounts/:worldname').get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!checkWorldname(req.params.worldname)) return [3 /*break*/, 1];
                res.status(400).send("Invalid worldname");
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, Manager.getAccounts(req.params.worldname)];
            case 2:
                accounts = _a.sent();
                res.send(JSON.stringify(accounts));
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
