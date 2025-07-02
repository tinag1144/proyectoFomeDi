// database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

try {
  await sequelize.authenticate();
  console.log('✅ Conexión a MySQL con Sequelize exitosa');
} catch (error) {
  console.error('❌ Error al conectar con Sequelize:', error);
}

export default sequelize;
