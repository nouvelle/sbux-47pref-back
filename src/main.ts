import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  console.log('NODE_ENV', configService.get('NODE_ENV'));
  console.log('HEROKU_STG', configService.get('HEROKU_STG'));

  // dev または Heroku staging 環境 のみswagger設定
  if (configService.get('NODE_ENV') === 'development' || configService.get('HEROKU_STG')) {
    console.log('Hello!');
    const config = new DocumentBuilder()
      .setTitle('SBUX API :)')
      .setDescription("This is jimoto frappuccino App's API.")
      .setVersion('1.0')
      .addTag('pref')
      .addTag('posts')
      .addTag('image')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.enableCors({
      origin: '*',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    });
  } else {
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
      origin: 'https://sbux-47pref-dev.surge.sh',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    });
  }

  await app.listen(process.env.PORT || 5001);
}
bootstrap();
