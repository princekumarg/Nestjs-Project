import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { SongsModule } from './songs/songs.module';
import { Song } from './songs/song.entity';
// import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://swagger_owner:rH6gxNQF8quz@ep-wispy-poetry-a1kpxin9.ap-southeast-1.aws.neon.tech/Full_Stackdev?sslmode=require',
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Set to false in production
      //   type: 'postgres',
      //   host: 'localhost',
      //   port: 5432,
      //   username: 'your_username',
      //   password: 'your_db_password',
      //   database: 'n-test',
      //  entities: [],
      //   synchronize: true   (For local development only)
    }),
    SongsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(/*private dataSource: DataSource*/) {
    // console.log('dbName ', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2

    consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3
  }
}
