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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAdmin = exports.loginAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Admin_1 = __importDefault(require("../models/Admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function loginAdmin(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = request.body;
        try {
            const admin = yield Admin_1.default.findOne({ email });
            if (!admin) {
                return response.status(400).json({
                    message: 'The email no exist'
                });
            }
            const isValidPassword = yield bcrypt_1.default.compare(password, admin.password);
            if (!isValidPassword) {
                return response.status(400).json({
                    message: 'Invalid password'
                });
            }
            const token = jsonwebtoken_1.default.sign({ id: admin._id }, process.env.JWT_SECRET);
            return response.status(201).json({
                message: 'Admin authenticated succesfully',
                admin,
                token
            });
        }
        catch (error) {
            return response.status(500).json({
                error
            });
        }
    });
}
exports.loginAdmin = loginAdmin;
function registerAdmin(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = request.body;
        try {
            const admin = yield Admin_1.default.findOne({ email });
            if (admin) {
                return response.status(400).json({
                    message: 'The email field already in use'
                });
            }
            const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
            const newAdmin = yield Admin_1.default.create({ name, email, password: encryptedPassword });
            const token = jsonwebtoken_1.default.sign({ id: newAdmin._id }, process.env.JWT_SECRET);
            return response.status(201).json({
                message: 'Admin created succesfully',
                admin: newAdmin,
                token
            });
        }
        catch (error) {
            return response.status(500).json({
                error
            });
        }
    });
}
exports.registerAdmin = registerAdmin;
