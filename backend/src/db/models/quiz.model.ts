import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Question } from './question.model';

@Table({ tableName: 'quizzes', timestamps: true })
export class Quiz extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @HasMany(() => Question)
  questions: Question[];
}
