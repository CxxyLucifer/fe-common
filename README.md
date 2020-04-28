# fe-common

## Installation

    $ npm install @ife/fe-common log4js

## Usage

1.能捕获所有的日志, 推荐使用此方式

```ts
import { Log4jsService } from "@ife/fe-common";
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";

async function bootstrap() {
    // 使用默认的打印方式, 将会在工作目录下生成logs文件夹
    // 使用dateFile的方式存储文件
    // 日志打印等级为ALL
    const logger = new Log4jsService({...});

    // 与上面相同, 但是可以自定义日志等级
    const logger = new Log4jsService({...});

    // 自定义日志打印方式
    const logger = new Log4jsService({...});

    // 创建时就指定logger, 所有框架消息都能打印
    const app = await NestFactory.create(ApplicationModule, {logger});

    await app.listen(3000);
}

import { Logger } from "@nestjs/common";

class OtherService {
    // 创建loger对象
    private readonly logger = new Logger("OtherService");

    constructor() {
        this.logger.log("HAHA!"); // print:[2019-08-10T15:45:48.875] [INFO] OtherService - HAHA!
    }
}
```

2.使用模块

```ts
import { Log4jsService } from "@ife/fe-common";
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    // 获得logger对象
    const logger = app.get(Log4jsService);
    app.useLogger(logger);

    await app.listen(3000);
}

import { Module } from "@nestjs/common";
import { Log4jsModule } from "@ife/fe-common";

@Module({
    imports: [Log4jsModule.forRoot()], // 注册模块
    controllers: []
})
export class ApplicationModule {}

import { Logger } from "@nestjs/common";
import { Log4jsService } from "@ife/fe-common";

class OtherService {
    private readonly logger = new Logger("OtherService");

    constructor(private readonly log4jService: Log4jsService) {
        this.logger.log("HAHA!"); // print:[2019-08-10T15:45:48.875] [INFO] OtherService - HAHA!

        this.log4jService.log("HAHA!", "OtherService"); // print:[2019-08-10T15:45:48.875] [INFO] OtherService - HAHA!
    }
}
```
