import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const TypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get('TYPEORM_HOST'),
    port: configService.get('TYPEORM_PORT'),
    username: configService.get('TYPEORM_USERNAME'),
    password: configService.get('TYPEORM_PASSWORD'),
    database: configService.get('TYPEORM_DATABASE'),
    synchronize: configService.get('TYPEORM_SYNCHONIZE'),
    logging: configService.get('TYPEORM_LOGGING'),
    entities: [configService.get('TYPEORM_ENTITIES')],
    migrations: [configService.get('TYPEORM_MIGRATIONS')],
  };
};

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres1',
  password: '1234',
  database: 'postgres',
  synchronize: false,
  logging: true,
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/migrations/*.js'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  // type: 'postgres',
  // host: configService.get('TYPEORM_HOST'),
  // port: configService.get('TYPEORM_PORT'),
  // username: configService.get('TYPEORM_USERNAME'),
  // password: configService.get('TYPEORM_PASSWORD'),
  // database: configService.get('TYPEORM_DATABASE'),
  // synchronize: configService.get('TYPEORM_SYNCHONIZE'),
  // logging: configService.get('TYPEORM_LOGGING'),
  // entities: [configService.get('TYPEORM_ENTITIES')],
  // migrations: [configService.get('TYPEORM_MIGRATIONS')],
  // subscribers: [configService.get('TYPEORM_SUBSCRIBERS')],
  // migrationsTableName: configService.get('TYPEORM_MIGRATIONS_TABLE_NAME'),
});
