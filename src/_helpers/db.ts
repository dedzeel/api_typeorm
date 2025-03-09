import { DataSource, Repository } from 'typeorm';
import config from '../../config.json';
import mysql from 'mysql2/promise';
import { User } from '../users/user.model';

export interface Database {
    User: Repository<User>;
}

export const db: Database = {} as Database;

initialize();

async function initialize() {
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({ host, port: +port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  const datasource = new DataSource({
    type: 'mysql',
    host,
    port: +port,
    username: user,
    password,
    database,
    entities: [User],
    synchronize: true,
  });
  db.User = datasource.getRepository(User);
  await datasource.initialize();
}


export default db;
