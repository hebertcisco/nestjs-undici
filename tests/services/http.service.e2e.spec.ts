import { Test, TestingModule } from '@nestjs/testing';
import { UNDICI_PACKAGE_JSON } from '../../source/shared/constants/URL';
import { HttpModule, HttpService } from '../../source';

describe('HttpService', () => {
    let service: HttpService;
    let baseURL: string;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule.register({})],
        }).compile();

        service = module.get<HttpService>(HttpService);
        baseURL = UNDICI_PACKAGE_JSON.href;
    });

    it('GET', () => {
        const result = service.request(baseURL, {
            method: 'GET',
        });

        result.subscribe(response => {
            expect(response?.statusCode).toBe(200);
        });
    });
});
