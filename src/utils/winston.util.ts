import { utilities, WinstonModule } from 'nest-winston';
import winstonDaily from 'winston-daily-rotate-file';
import winston from 'winston';
import path from 'path';

const env = process.env.NODE_ENV;
const logDir = path.join(process.cwd(), '/logs'); // log 파일을 관리할 폴더

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    handleExceptions: true,
    maxFiles: 5,
    zippedArchive: true, // 로그가 쌓이면 압축하여 관리
  };
};

// log level => error: 0 , warn: 1 , info: 2 , http: 3 , verbose: 4 , debug: 5 , silly: 6
export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: env === 'production' ? 'warn' : 'silly',
      format:
        env === 'production'
          ? winston.format.simple()
          : winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp({ format: 'YYYY-MM-DD' }),
              utilities.format.nestLike('초기세팅', {
                colors: true,
                prettyPrint: true,
              }),
            ),
      handleExceptions: true,
    }),

    // warn, error 로그는 파일로 관리
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
});
