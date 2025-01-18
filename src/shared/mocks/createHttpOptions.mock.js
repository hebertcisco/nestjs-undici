"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModuleOptionsFactoryImplMock = void 0;
class HttpModuleOptionsFactoryImplMock {
    createHttpOptions() {
        const httpModuleOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
            path: '/',
            protocol: 'http',
            hostname: 'localhost',
            port: 3000,
        };
        return httpModuleOptions;
    }
}
exports.HttpModuleOptionsFactoryImplMock = HttpModuleOptionsFactoryImplMock;
