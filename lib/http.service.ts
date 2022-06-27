import { Inject } from '@nestjs/common';
import { Dispatcher, request } from 'undici';

import { Observable } from 'rxjs';

import { UNDICI_INSTANCE_TOKEN } from './http.constants';

import type { ResponseData } from 'undici/types/dispatcher';
import type { UndiciRequestOptionsType } from '.';
import type { UrlObject } from 'node:url';

export class HttpService {
  constructor(
    @Inject(UNDICI_INSTANCE_TOKEN)
    protected readonly options: UndiciRequestOptionsType,
  ) {}

  public request(
    url: string | URL | UrlObject,
    options?: { dispatcher?: Dispatcher } & Omit<
      Dispatcher.RequestOptions,
      'origin' | 'path' | 'method'
    > &
      Partial<Pick<Dispatcher.RequestOptions, 'method'>>,
  ): Observable<ResponseData> {
    return new Observable<ResponseData>(subscriber => {
      const response = request(url, {
        ...this.options,
        ...options,
      });
      response.then(res => {
        subscriber.next(res);
        subscriber.complete();
        return () => {
          if (!res.statusCode) {
            return;
          }
        };
      });
    });
  }

  public get undiciRef(): UndiciRequestOptionsType {
    return this.options;
  }
}
