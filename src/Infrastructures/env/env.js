import { existsSync } from 'fs';
import * as dotenv from 'dotenv';
let envFile = process.cwd() + '/.env';

switch (process.env.NODE_ENV) {
  case 'production':
    envFile = process.cwd() + '/.env.production';
    break;
  default:
    break;
}

if (!existsSync(envFile))
  console.log('Env file is not exists. App will use system environment.');
else dotenv.config({ path: envFile });

export default dotenv;
