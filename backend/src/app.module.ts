import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProvider } from './db/database.provider';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ...databaseProvider],
})
export class AppModule {}
