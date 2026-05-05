import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Quiz } from './models/quiz.model';
import { Question } from './models/question.model';

export const databaseProvider = [
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      dialect: 'postgres',
      host: config.get<string>('POSTGRES_HOST'),
      port: config.get<number>('POSTGRES_PORT'),
      username: config.get<string>('POSTGRES_USER'),
      password: config.get<string>('POSTGRES_PASSWORD'),
      database: config.get<string>('POSTGRES_DB'),
      models: [Quiz, Question],
      logging: false,
    }),
  }),
];
