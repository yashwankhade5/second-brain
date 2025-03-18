"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const objectId = mongoose_1.default.Schema.Types.ObjectId;
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    usernae: { type: String, requires: true, unique: true },
    password: { type: String, required: true }
});
const tagSchema = new Schema({
    tag: { type: String, unique: true, required: true }
});
const contentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    tags: [{ type: objectId, ref: 'Tag' }],
    userId: { type: objectId, ref: 'User', required: true }
});
const Usermodel = mongoose_1.default.model('User', userSchema);
