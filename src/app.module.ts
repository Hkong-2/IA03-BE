import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Load .env and make ConfigService available globally
    ConfigModule.forRoot({ isGlobal: true }), // Đọc file .env

    // Use forRootAsync so ConfigService is available when resolving the Mongo URI
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGODB_URI');
        if (!mongoUri) {
          throw new Error('Environment variable MONGODB_URI must be defined');
        }
        return {
          uri: mongoUri,
          // you can add other mongoose options here if needed
        } as any;
      },
    }),

    UserModule,
  ],
})
export class AppModule { }
