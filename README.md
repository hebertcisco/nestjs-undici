[![codecov](https://codecov.io/gh/hebertcisco/nestjs-undici/branch/master/graph/badge.svg?token=J79GA9DGDT)](https://codecov.io/gh/hebertcisco/nestjs-undici)

[![Node.js build and publish package](https://github.com/hebertcisco/nestjs-undici/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/hebertcisco/nestjs-undici/actions/workflows/npm-publish.yml)

[![Running Code Coverage](https://github.com/hebertcisco/nestjs-undici/actions/workflows/coverage.yml/badge.svg)](https://github.com/hebertcisco/nestjs-undici/actions/workflows/coverage.yml)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Nestjs](https://img.shields.io/badge/Nestjs-ea2845?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Free. Built on open source. Runs everywhere.](https://img.shields.io/badge/VS_Code-0078D4?style=flat&logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/)
[![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=flat&logo=githubactions&logoColor=white)](https://github.com/hebertcisco/nestjs-undici/actions)

## Installation

> Install with yarn or npm: `yarn` or `npm`:

```bash
# yarn
yarn add nestjs-undici
```

```bash
# npm
npm i nestjs-undici --save
```

### Usage example:

> Project example: [https://github.com/hebertcisco/nestjs-techniques-undici](https://github.com/hebertcisco/nestjs-techniques-undici)

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-undici';
import crypto from 'node:crypto';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        HttpModule.register({
            headers: {
                'my-header': `foo-bar`,
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

```

```ts
// app.service.ts
import { lastValueFrom } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-undici';

@Injectable()
export class AppService {
    constructor(private httpService: HttpService) {}
    public fetchExternalInfo = async () => {
        const baseURL = 'https://api.github.com';
        try {
            const result = this.httpService.request(`${baseURL}/repos/hebertcisco/undici`);

            const response = await lastValueFrom(result);

            return response.body.json();
        } catch (error) {
            throw error;
        }
    };
}
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](issues).

## Show your support

Give a ⭐️ if this project helped you!

Or buy me a coffee 🙌🏾

<a href="https://www.buymeacoffee.com/hebertcisco">
    <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=hebertcisco&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" />
</a>

## 📝 License

Copyright © 2022 [Hebert F Barros](https://github.com/hebertcisco).<br />
This project is [MIT](LICENSE) licensed.
