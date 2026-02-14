# Interceptors

Unlike the standard `@nestjs/axios` module which uses Axios interceptors, `nestjs-undici` leverages [Undici's Dispatcher system](https://github.com/nodejs/undici#dispatcher) for request interception and handling.

## Using Custom Dispatchers

You can create a custom Dispatcher to intercept requests and responses. This allows you to add headers, log requests, mock responses, or handle errors globally.

### Example: Logging Dispatcher

Here's an example of how you might wrap the default dispatcher to add logging:

```typescript
import { Dispatcher, ProxyAgent, Agent } from 'undici';

class LoggingDispatcher extends Dispatcher {
  constructor(private readonly dispatcher: Dispatcher) {
    super();
  }

  dispatch(options: Dispatcher.DispatchOptions, handler: Dispatcher.DispatchHandlers): boolean {
    console.log(`Sending request to ${options.origin}${options.path}`);
    return this.dispatcher.dispatch(options, handler);
  }
}
```

## Registering Dispatchers

You can register a dispatcher in several ways:

### 1. Global Dispatcher via Configuration

```typescript
import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-undici';
import { Agent } from 'undici';

@Module({
  imports: [
    HttpModule.register({
      dispatcher: new LoggingDispatcher(new Agent()),
    }),
  ],
})
export class AppModule {}
```

### 2. Set Global Dispatcher at Runtime

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from 'nestjs-undici';
import { Agent } from 'undici';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    this.httpService.setGlobalDispatcher(new LoggingDispatcher(new Agent()));
  }
}
```

### 3. Per-Request Dispatcher

```typescript
import { Agent } from 'undici';

this.httpService.request('https://example.com', {
  dispatcher: new LoggingDispatcher(new Agent()),
});
```

## Undici Interceptors API

If you are using a newer version of Undici that supports the experimental Interceptors API, you can use that as well by configuring the dispatcher accordingly.

Please refer to the [Undici documentation](https://github.com/nodejs/undici) for more advanced dispatcher configurations, such as `MockAgent`, `ProxyAgent`, etc.
