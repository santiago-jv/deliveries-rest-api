"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(request, response, next) {
    let token = request.headers.authorization;
    if (!token) {
        return response.status(403).json({
            message: "Token not provided"
        });
    }
    if (!token.startsWith('Bearer'))
        return response.status(400).json({
            message: 'Token must be of type Bearer'
        });
    token = token.slice(7);
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        request.headers.admin = payload.id;
    }
    catch (error) {
        return response.status(401).json({
            message: "Invalid token"
        });
    }
    next();
}
exports.default = authMiddleware;
