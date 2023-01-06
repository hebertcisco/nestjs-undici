# nestjs-undici

[**nestjs-undici**](/) is a **NestJS** module that provides utility functions for working with the [@nodejs/undici](https://github.com/nodejs/undici) package. **Undici** is a lightweight *HTTP/1.1* client for Node.js, designed to be used with the **NestJs** *environment*.

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=hebertcisco_nestjs-undici&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=hebertcisco_nestjs-undici) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=hebertcisco_nestjs-undici&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=hebertcisco_nestjs-undici)

## Installation

To install [nestjs-undici](https://www.npmjs.com/package/nestjs-undici), you will need to have [Node.js](https://nodejs.org/en/download/) and npm (or [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)) installed on your system. Then, you can run the following command to install the module:

> Install with yarn or npm: `yarn` or `npm`:

```bash
# yarn
yarn add nestjs-undici
```

Or NPM:

```bash
# npm
npm i nestjs-undici --save
```

#### Importing the module

To use nestjs-undici in your NestJS application, you will need to import it. You can do this by adding the following line to the top of the file where you want to use the module:

```ts
import { HttpModule } from 'nestjs-undici';
```

You will also need to include the HttpModule in the imports array of the root AppModule or the module where you want to use it.

```ts
// app.module.ts

import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-undici';

import { AppController } from './app.controller';
import { AppService } from './app.service';

  
@Module({
    imports: [
        HttpModule.register({
            headers: {
                'my-header': `foo-bar`,
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
```

#### Using the module

To use the nestjs-undici module, you will need to inject the `HttpService` into your component or controller. You can do this by adding it to the constructor arguments and adding a public or private property for it:

```ts
import { HttpService } from 'nestjs-undici';

export class AppComponent {
  constructor(private httpService: HttpService) {}
}
```

Once you have injected the `HttpService`, you can use it to make HTTP requests using the `request()` method. The `request()` method takes a URL and an options object as arguments, and returns an [RxJS Observable](https://rxjs.dev/api/index/class/Observable) that you can subscribe to in order to handle the response.

For example, here is how you could use the `HttpService` to make a GET request to the `/users` endpoint:

```ts
import { of } from 'rxjs';

export class AppComponent {
  constructor(private httpService: HttpService) {}

  public getUsers(): void {
    this.httpService
      .request
      .get('/users')
      .subscribe(response => { // Handle the response here }); 
}}
```

> You can also use the `post`, `put`, `patch`, `delete`, and `head` methods to send other types of HTTP requests.

## Configuration

The nestjs-undici module supports configuration options through the `register` method. You can pass an options object to the `register` method to configure the Undici client. The available options are the same as the options for the [@nodejs/undici](https://github.com/nodejs/undici) client.

You can also use the `registerAsync` method to provide the options asynchronously, for example, from a configuration file. The `registerAsync` method accepts an object with the following properties:

- `useClass`: a provider that returns the options object
- `useExisting`: a provider that returns the options object
- `useFactory`: a factory function that returns the options object
- `inject`: an array of providers to inject into the factory function
- `imports`: an array of modules to import
- `extraProviders`: an array of additional providers to add to the module

### Customizing the request options

The `request()` method also accepts an options object as its second argument. This options object can be used to customize the request, such as setting the HTTP method, adding headers, or setting the body of the request.

Here is an example of how you could use the options object to set the HTTP method to `POST` and add a JSON payload to the request body:

```ts
import { of } from 'rxjs';

export class AppComponent {
  constructor(private httpService: HttpService) {}

  public createUser(user: User): void {
    this.httpService
      .request('/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe(response => {
        // Handle the response here
      });
  }
}
```

### Setting the global dispatcher

The `HttpModule` uses the `dispatcher` option of the `request()` method to specify the [Dispatcher](https://github.com/nodejs/undici#dispatcher) that should be used to make the request. By default, the `HttpModule` uses the `createDispatcher()` function from the `@nodejs/undici` package to create
