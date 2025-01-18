import { DynamicModule } from '@nestjs/common';
import type { HttpModuleAsyncOptions } from './interfaces';
import type { HttpModuleOptions } from './types';
export declare class HttpModule {
    static register(config: HttpModuleOptions): DynamicModule;
    static registerAsync(options: HttpModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
