# NestJS Undici

[![npm version](https://badge.fury.io/js/nestjs-undici.svg)](https://badge.fury.io/js/nestjs-undici)
[![Running Code Coverage](https://github.com/hebertcisco/nestjs-undici/actions/workflows/coverage.yml/badge.svg)](https://github.com/hebertcisco/nestjs-undici/actions/workflows/coverage.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**NestJS Undici** is a powerful HTTP client module for NestJS applications, built on top of [@nodejs/undici](https://github.com/nodejs/undici). It provides a simple and efficient way to make HTTP requests in your NestJS applications.

## Features

- 🚀 Built on top of [@nodejs/undici](https://github.com/nodejs/undici)
- 🔄 Full TypeScript support
- ⚡ High-performance HTTP client
- 🔒 Secure by default
- 🛠️ Easy to configure and use
- 📦 Lightweight and dependency-free
- 📝 Comprehensive documentation

## Installation

```bash
# Using npm
npm install nestjs-undici

# Using yarn
yarn add nestjs-undici
```

## Quick Start

1. Import the `HttpModule` in your root module:

```typescript
import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-undici';

@Module({
  imports: [
    HttpModule.register({
      // Optional configuration (Undici Request Options)
      headers: {
        'User-Agent': 'NestJS-Undici',
      },
    }),
  ],
})
export class AppModule {}
```

2. Inject and use the `HttpService` in your service:

```typescript
import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-undici';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getUsers() {
    const response = await lastValueFrom(
      this.httpService.request('https://api.example.com/users')
    );
    
    return response.body.json();
  }
}
```

## Configuration

The `HttpModule` can be configured using the `register` or `registerAsync` methods. The configuration object accepts standard [Undici Request Options](https://github.com/nodejs/undici#undicirequesturl-options-promise) and an optional `dispatcher`.

### Synchronous Configuration

```typescript
import { Agent } from 'undici';

HttpModule.register({
  headers: {
    'Content-Type': 'application/json',
  },
  // You can set a custom dispatcher (e.g., for proxy or mocking)
  dispatcher: new Agent({
    connect: {
      timeout: 5000
    }
  }),
});
```

### Asynchronous Configuration

```typescript
HttpModule.registerAsync({
  useFactory: async (configService: ConfigService) => ({
    headers: {
      'Authorization': await configService.get('API_KEY'),
    },
  }),
  inject: [ConfigService],
});
```

## Advanced Usage

### Making HTTP Requests

```typescript
// POST request
const response = await lastValueFrom(
  this.httpService.request('https://api.example.com/users', {
    method: 'POST',
    body: JSON.stringify({ name: 'John Doe' }),
  })
);
```

### Using Custom Dispatchers (Interception)

To intercept requests or configure advanced behavior (like connection pools, proxies, or mocks), use a custom Dispatcher.

```typescript
import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-undici';
import { ProxyAgent } from 'undici';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {
    // Set a global dispatcher for this service instance
    this.httpService.setGlobalDispatcher(new ProxyAgent('http://my-proxy:8080'));
  }
}
```

## API Reference

For detailed API documentation, please visit our [documentation site](https://hebertcisco.github.io/nestjs-undici/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this package useful, please consider giving it a ⭐️ on [GitHub](https://github.com/hebertcisco/nestjs-undici).
