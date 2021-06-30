import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// Controller
import { PrefController } from './controllers/pref.controller';
import { PostsController } from './controllers/posts.controller';
import { ImageController } from './controllers/image.controller';
// Service
import { PrefService } from './services/pref.service';
import { PostsService } from './services/posts.service';
import { ImageService } from './services/image.service';
import { SecretkeyService } from './services/secretkey.service';
import { TypeOrmConfigService } from './typeorm-config.service';
// Helper
import { Aws } from './helpers/aws';
// Entities
import { Pref } from './entities/pref.entity';
import { Posts } from './entities/posts.entity';
import { Secretkey } from './entities/secretkey.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Pref, Posts, Secretkey]),
  ],
  controllers: [PrefController, PostsController, ImageController],
  providers: [PrefService, PostsService, ImageService, SecretkeyService, Aws],
})
export class AppModule {}
