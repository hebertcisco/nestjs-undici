import { Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { HttpModule } from '../http.module';
import { HttpService } from '../services/http.service';
import type { HttpModuleOptionsFactory } from '../interfaces';
import type { HttpModuleOptions } from '../types';

class ClassOptionsFactory implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      headers: {
        'x-source': 'class',
      },
    };
  }
}

class ExistingOptionsFactory implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      headers: {
        'x-source': 'existing',
      },
    };
  }
}

@Module({
  providers: [ExistingOptionsFactory],
  exports: [ExistingOptionsFactory],
})
class ExistingOptionsModule {}

describe('HttpModule', () => {
  it('should register static module options', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          headers: {
            'x-source': 'static',
          },
        }),
      ],
    }).compile();

    const service = module.get<HttpService>(HttpService);

    expect(service.undiciRef).toEqual({
      headers: {
        'x-source': 'static',
      },
    });
  });

  it('should register async module options with useFactory', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          useFactory: () => ({
            headers: {
              'x-source': 'factory',
            },
          }),
        }),
      ],
    }).compile();

    const service = module.get<HttpService>(HttpService);

    expect(service.undiciRef).toEqual({
      headers: {
        'x-source': 'factory',
      },
    });
  });

  it('should register async module options with useClass', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          useClass: ClassOptionsFactory,
          extraProviders: [
            {
              provide: 'EXTRA_PROVIDER',
              useValue: 'extra',
            },
          ],
        }),
      ],
    }).compile();

    const service = module.get<HttpService>(HttpService);

    expect(service.undiciRef).toEqual({
      headers: {
        'x-source': 'class',
      },
    });
    expect(module.get('EXTRA_PROVIDER')).toBe('extra');
  });

  it('should register async module options with useExisting', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          imports: [ExistingOptionsModule],
          useExisting: ExistingOptionsFactory,
        }),
      ],
    }).compile();

    const service = module.get<HttpService>(HttpService);

    expect(service.undiciRef).toEqual({
      headers: {
        'x-source': 'existing',
      },
    });
  });
});
