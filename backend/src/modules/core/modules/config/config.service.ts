// Core
import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface Config {
  database: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
  };
}

const DATABASE_HOST = 'DATABASE_HOST';
const DATABASE_PORT = 'DATABASE_PORT';
const DATABASE_NAME = 'DATABASE_NAME';
const DATABASE_USERNAME = 'DATABASE_USERNAME';
const DATABASE_PASSWORD = 'DATABASE_PASSWORD';

@Global()
@Injectable()
export class AppConfigService {
  private requiredVars: string[];
  public constructor(private configService: ConfigService) {
    this.requiredVars = [DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD];
    this.validateRequiredVariables();
  }

  private validateRequiredVariables(): void {
    const missingVars = this.requiredVars.filter((key) => !this.configService.get(key));

    if (missingVars.length) {
      throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
    }
  }

  public get config(): Config {
    return {
      database: {
        host: this.configService.get(DATABASE_HOST)!,
        port: this.configService.get(DATABASE_PORT)!,
        name: this.configService.get(DATABASE_NAME)!,
        username: this.configService.get(DATABASE_USERNAME)!,
        password: this.configService.get(DATABASE_PASSWORD)!,
      },
    };
  }
}
