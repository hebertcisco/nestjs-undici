"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyMock = void 0;
const readable_1 = __importDefault(require("undici/types/readable"));
exports.bodyMock = {
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.reject(new Error('Method not implemented.')),
    json: () => Promise.resolve({
        test: 'test',
    }),
    text: () => Promise.resolve('test'),
    body: new readable_1.default(),
};
