import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPasswrord = process.env.DB_PASSWORD;
const dbHostname = process.env.DB_HOSTNAME;

// console.log(dbUsername, dbName, dbHostname);

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(dbName, dbUsername, dbPasswrord, {
  host: dbHostname,
  dialect: 'postgres',
});

const connectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { connectionDB };
export default sequelize;
