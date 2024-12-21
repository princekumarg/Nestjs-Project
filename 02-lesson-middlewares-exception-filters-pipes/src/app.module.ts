import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerNoSpecNoFlatModule } from './common/middleware/logger--no-spec--no-flat/logger--no-spec--no-flat.module';
import { SongsController } from './songs/songs.controller';

@Module({
  imports: [SongsModule, LoggerNoSpecNoFlatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2

    consumer.apply(LoggerNoSpecNoFlatModule).forRoutes(SongsController); //option no 3
  }
}
