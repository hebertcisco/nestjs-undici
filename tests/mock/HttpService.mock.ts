import { UrlObject } from 'node:url';
import { Observable } from 'rxjs';
import type { RequestOptions, ResponseData } from 'undici/types/dispatcher';

export class HttpServiceMock {
  request(
    url: string | URL | UrlObject,
    options?:
      | ({ dispatcher?: import('undici/types/dispatcher') | undefined } & Omit<
          RequestOptions,
          'origin' | 'path' | 'method'
        > &
          Partial<Pick<RequestOptions, 'method'>>)
      | undefined,
  ): Observable<ResponseData> {
    void url;
    void options;
    return Observable.create({
      statusCode: 200,
      headers: {
        test: 1,
      },
      body: null,
    });
  }
}
