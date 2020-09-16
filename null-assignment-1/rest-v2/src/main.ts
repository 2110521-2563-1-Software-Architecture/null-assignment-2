import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('List, Get, Insert, Delete Books')
    .setVersion('0.0.1')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
 
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
