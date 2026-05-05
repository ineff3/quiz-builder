import { Module } from '@nestjs/common';
import { databaseProvider } from './db/database.provider';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [...databaseProvider, QuizzesModule],
})
export class AppModule {}
