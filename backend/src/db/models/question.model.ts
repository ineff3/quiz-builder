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

  @Column({
    type: DataType.ENUM('boolean', 'input', 'checkbox'),
    allowNull: false,
  })
  type: 'boolean' | 'input' | 'checkbox';

  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT), allowNull: true })
  options: string[] | null;

  @Column({ type: DataType.TEXT, allowNull: true })
  correctAnswer: string | null;

  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: true })
  correctOptionIndices: number[] | null;

  @ForeignKey(() => Quiz)
  @Column({ type: DataType.INTEGER, allowNull: false })
  quizId: number;

  @BelongsTo(() => Quiz)
  quiz: Quiz;
}
