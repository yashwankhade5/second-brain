"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "yash";
function auth(req, res, next) {
    const head = req.headers["authorization"];
    const token = head;
    try {
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            // @ts-ignore
            req.userId = decoded;
        }
        next();
    }
    catch (e) {
        res.json({
            "message": "invaild token",
            "error": e
        });
        return;
    }
}
