import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Question } from './question.model';

@Table({ tableName: 'quizzes', timestamps: true })
export class Quiz extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @HasMany(() => Question)
  questions: Question[];
}
