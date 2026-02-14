# Testing

Testing applications that make HTTP requests can be challenging. `nestjs-undici` provides flexible ways to test your services, either by mocking the `HttpService` directly or by using Undici's powerful `MockAgent`.

## Mocking HttpService

The simplest approach for unit testing is to mock the `HttpService` using standard Jest mocks.

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from 'nestjs-undici';
import { of } from 'rxjs';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: HttpService,
          useValue: {
            request: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should find all cats', async () => {
    const response = {
      statusCode: 200,
      headers: {},
      body: {
        json: async () => [{ name: 'Cat 1' }],
      },
    };

    jest.spyOn(httpService, 'request').mockReturnValue(of(response as any));

    const cats = await service.findAll();
    expect(cats).toEqual([{ name: 'Cat 1' }]);
  });
});
```

## Using Undici MockAgent

For integration tests or when you want to simulate network behavior more realistically, you can use Undici's `MockAgent`. This allows you to intercept requests at the network level (within the Node.js process) without mocking the service method itself.

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from 'nestjs-undici';
import { MockAgent, setGlobalDispatcher } from 'undici';
import { CatsService } from './cats.service';

describe('CatsService (Integration)', () => {
  let service: CatsService;
  let mockAgent: MockAgent;

  beforeEach(async () => {
    // 1. Create a MockAgent
    mockAgent = new MockAgent();
    // 2. Disable net connect to ensure no real requests are made
    mockAgent.disableNetConnect();

    // 3. Define the interception
    const client = mockAgent.get('https://api.example.com');
    client.intercept({
      path: '/cats',
      method: 'GET',
    }).reply(200, [{ name: 'Cat 1' }]);

    // 4. Register the module with the mock agent as dispatcher
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          dispatcher: mockAgent,
        }),
      ],
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should return cats from mock agent', async () => {
    const cats = await service.findAll();
    expect(cats).toEqual([{ name: 'Cat 1' }]);
  });
});
```

Using `MockAgent` is generally recommended for integration tests as it tests the actual `HttpService` logic and configuration.
