import pgPromise from 'pg-promise';

const initOptions = {}; // You can configure additional options here if needed.

const pgp = pgPromise(initOptions);

// Define the database connection details
const connectionDetails = {
    host: 'localhost',
    port: 5432,
    database: 'dokpetrik',
    user: 'postgres',
    password: 'alma',
};

// Create a database instance
const db = pgp(connectionDetails);

export default db;
