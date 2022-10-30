import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log([__dirname + '/../**/*.entity.ts']);

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.js'], // root to create database table ,
  synchronize: true,
};
