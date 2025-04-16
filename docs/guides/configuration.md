# Configuration Guide

The NestJS Undici module provides flexible configuration options to customize the HTTP client behavior according to your needs. This guide covers all available configuration options and how to use them effectively.

## Basic Configuration

The most straightforward way to configure the module is using the `register` method:

```typescript
import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-undici';

@Module({
  imports: [
    HttpModule.register({
      // Basic configuration options
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000, // 5 seconds
      retry: {
        attempts: 3,
        delay: 1000,
      },
    }),
  ],
})
export class AppModule {}
```

## Configuration Options

### Headers

You can set default headers that will be included in every request:

```typescript
HttpModule.register({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token',
    'X-Custom-Header': 'value',
  },
});
```

### Timeout

Set the maximum time to wait for a response:

```typescript
HttpModule.register({
  timeout: 5000, // 5 seconds in milliseconds
});
```

### Retry Configuration

Configure automatic retry behavior for failed requests:

```typescript
HttpModule.register({
  retry: {
    attempts: 3,    // Number of retry attempts
    delay: 1000,    // Delay between retries in milliseconds
    maxDelay: 5000, // Maximum delay between retries
    factor: 2,      // Exponential backoff factor
  },
});
```

### Pool Configuration

Configure the connection pool settings:

```typescript
HttpModule.register({
  pool: {
    connections: 10,    // Maximum number of connections
    pipelining: 1,      // Maximum number of requests to pipeline
    keepAliveTimeout: 5000, // Keep-alive timeout in milliseconds
  },
});
```

## Async Configuration

For more complex scenarios, you can use the `registerAsync` method to provide configuration dynamically:

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
        timeout: configService.get('HTTP_TIMEOUT'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Using Multiple Configurations

You can create multiple instances of the HTTP client with different configurations:

```typescript
import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-undici';

@Module({
  imports: [
    HttpModule.register({
      name: 'default',
      // Default configuration
    }),
    HttpModule.register({
      name: 'external',
      // External API configuration
    }),
  ],
})
export class AppModule {}
```

Then inject the specific instance in your service:

```typescript
import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-undici';

@Injectable()
export class AppService {
  constructor(
    @Inject('default') private readonly defaultHttp: HttpService,
    @Inject('external') private readonly externalHttp: HttpService,
  ) {}
}
```

## Environment-based Configuration

You can use environment variables to configure the module:

```typescript
HttpModule.register({
  headers: {
    'Authorization': process.env.API_KEY,
  },
  timeout: parseInt(process.env.HTTP_TIMEOUT, 10),
  retry: {
    attempts: parseInt(process.env.HTTP_RETRY_ATTEMPTS, 10),
    delay: parseInt(process.env.HTTP_RETRY_DELAY, 10),
  },
});
```

## Best Practices

1. **Use Environment Variables**: Store sensitive information like API keys in environment variables.
2. **Set Reasonable Timeouts**: Configure timeouts based on your application's requirements.
3. **Implement Retry Logic**: Use retry configuration for transient failures.
4. **Monitor Connection Pool**: Adjust pool settings based on your application's load.
5. **Use Async Configuration**: For complex setups, prefer `registerAsync` over `register`.

## Troubleshooting

### Common Issues

1. **Connection Timeouts**
   - Check if the timeout value is appropriate
   - Verify network connectivity
   - Ensure the target service is responsive

2. **Authentication Failures**
   - Verify API keys and tokens
   - Check header formatting
   - Ensure credentials are properly encoded

3. **Rate Limiting**
   - Adjust connection pool settings
   - Implement proper retry logic
   - Consider implementing rate limiting on your side

## Next Steps

- Learn about [Making Requests](/guides/making-requests)
- Explore [Interceptors](/guides/interceptors)
- Check out [Error Handling](/guides/error-handling)
