import { Provider } from '@nestjs/common';

import { request } from 'undici';

import type { ModuleMetadata } from '@nestjs/common';
import type { Dispatcher } from 'undici';
import type { Type } from '@nestjs/common';
import type { UrlObject } from 'node:url';

export type UndiciResponseDataType<
  T = any,
  D = any,
> = Promise<Dispatcher.ResponseData>;

export type UndiciRequestOptionsType = {
  dispatcher?: Dispatcher;
} & Omit<Dispatcher.RequestOptions, 'origin' | 'path' | 'method'> &
  Partial<any>;

export type UndiciURLType = string | URL | UrlObject;

export type UndiciRequestArgsType = {
  url: UndiciURLType;
  options?: UndiciRequestOptionsType;
};

export type UndiciRequestType = (
  args: UndiciRequestArgsType,
) => UndiciResponseDataType;

export type HttpModuleOptions = UndiciRequestOptionsType;

export interface HttpModuleOptionsFactory {
  createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions;
}

export interface HttpModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<HttpModuleOptionsFactory>;
  useClass?: Type<HttpModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<HttpModuleOptions> | HttpModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}
