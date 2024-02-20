import dotenv from 'dotenv';
import path from 'path';

export default () => {
  let env_path: string;

  switch (process.env.NODE_ENV) {
    case 'production':
      env_path = path.join(process.cwd(), '/.env.production');
      break;
    case 'development':
      env_path = path.join(process.cwd(), '/.env.development');
      break;
    default:
      env_path = path.join(process.cwd(), '/.env.local');
      break;
  }

  dotenv.config({ path: env_path });
  console.log(env_path);
  console.log('env :' + process.env.NODE_ENV);
};
