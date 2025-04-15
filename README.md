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
- 🔍 Built-in request/response interceptors
- 🔄 Automatic retry mechanism
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
      // Optional configuration
      headers: {
        'Content-Type': 'application/json',
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

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getUsers() {
    const response = await this.httpService
      .request('https://api.example.com/users')
      .toPromise();
    
    return response.data;
  }
}
```

## Configuration

The `HttpModule` can be configured using the `register` or `registerAsync` methods:

### Synchronous Configuration

```typescript
HttpModule.register({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  retry: {
    attempts: 3,
    delay: 1000,
  },
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
// GET request
const response = await this.httpService
  .request('https://api.example.com/users')
  .toPromise();

// POST request
const response = await this.httpService
  .request('https://api.example.com/users', {
    method: 'POST',
    body: JSON.stringify({ name: 'John Doe' }),
  })
  .toPromise();
```

### Using Interceptors

```typescript
import { Injectable } from '@nestjs/common';
import { HttpService, HttpInterceptor } from 'nestjs-undici';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: Request) {
    request.headers.set('Authorization', 'Bearer token');
    return request;
  }
}

// Register the interceptor
HttpModule.register({
  interceptors: [AuthInterceptor],
});
```

## API Reference

For detailed API documentation, please visit our [documentation site](https://hebertcisco.github.io/nestjs-undici/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this package useful, please consider giving it a ⭐️ on [GitHub](https://github.com/hebertcisco/nestjs-undici).
