import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 Cho phép CORS (frontend React chạy ở cổng 5173 hoặc 5174)
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.enableCors({
    origin: ['https://ia-03-beta.vercel.app', 'http://localhost:5173'],
  });


  await app.listen(process.env.PORT || 5000);
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT || 5000}`);
}
bootstrap();
