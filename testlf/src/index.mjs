import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'USER',
  password: '$$$$$',
  host: 'db-identifier-aws-postgre.kshfgsY77292Lgsqow2.us-east-4.rds.amazonaws.com',
  port: 4431,
  database: 'database', // Aquí se cambió el nombre de la base de datos
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
