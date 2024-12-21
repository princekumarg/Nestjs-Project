import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerNoSpecNoFlatModule } from './common/middleware/logger--no-spec--no-flat/logger--no-spec--no-flat.module';
import { DevConfigService } from './common/providers/DevConfigService';
import { SongsController } from './songs/songs.controller';
const devConfig = { port: 3000 };
const proConfig = { port: 4000 };
@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
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
