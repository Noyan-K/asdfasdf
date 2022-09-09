import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '0.0.0.0',
  port: 5432,
  username: 'postgres1',
  password: '1234',
  database: 'postgres1',
  synchronize: false,
  logging: true,
  entities: ['dist/**/*entity.js'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
  name: 'testdb1',
});
