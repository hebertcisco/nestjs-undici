# Configuration Guide

The `nestjs-undici` module allows you to configure the underlying `undici` client options.

## Basic Configuration

Use the `register` method to configure the module synchronously. The configuration object matches the [Undici Request Options](https://github.com/nodejs/undici#undicirequesturl-options-promise).

```typescript
import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-undici';

@Module({
  imports: [
    HttpModule.register({
      // Default headers for all requests
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'MyApp/1.0',
      },
      // Default method (defaults to GET)
      method: 'GET',
    }),
  ],
})
export class AppModule {}
```

## Async Configuration

Use `registerAsync` to load configuration asynchronously, for example from a `ConfigService`.

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from 'nestjs-undici';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        headers: {
          'Authorization': await configService.get('API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Advanced Configuration (Dispatchers)

To configure advanced behavior like connection pooling, proxies, or mocks, you should use a custom `Dispatcher`. The `dispatcher` property can be passed in the configuration object.

```typescript
import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-undici';
import { Agent } from 'undici';

@Module({
  imports: [
    HttpModule.register({
      // Configure an Agent with specific connection options
      dispatcher: new Agent({
        connect: {
          timeout: 5000,
        },
        keepAliveTimeout: 10000,
        connections: 10,
      }),
    }),
  ],
})
export class AppModule {}
```

## Environment Variables

You can easily use environment variables within the `register` or `registerAsync` methods.

```typescript
HttpModule.register({
  headers: {
    'Authorization': process.env.API_KEY,
  },
});
```
