import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quiz } from '../db/models/quiz.model';
import { Question } from '../db/models/question.model';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';

@Module({
  imports: [SequelizeModule.forFeature([Quiz, Question])],
  providers: [QuizzesService],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
