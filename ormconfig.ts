module.exports = {
  'type': 'postgres',
  'host': process.env.POSTGRES_HOST,
  'port': Number(process.env.POSTGRES_PORT),
  'username': process.env.POSTGRES_USER,
  'password': process.env.POSTGRES_PASSWORD,
  'database': process.env.POSTGRES_DB,
  'synchronize': true,
  'logging': true,
  'entities': process.env.NODE === 'test'
    ? [ 'src/modules/**/entities/*.entity.ts' ]
    : [ 'dist/**/*.entity.js' ],
  'migrations': process.env.NODE === 'test'
    ? [ 'src/migrations/*.ts' ]
    : [ 'dist/src/migrations/*.js' ],
  'migrationsTableName': 'migrations',
  'migrationsRun': true
}