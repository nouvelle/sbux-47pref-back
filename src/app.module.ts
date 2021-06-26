import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// Controller
import { PrefController } from './controllers/pref.controller';
import { StoreController } from './controllers/store.controller';
import { PostsController } from './controllers/posts.controller';
import { ImageController } from './controllers/image.controller';
// Service
import { PrefService } from './services/pref.service';
import { StoreService } from './services/store.service';
import { PostsService } from './services/posts.service';
import { ImageService } from './services/image.service';
import { TypeOrmConfigService } from './typeorm-config.service';
// Helper
import { Aws } from './helpers/aws';
// Entities
import { Pref } from './entities/pref.entity';
import { Store } from './entities/store.entity';
import { Posts } from './entities/posts.entity';

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
    TypeOrmModule.forFeature([Pref, Store, Posts]),
  ],
  controllers: [
    PrefController,
    StoreController,
    PostsController,
    ImageController,
  ],
  providers: [PrefService, StoreService, PostsService, ImageService, Aws],
})
export class AppModule {}
