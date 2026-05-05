import { SequelizeModule } from '@nestjs/sequelize';
import { Quiz } from './models/quiz.model';
import { Question } from './models/question.model';

export const databaseProvider = [
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    models: [Quiz, Question],
    sync: { alter: true },
    logging: false,
  }),
];
