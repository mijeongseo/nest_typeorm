import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request; // 요청 객체로부터 ip, http method, url, user agent를 받아온 후
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      // 응답이 끝나는 이벤트가 발생하면 로그를 찍는다.
      const { statusCode } = response;
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
