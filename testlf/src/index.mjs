import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  password: 'Adri2319$',
  host: 'db-identifier-aws-postgre.cj6s66gsqow2.us-east-2.rds.amazonaws.com',
  port: 5432,
  database: 'sampleDB', // Aquí se cambió el nombre de la base de datos
  ssl: { rejectUnauthorized: false }
});

export const handler = async (event) => {
  try {
    const res = await pool.query(`
      SELECT id, disease_name, embedding <=> '[0.5890059,0.7029781,0.78916353]'::vector AS distance 
      FROM test_embeddings
      ORDER BY distance
      LIMIT 5;
    `);
    console.log(res.rows); // res.rows contiene los resultados de la consulta

    return {
      statusCode: 200,
      body: JSON.stringify(res.rows),  // Devuelve los resultados en el body de la respuesta
    };
  } catch (err) {
    console.error('Error executing query', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error executing query', error: err }),
    };
  }
};