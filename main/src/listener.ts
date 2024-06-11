import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://tuxpvltt:x7Z-Vv6bxdQIK2PtC3-fgqj395xCfAgQ@armadillo.rmq.cloudamqp.com/tuxpvltt',
      ],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.listen();
  console.log('Microservice is listening');
}
bootstrap();
