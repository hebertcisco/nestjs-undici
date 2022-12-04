import type { HttpModuleOptions } from '../../modules/http/types/http-module.type';
import { HttpModuleOptionsFactory } from '../../modules/http/interfaces/http-module.interface';

export class HttpModuleOptionsFactoryImplMock
  implements HttpModuleOptionsFactory
{
  createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions {
    const httpModuleOptions: HttpModuleOptions = {
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
