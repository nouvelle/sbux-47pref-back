import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// Controller
import { PrefController } from './controllers/pref.controller';
import { StoreController } from './controllers/store.controller';
import { PostsController } from './controllers/posts.controller';
import { TagsController } from './controllers/tags.controller';
import { ImageController } from './image/image.controller';
// Service
import { PrefService } from './services/pref.service';
import { StoreService } from './services/store.service';
import { PostsService } from './services/posts.service';
import { TagsService } from './services/tags.service';
import { ImageService } from './image/image.service';
import { TypeOrmConfigService } from './typeorm-config.service';
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
    TagsController,
    ImageController,
  ],
  providers: [
    PrefService,
    StoreService,
    PostsService,
    TagsService,
    ImageService,
  ],
})
export class AppModule {}
