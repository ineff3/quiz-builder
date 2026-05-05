import { Module } from '@nestjs/common';
import { databaseProvider } from './db/database.provider';

@Module({
  imports: [...databaseProvider],
})
export class AppModule {}
