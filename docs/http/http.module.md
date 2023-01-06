## Configuration

The nestjs-undici module supports configuration options through the `register` method. You can pass an options object to the `register` method to configure the Undici client. The available options are the same as the options for the [@nodejs/undici](https://github.com/nodejs/undici) client.

You can also use the `registerAsync` method to provide the options asynchronously, for example, from a configuration file. The `registerAsync` method accepts an object with the following properties:

- `useClass`: a provider that returns the options object
- `useExisting`: a provider that returns the options object
- `useFactory`: a factory function that returns the options object
- `inject`: an array of providers to inject into the factory function
- `imports`: an array of modules to import
- `extraProviders`: an array of additional providers to add to the module

### Setting the global dispatcher

The `HttpModule` uses the `dispatcher` option of the `request()` method to specify the [Dispatcher](https://github.com/nodejs/undici#dispatcher) that should be used to make the request. By default, the `HttpModule` uses the `createDispatcher()` function from the `@nodejs/undici` package to create
