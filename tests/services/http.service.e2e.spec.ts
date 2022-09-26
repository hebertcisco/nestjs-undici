import { Test, TestingModule } from '@nestjs/testing';
import { UNDICI_PACKAGE_JSON } from '../../constants/URL';
import { HttpModule } from '../../lib/http.module';
import { HttpService } from '../../lib/services/http.service';

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

    it('GET', (): void => {
        const result = service.request(baseURL, {
            method: 'GET',
        });

        result.subscribe(response => {
            expect(response?.statusCode).toBe(200);
        });
    });
});
