import { Injectable, Inject } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { EnvConfig, IOption } from './interface';
import { CONFIG_OPTION } from '../constants/common.constant';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTION) options: IOption) {
    const { folder , env } = options;
    const fileName = `${ env }.env`;

    const envFile = resolve(process.cwd(), folder, fileName);
    this.envConfig = dotenv.parse(readFileSync(envFile));
  }

  getString(key: string): string {
    return this.envConfig[key];
  }

  getNumber(key: string): number {
    return parseInt(this.envConfig[key]);
  }
}