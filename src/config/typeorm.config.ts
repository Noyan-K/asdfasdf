import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../.production.env' });

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: Boolean(process.env.TYPEORM_SYNCHONIZE),
      logging: Boolean(process.env.TYPEORM_LOGGING),
      entities: [process.env.TYPEORM_ENTITIES],
      migrations: [process.env.TYPEORM_MIGRATIONS],
    };
  }
}

export const typeOrmMigrationConfig = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: Boolean(process.env.TYPEORM_SYNCHONIZE),
  logging: Boolean(process.env.TYPEORM_LOGGING),
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  subscribers: [process.env.TYPEORM_SUBSCRIBERS],
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
});
