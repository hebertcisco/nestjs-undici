import type { HttpModuleOptions } from '../../modules/http/types/http-module.type';
import { HttpModuleOptionsFactory } from '../../modules/http/interfaces/http-module.interface';
export declare class HttpModuleOptionsFactoryImplMock implements HttpModuleOptionsFactory {
    createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions;
}
