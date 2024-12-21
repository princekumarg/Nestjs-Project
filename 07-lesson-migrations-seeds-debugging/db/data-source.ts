import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: 'postgresql://swagger_owner:rH6gxNQF8quz@ep-wispy-poetry-a1kpxin9.ap-southeast-1.aws.neon.tech/Full_Stackdev?sslmode=require',
  entities: ['dist/**/*.entity.js'], //1
  synchronize: false, // 2
  migrations: ['dist/db/migrations/*.js'], // 3
};

const dataSource = new DataSource(dataSourceOptions); //4
export default dataSource;
