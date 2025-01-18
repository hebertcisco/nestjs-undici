"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const common_1 = require("@nestjs/common");
const undici_1 = require("undici");
const rxjs_1 = require("rxjs");
const http_constants_1 = require("../constants/http.constants");
let HttpService = class HttpService {
    constructor(options) {
        this.options = options;
    }
    setGlobalDispatcher(dispatcher) {
        this.options.dispatcher = dispatcher;
    }
    request(url, options) {
        return new rxjs_1.Observable(subscriber => {
            const response = (0, undici_1.request)(url, Object.assign(Object.assign({}, this.options), options));
            response.then(res => {
                subscriber.next(res);
                subscriber.complete();
                return () => {
                    if (!res.statusCode) {
                        return;
                    }
                };
            });
        });
    }
    get undiciRef() {
        return this.options;
    }
};
exports.HttpService = HttpService;
exports.HttpService = HttpService = __decorate([
    __param(0, (0, common_1.Inject)(http_constants_1.UNDICI_INSTANCE_TOKEN)),
    __metadata("design:paramtypes", [Object])
], HttpService);
