import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Quiz } from '../db/models/quiz.model';
import { Question } from '../db/models/question.model';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz) private quizModel: typeof Quiz,
    @InjectModel(Question) private questionModel: typeof Question,
  ) {}

  async create(dto: CreateQuizDto): Promise<Quiz> {
    const quiz = await this.quizModel.create({
      title: dto.title,
      description: dto.description,
    });
    if (dto.questions?.length) {
      await this.questionModel.bulkCreate(
        dto.questions.map((q) => ({ ...q, quizId: quiz.id })),
      );
    }
    return this.findOne(quiz.id);
  }

  async findAll(): Promise<
    { id: number; title: string; questionCount: number }[]
  > {
    const quizzes = await this.quizModel.findAll({ include: [Question] });

    return quizzes.map((q) => ({
      id: q.get('id'),
      title: q.get('title'),
      questionCount: q.get('questions')?.length ?? 0,
    }));
  }

  async findOne(id: number): Promise<Quiz> {
    const quiz = await this.quizModel.findByPk(id, { include: [Question] });
    if (!quiz) throw new NotFoundException(`Quiz ${id} not found`);
    return quiz;
  }

  async remove(id: number): Promise<void> {
    const quiz = await this.quizModel.findByPk(id);
    if (!quiz) throw new NotFoundException(`Quiz ${id} not found`);
    await quiz.destroy();
  }
}
