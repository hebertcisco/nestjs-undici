"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var HttpModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
const common_1 = require("@nestjs/common");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const http_service_1 = require("./services/http.service");
const http_constants_1 = require("./constants/http.constants");
let HttpModule = HttpModule_1 = class HttpModule {
    static register(config) {
        return {
            module: HttpModule_1,
            providers: [
                {
                    provide: http_constants_1.UNDICI_INSTANCE_TOKEN,
                    useValue: config,
                },
                {
                    provide: http_constants_1.HTTP_MODULE_ID,
                    useValue: (0, random_string_generator_util_1.randomStringGenerator)(),
                },
            ],
        };
    }
    static registerAsync(options) {
        return {
            module: HttpModule_1,
            imports: options.imports,
            providers: [
                ...this.createAsyncProviders(options),
                {
                    provide: http_constants_1.UNDICI_INSTANCE_TOKEN,
                    useFactory: (config) => config,
                    inject: [http_constants_1.HTTP_MODULE_OPTIONS],
                },
                {
                    provide: http_constants_1.HTTP_MODULE_ID,
                    useValue: (0, random_string_generator_util_1.randomStringGenerator)(),
                },
                ...(options.extraProviders || []),
            ],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: http_constants_1.HTTP_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: http_constants_1.HTTP_MODULE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return optionsFactory.createHttpOptions(); }),
            inject: [options.useExisting || options.useClass],
        };
    }
};
exports.HttpModule = HttpModule;
exports.HttpModule = HttpModule = HttpModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [http_service_1.HttpService],
        exports: [http_service_1.HttpService],
    })
], HttpModule);
