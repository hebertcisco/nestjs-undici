# HttpService

The `HttpService` is a wrapper around `undici.request` that returns an RxJS Observable.

## API

### `request(url: string | URL | UrlObject, options?: UndiciRequestOptions): Observable<Dispatcher.ResponseData>`

Makes an HTTP request.

- **url**: The URL to request.
- **options**: Configuration options for the request (method, headers, body, etc.).

Returns an `Observable` that emits the response object.

## Example

```typescript
import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-undici';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const { body } = await lastValueFrom(
      this.httpService.request('https://api.example.com/cats')
    );
    return body.json();
  }
}
```
