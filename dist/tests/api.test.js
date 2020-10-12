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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../app");
describe('Tests for endpoints', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).post('/api/washingMachine').send({
                        serialNumber: 388,
                        model: 'testing model',
                        dateOfManufacture: Date.now().toLocaleString(),
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('POST - /api/washingMachine - empty body', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        post('/api/washingMachine')];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, message = _a.message;
                    expect(response.status).toBe(500);
                    expect(status).toBe('error');
                    expect(message).toContain('validation failed');
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('POST - /api/washingMachine - with data', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        post('/api/washingMachine').
                        send({
                        serialNumber: 936,
                        model: 'testing model',
                        dateOfManufacture: Date.now().toLocaleString(),
                    })];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data;
                    expect(response.status).toBe(201);
                    expect(status).toBe('success');
                    expect(data).toBeInstanceOf(Object);
                    expect(typeof data.model).toBe('string');
                    expect(typeof data.serialNumber).toBe('number');
                    expect(typeof data.dateOfManufacture).toBe('string');
                    expect(typeof data.status).toBe('boolean');
                    expect(data.status).toBeTruthy();
                    expect(typeof data.washingCycles).toBe('number');
                    expect(data.washingCycles).toEqual(0);
                    expect(data.historyOfErrors).toBeInstanceOf(Array);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('POST - /api/washingMachine - get error if serial number exist', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        post('/api/washingMachine').
                        send({
                        serialNumber: 936,
                        model: 'testing model',
                        dateOfManufacture: Date.now().toLocaleString(),
                    })];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, message = _a.message;
                    expect(response.status).toBe(500);
                    expect(status).toBe('error');
                    expect(message).toContain('duplicate key');
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('GET - /api/washingMachine - get all machines', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        get('/api/washingMachine')];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data;
                    expect(response.status).toBe(200);
                    expect(status).toBe('success');
                    expect(data).toBeInstanceOf(Array);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('GET - /api/washingMachine/status/:status - get machines with the same' +
        ' status', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        get('/api/washingMachine/status/true')];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data;
                    expect(response.status).toBe(200);
                    expect(status).toBe('success');
                    expect(data[0].status).toEqual(data[1].status);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('PATCH - /api/washingMachine/errorList/:serialNumber - get an updated' +
        ' error list', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        patch('/api/washingMachine/errorList/388').
                        send({
                        error: { code: 'E204', errorText: 'Поломка' },
                    })];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data;
                    expect(status).toBe('success');
                    expect(data.errorList.length).toBe(1);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('PATCH - /api/washingMachine/errorList/:serialNumber - get failed if' +
        ' serialNumber isn\'t valid', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, data, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        patch('/api/washingMachine/errorList/1230').
                        send({
                        error: { code: 'E204', errorText: 'Поломка' },
                    })];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data, message = _a.message;
                    expect(status).toBe('failed');
                    expect(message).toContain('не найдена');
                    expect(data).toBeUndefined();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('PATCH - /api/washingMachine/:serialNumber - get an updated machine', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        patch('/api/washingMachine/388').
                        send({
                        updates: {
                            washingCycles: 900,
                        },
                    })];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data;
                    expect(response.status).toBe(200);
                    expect(status).toBe('success');
                    expect(data.washingCycles).toEqual(900);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('PATCH - /api/washingMachine/:serialNumber - nothing update if serial' +
        ' number isn\'t exist', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, data, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        patch('/api/washingMachine/00').
                        send({
                        updates: {
                            washingCycles: 1230,
                        },
                    })];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data, message = _a.message;
                    expect(response.status).toBe(404);
                    expect(status).toBe('failed');
                    expect(message).toContain('не найдена');
                    expect(data).toBeUndefined();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('PATCH - api/washingMachine/status/:serialNumber - update status of' +
        ' one machine', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        patch('/api/washingMachine/status/388')];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data;
                    expect(response.status).toBe(200);
                    expect(status).toBe('success');
                    expect(data.status).toBe(false);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('PATCH - api/washingMachine/status/:serialNumber - update nothing if' +
        ' serial number is wrong', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, data, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        patch('/api/washingMachine/status/0')];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data, message = _a.message;
                    expect(response.status).toBe(404);
                    expect(status).toBe('failed');
                    expect(message).toContain('не найдена');
                    expect(data).toBeUndefined();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('DELETE - /api/washingMachine/:serialNumber - delete one machine by serial number', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, data, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        delete('/api/washingMachine/388')];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data, message = _a.message;
                    expect(response.status).toBe(200);
                    expect(status).toBe('success');
                    expect(data).toBe(388);
                    expect(message).toBeUndefined();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('DELETE - /api/washingMachine/:serialNumber - get failed if machine isn\'t exist', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, status, data, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).
                        delete('/api/washingMachine/0')];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data, message = _a.message;
                    expect(response.status).toBe(404);
                    expect(status).toBe('failed');
                    expect(message).toContain('не найдена');
                    expect(data).toBeUndefined();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('DELETE - /api/washingMachine/model - delete nothing if model isn\'t' +
        ' exist', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var model, response, _a, status, data, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    model = 'release model';
                    return [4 /*yield*/, supertest_1.default(app_1.app).
                            delete('/api/washingMachine/model').
                            send({
                            model: model,
                        })];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data, message = _a.message;
                    expect(response.status).toBe(404);
                    expect(status).toBe('failed');
                    expect(message).toContain('не найдены');
                    expect(data).toBeUndefined();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('DELETE - /api/washingMachine/model - delete all machines with the same model', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var model, response, _a, status, data, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    model = 'testing model';
                    return [4 /*yield*/, supertest_1.default(app_1.app).
                            delete('/api/washingMachine/model').
                            send({
                            model: model,
                        })];
                case 1:
                    response = _b.sent();
                    _a = response.body, status = _a.status, data = _a.data, message = _a.message;
                    expect(response.status).toBe(200);
                    expect(status).toBe('success');
                    expect(message).toBeUndefined();
                    expect(data).toContain(model);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
