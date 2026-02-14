# HttpModule

The `HttpModule` is the main entry point for the `nestjs-undici` package.

## Static Methods

### `register(options: HttpModuleOptions): DynamicModule`

Registers the module synchronously.

- **options**: An object implementing `HttpModuleOptions` (which extends `UndiciRequestOptions`).

### `registerAsync(options: HttpModuleAsyncOptions): DynamicModule`

Registers the module asynchronously.

- **options**: An object implementing `HttpModuleAsyncOptions`.

## HttpModuleOptions

The configuration object extends [Undici Request Options](https://github.com/nodejs/undici#undicirequesturl-options-promise) and includes:

- `dispatcher`: Optional [Dispatcher](https://github.com/nodejs/undici#dispatcher) instance.
- `headers`: Default headers.
- `method`: Default method.
- ...and other `undici.request` options.

## HttpModuleAsyncOptions

Standard NestJS async module options:

- `useFactory`: Factory function to return options.
- `useClass`: Class to provide options.
- `useExisting`: Existing provider to use.
- `inject`: Dependencies to inject into factory.
- `imports`: Modules to import.
