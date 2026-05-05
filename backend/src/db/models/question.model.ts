import {
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Quiz } from './quiz.model';

@Table({ tableName: 'questions', timestamps: true })
export class Question extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT), allowNull: false })
  options: string[];

  @Column({ type: DataType.INTEGER, allowNull: false })
  correctOptionIndex: number;

  @ForeignKey(() => Quiz)
  @Column({ type: DataType.INTEGER, allowNull: false })
  quizId: number;

  @BelongsTo(() => Quiz)
  quiz: Quiz;
}
