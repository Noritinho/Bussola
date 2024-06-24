import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const product = req.body.price;
    req.body.price = product * 1.15;
    console.log(`price: ${req.body.price}`);
    next();
  }
}
