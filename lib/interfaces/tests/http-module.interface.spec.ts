import type { Provider, Type } from '@nestjs/common';

import {
  BodyMixin,
  HttpModuleAsyncOptions,
  HttpModuleOptionsFactory,
} from '../http-module.interface';

import { HttpModuleOptionsFactoryImplMock } from './mocks/createHttpOptions.mock';
import type { HttpModuleOptions } from '../../types';

describe('http-module.interface', () => {
  describe('HttpModuleOptionsFactory', () => {
    let httpModuleOptionsFactory: HttpModuleOptionsFactory;
    let createHttpOptions: HttpModuleOptions;

    beforeEach(() => {
      httpModuleOptionsFactory = new HttpModuleOptionsFactoryImplMock();
      createHttpOptions = httpModuleOptionsFactory.createHttpOptions();
    });
    it('should be defined', () => {
      expect(httpModuleOptionsFactory).toBeDefined();
    });
    it('should be defined', () => {
      expect(createHttpOptions.headers).toBeDefined();
    });
  });
  describe('BodyMixin', () => {
    class BodyMixinImpl implements BodyMixin {
      readonly bodyUsed: boolean;
      arrayBuffer(): Promise<ArrayBuffer> {
        throw new Error('Method not implemented.');
      }
      blob(): Promise<Blob> {
        throw new Error('Method not implemented.');
      }
      formData(): Promise<never> {
        throw new Error('Method not implemented.');
      }
      json(): Promise<any> {
        throw new Error('Method not implemented.');
      }
      text(): Promise<string> {
        throw new Error('Method not implemented.');
      }
    }
    it('should be defined', () => {
      expect(BodyMixinImpl).toBeDefined();
    });
  });
  describe('HttpModuleAsyncOptions', () => {
    class HttpModuleAsyncOptionsImpl implements HttpModuleAsyncOptions {
      useExisting?: Type<HttpModuleOptionsFactory>;
      useClass?: Type<HttpModuleOptionsFactory>;
      useFactory?: (
        ...args: any[]
      ) => Promise<HttpModuleOptions> | HttpModuleOptions;
      inject?: any[];
      extraProviders?: Provider[];
    }
    it('should be defined', () => {
      expect(HttpModuleAsyncOptionsImpl).toBeDefined();
    });
  });
});
