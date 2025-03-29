"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const auth_1 = require("./auth");
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const util_1 = require("./util");
const app = (0, express_1.default)();
const JWT_SECRET = "yash";
const JWT_SHARE = "YASH1";
dotenv.config();
const mongooseUrl = process.env.Mongoose;
if (!mongooseUrl) {
    throw new Error("mongoose is not string");
}
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect(mongooseUrl);
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
        res.status(411).json({ "message": "account is not created" + e });
        return;
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
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
app.post("/api/v1/content", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    const userId = req.userId;
    try {
        const result = yield db_1.contentmodel.create({
            "link": link,
            "type": type,
            "title": title,
            "userId": userId
        });
        res.status(200).json({
            "message": "content saved in second brain"
        });
    }
    catch (e) {
        res.json({
            "message": "not created content",
            "error": e
        });
    }
}));
app.get("/api/v1/content", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    let result;
    try {
        result = yield db_1.contentmodel.find({
            "userId": userId
        }).populate('userId');
        res.status(200).json({
            "message": result
        });
    }
    catch (e) {
        res.status(400).json({
            "messsage": result
        });
    }
}));
app.delete("/api/v1/content", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const id = req.body.id;
    let result;
    try {
        result = yield db_1.contentmodel.deleteMany({
            "_id": id,
            "userId": userId
        });
        res.json({
            "message": "deleted sucessfully"
        });
    }
    catch (e) {
        res.json({
            "messsage": "sorry something went wrong try again"
        });
    }
}));
app.post("/api/v1/share", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.Linkmodel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        else {
            const hash = (0, util_1.random)(10);
            yield db_1.Linkmodel.create({
                hash,
                userId: req.userId
            });
            res.json({
                hash: hash
            });
        }
    }
    else {
        yield db_1.Linkmodel.deleteMany({
            userId: req.userId
        });
        res.json({
            message: "Removed shareable link"
        });
    }
}));
app.get("/api/v1/:sharelink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.sharelink;
    const content = yield db_1.Linkmodel.find({
        token
    });
    res.json({
        content
    });
}));
app.listen(3000);
