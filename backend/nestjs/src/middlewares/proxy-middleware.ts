import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  private readonly proxyMiddleware;
  private signerUrl: string;
  private pathUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.signerUrl = this.configService.get<string>('SIGNER_URL');
    this.pathUrl = '';

    this.proxyMiddleware = createProxyMiddleware({
      target: this.signerUrl,
      changeOrigin: true,
      selfHandleResponse: true,
      pathRewrite: {
        '^/api/': '/', // rewrite path
      },
      secure: false,
      logger: console,
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.pathUrl =
      req.originalUrl === '/api' ? '/' : req.originalUrl.replace('/api', '');

    const hasRoute = req.app._router.stack.some((layer) => {
      if (!layer.route) {
        return false; // If it's not a route, skip it
      }

      return (
        this.pathUrl === req.path &&
        layer.route.methods[req.method.toLowerCase()]
      );
    });

    if (!hasRoute) {
      console.log(
        'No route found. Going to signer via url: ',
        this.signerUrl + this.pathUrl,
      );
      return this.proxyMiddleware(req, res, next);
    } else {
      return next();
    }
  }
}
