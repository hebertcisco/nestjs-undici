import type { Provider } from '@nestjs/common';
import type { ModuleMetadata } from '@nestjs/common';
import type { Type } from '@nestjs/common';
import type { HttpModuleOptions } from '../types/http-module.type';

export interface HttpModuleOptionsFactory {
  createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions;
}
export interface BodyMixin {
  readonly body?: never; // throws on node v16.6.0
  readonly bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  formData(): Promise<never>;
  json(): Promise<any>;
  text(): Promise<string>;
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
