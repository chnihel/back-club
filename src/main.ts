import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  // 🔹 Servir les fichiers statiques depuis le dossier "storage"
  app.useStaticAssets(join(__dirname, '..', 'storage'), { prefix: '/file' });  
  app.use('/static', express.static(join(__dirname, '..', 'public')));
  app.use('/paiement/webhook', bodyParser.raw({ type: '*/*' })); // <- important

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
