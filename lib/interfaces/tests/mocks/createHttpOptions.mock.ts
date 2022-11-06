import type { HttpModuleOptions } from '../../../types/http-module.type';
import { HttpModuleOptionsFactory } from '../../../interfaces/http-module.interface';

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
