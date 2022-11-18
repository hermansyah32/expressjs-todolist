import * as dotenv from 'dotenv';
let envFile = process.cwd() + './.env';

switch (process.env.NODE_ENV) {
  case 'production':
    envFile = process.cwd() + './.env.production';
    break;
  default:
    break;
}

dotenv.config({ path: envFile });

export default dotenv;