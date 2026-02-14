# Making Requests

The `HttpService` provides a simple API for making HTTP requests using the [undici](https://github.com/nodejs/undici) client.

## Basic Usage

To make a request, inject the `HttpService` into your class and use the `request` method:

```typescript
import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-undici';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CatsService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const { body } = await lastValueFrom(
      this.httpService.request('https://api.example.com/cats')
    );
    return body.json();
  }
}
```

## Request Options

The `request` method accepts a URL and an options object. The options object supports all [undici request options](https://github.com/nodejs/undici#undicirequesturl-options-promise), including:

- `method`: HTTP method (GET, POST, PUT, DELETE, etc.) - defaults to GET
- `headers`: Request headers
- `body`: Request body (string, Buffer, Uint8Array, ReadableStream, null, FormData, etc.)
- `query`: Query parameters (object)
- `dispatcher`: Custom dispatcher for this request

### Examples

**POST Request with JSON body:**

```typescript
async create(cat: CreateCatDto) {
  const { statusCode, body } = await lastValueFrom(
    this.httpService.request('https://api.example.com/cats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cat),
    })
  );
  
  if (statusCode === 201) {
    return body.json();
  }
}
```

**Using Query Parameters:**

```typescript
this.httpService.request('https://api.example.com/search', {
  query: {
    q: 'nestjs',
    page: 1
  }
})
```

## Response Handling

The `request` method returns an RxJS `Observable`. You can subscribe to it or convert it to a Promise using `lastValueFrom` (recommended for async/await).

The response object contains:
- `statusCode`: HTTP status code
- `headers`: Response headers
- `body`: Response body (which has methods like `.json()`, `.text()`, `.arrayBuffer()`, etc.)
- `trailers`: Response trailers

```typescript
this.httpService.request('https://google.com').subscribe({
  next: (response) => {
    console.log(`Status: ${response.statusCode}`);
  },
  error: (err) => {
    console.error('Request failed', err);
  }
});
```

## Streaming Responses

Since `undici` supports streaming, you can work with the body stream directly:

```typescript
const { body } = await lastValueFrom(this.httpService.request('https://example.com/large-file'));

for await (const chunk of body) {
  console.log('Received chunk:', chunk);
}
```
