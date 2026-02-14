# Error Handling

When using `nestjs-undici`, it is important to understand how errors are handled in both Undici and RxJS.

## HTTP Status Codes

By default, Undici (and thus `HttpService`) does **not** throw an error for HTTP status codes that indicate failure (like 404 or 500). Instead, the response object is returned, and you must check the `statusCode` property.

```typescript
import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from 'nestjs-undici';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CatsService {
  constructor(private readonly httpService: HttpService) {}

  async findOne(id: string) {
    const { statusCode, body } = await lastValueFrom(
      this.httpService.request(`https://api.example.com/cats/${id}`)
    );

    if (statusCode === 404) {
      throw new HttpException('Cat not found', 404);
    }

    if (statusCode >= 400) {
      throw new HttpException('Bad Request', statusCode);
    }

    return body.json();
  }
}
```

## Network Errors

Network errors (like DNS resolution failure, connection refused, or timeout) will cause the Observable to emit an error (or the Promise to reject). You can handle these using RxJS operators or standard `try/catch` blocks.

### Using try/catch (Async/Await)

```typescript
try {
  const response = await lastValueFrom(this.httpService.request('https://invalid-url'));
} catch (error) {
  console.error('Network error:', error.message);
  // Handle error (e.g., throw a NestJS exception)
  throw new HttpException('Service unavailable', 503);
}
```

### Using RxJS catchError

```typescript
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

this.httpService.request('https://api.example.com')
  .pipe(
    catchError(error => {
      console.error('Error:', error);
      return throwError(() => new Error('Something went wrong'));
    })
  )
  .subscribe();
```

## Timeouts

If you configured a timeout in the `HttpModule` or per request, a timeout error will be thrown if the request exceeds the limit.

```typescript
import { errors } from 'undici';

try {
  await lastValueFrom(this.httpService.request('https://slow-api.com'));
} catch (error) {
  if (error instanceof errors.ConnectTimeoutError || error instanceof errors.HeadersTimeoutError) {
    // Handle timeout
  }
}
```
