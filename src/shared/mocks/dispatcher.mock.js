"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatcherMock = void 0;
const stream_1 = __importDefault(require("stream"));
const duplex = new stream_1.default.Duplex();
exports.dispatcherMock = {
    dispatch: () => true,
    pipeline: () => duplex,
    connect: (options) => {
        const { opaque } = options;
        const connectData = {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
            },
            socket: duplex,
            opaque: opaque,
        };
        return Promise.resolve(connectData);
    },
    request: (options) => {
        const { opaque } = options;
        const responseData = {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
            },
            body: null,
            trailers: {},
            opaque: opaque,
            context: {},
        };
        return Promise.resolve(responseData);
    },
    stream: (options, factory) => {
        const { opaque } = options;
        const streamData = {
            opaque: opaque,
            trailers: {},
        };
        return Promise.resolve(streamData);
    },
    upgrade: (options) => {
        const upgradeData = {
            headers: Object.assign({ 'content-type': 'application/json' }, options.headers[0]),
            socket: duplex,
            opaque: null,
        };
        return Promise.resolve(upgradeData);
    },
    close: () => {
        return Promise.resolve();
    },
    destroy: () => {
        return Promise.resolve();
    },
    addListener: (eventName, listener) => {
        return this;
    },
    on: (eventName, listener) => {
        return this;
    },
    once: (eventName, listener) => {
        return this;
    },
    removeListener: (eventName, listener) => {
        return this;
    },
    off: (eventName, listener) => {
        return this;
    },
    removeAllListeners: (event) => {
        return this;
    },
    setMaxListeners: (n) => {
        return this;
    },
    getMaxListeners: () => {
        return 0;
    },
    listeners: (eventName) => {
        return [this];
    },
    rawListeners: (eventName) => {
        return [this];
    },
    emit: (eventName, ...args) => {
        return true;
    },
    listenerCount: (eventName) => {
        return 0;
    },
    prependListener: (eventName, listener) => {
        return this;
    },
    prependOnceListener: (eventName, listener) => {
        return this;
    },
    eventNames: () => {
        return [];
    },
};
