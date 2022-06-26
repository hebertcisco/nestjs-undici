import { Test, TestingModule } from '@nestjs/testing';

import { HttpModule } from './http.module';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let baseURL: string;

  beforeAll(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule.register({})],
    }).compile();

    service = module.get<HttpService>(HttpService);
    baseURL = 'https://api.hotbrains.com.br/status';
  });

  it('GET', (): void => {
    const result = service.request(baseURL, {
      method: 'GET',
    });

    result.subscribe(response => {
      expect(response?.statusCode).toBe(200);
    });
  });
});
