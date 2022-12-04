import { Test, TestingModule } from '@nestjs/testing';
import { UNDICI_PACKAGE_JSON } from '../../../../shared/constants/URL';

import { HttpService } from '../index';
import { HttpModule } from '../../../../index';
import { dispatcherMock } from '../../../../shared/mocks/dispatcher.mock';

describe('HttpService', () => {
  let service: HttpService;
  let baseURL: string;

  beforeAll(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule.register({})],
    }).compile();

    service = module.get<HttpService>(HttpService);
    baseURL = UNDICI_PACKAGE_JSON.href;
  });

  describe('request', () => {
    it('should return an Observable', () => {
      expect(service.request(baseURL)).toBeTruthy();
    });
    it('should return an Observable with a ResponseData', () => {
      expect(service.request(baseURL)).toBeTruthy();
    });
    it('should return an Observable with a ResponseData with a statusCode', () => {
      expect(service.request(baseURL)).toBeTruthy();
    });
    it('should return 200 status', () => {
      const result = service.request(baseURL, {
        method: 'GET',
      });
      result.subscribe(response => {
        expect(response?.statusCode).toBe(200);
      });
    });
    it('should return 404 status', () => {
      const result = service.request(baseURL + 1, {
        method: 'GET',
      });
      result.subscribe(response => {
        expect(response?.statusCode).toBe(404);
      });
    });
    it('should return a body', () => {
      const result = service.request(baseURL, {
        method: 'GET',
      });
      result.subscribe(response => {
        expect(response?.body).toBeTruthy();
      });
    });
    it('should return a body with a name', () => {
      const result = service.request(baseURL, {
        method: 'GET',
      });
      result.subscribe(async response => {
        const json = await response?.body?.json();
        expect(json?.name).toBe('undici');
        expect(json?.version).toBeDefined();
        expect(json?.version).toBeTruthy();
      });
    });
    it('should return a body with a version', () => {
      const result = service.request(baseURL, {
        method: 'GET',
      });
      result.subscribe(async response => {
        const json = await response?.body?.json();
        expect(json?.version).toBeDefined();
        expect(json?.version).toBeTruthy();
        expect(json?.version).not.toBe('');
      });
    });
    describe('request with a dispatcher', () => {
      it('should return an Observable', () => {
        const result = service.request(baseURL, {
          dispatcher: dispatcherMock,
        });
        expect(result).toBeTruthy();
        expect(result).toBeDefined();
      });
      it('should return an Observable with a ResponseData', () => {
        const result = service.request(baseURL, {
          dispatcher: dispatcherMock,
        });
        expect(result).toBeTruthy();
        expect(result).toBeDefined();
      });
    });
  });
});
