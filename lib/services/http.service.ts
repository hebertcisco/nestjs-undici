import { Inject } from '@nestjs/common';
import { request } from 'undici';

import { Observable } from 'rxjs';

import type { ResponseData } from 'undici/types/dispatcher';
import type { UrlObject } from 'node:url';
import type { Dispatcher } from 'undici';

import { UNDICI_INSTANCE_TOKEN } from '../constants/http.constants';

import type { UndiciRequestOptionsType } from '../types';

export class HttpService {
  constructor(
    @Inject(UNDICI_INSTANCE_TOKEN)
    protected readonly options: UndiciRequestOptionsType,
  ) {}
  public setGlobalDispatcher(dispatcher: Dispatcher): void {
    this.options.dispatcher = dispatcher;
  }

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
