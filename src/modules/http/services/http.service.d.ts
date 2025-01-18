import { Observable } from 'rxjs';
import type { UrlObject } from 'node:url';
import type { Dispatcher } from 'undici';
import type { UndiciRequestOptionsType } from '../types';
export declare class HttpService {
    protected readonly options: UndiciRequestOptionsType;
    constructor(options: UndiciRequestOptionsType);
    setGlobalDispatcher(dispatcher: Dispatcher): void;
    request(url: string | URL | UrlObject, options?: {
        dispatcher?: Dispatcher;
    } & Omit<Dispatcher.RequestOptions, 'origin' | 'path' | 'method'> & Partial<Pick<Dispatcher.RequestOptions, 'method'>>): Observable<Dispatcher.ResponseData>;
    get undiciRef(): UndiciRequestOptionsType;
}
