import knex from 'knex';

const db = knex({
   client: 'pg',
   connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
         rejectUnauthorized: false,
      },
      // host: '127.0.0.1',
      // user: 'postgres',
      // password: 'a',
      // database: 'brainium',
      // port: 5432
   },
});

export default db;
