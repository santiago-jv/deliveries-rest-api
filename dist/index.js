"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
require("./database/connection");
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.set('PORT', process.env.PORT || 8000);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', indexRouter_1.default);
app.listen(app.get('PORT'), () => {
    console.log(`Server running in http://localhost:${app.get('PORT')}`);
});
