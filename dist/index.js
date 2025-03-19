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
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const JWT_SECRET = "yash";
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect("mongodb+srv://Admin:tcYVqZuA115vHNNv@cluster0.bl0kz.mongodb.net/secondBrain");
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const schema = zod_1.z.object({
        username: zod_1.z.string().max(20).min(8).email(),
        password: zod_1.z.string().min(8).max(14),
    });
    try {
        let result = schema.safeParse(req.body);
        if (result.success) {
            yield db_1.Usermodel.create({
                username,
                password
            });
            res.json({
                "message": "successfully created account"
            });
            return;
        }
        else {
            res.json({
                "message": result.error.issues[0].message
            });
            return;
        }
    }
    catch (e) {
        res.status(411).json({ "message": "account is not created" });
        return;
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.headers);
    let user = yield db_1.Usermodel.findOne({
        "username": username,
        "password": password
    });
    if (user) {
        res.json({
            "message": jsonwebtoken_1.default.sign(user.id, JWT_SECRET)
        });
    }
    else {
        res.json({
            "message": "invalid credentials"
        });
    }
}));
app.post("/api/v1/content", (req, res) => {
});
app.get("/api/v1/content", (req, res) => {
});
app.delete("/api/v1/content", (req, res) => {
});
app.post("/api/v1/share", (req, res) => {
});
app.get("/api/v1/:sharelink", (req, res) => {
});
app.listen(3000);
