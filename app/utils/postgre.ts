import { createClient } from '@vercel/postgres';

export const getData = async (id: string) => {
  const client = createClient({ connectionString: process.env.POSTGRES_URL_NON_POOLING });
  await client.connect();
  try {
    const data = await client.sql`SELECT * FROM lambda_code WHERE id = ${id};`;
    return data.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Error getting data');
  } finally {
    await client.end();
  }
}

export const addNewData = async (data: any) => {
  const client = createClient({ connectionString: process.env.POSTGRES_URL_NON_POOLING });
  await client.connect();
  try {
    await client.sql`INSERT INTO lambda_code (id, code) VALUES (${data.id}, ${data.code});`;
  } catch (error) {
    console.error(error);
    throw new Error('Error adding new data');
  } finally {
    await client.end();
  }
}

export const updateData = async (data: any) => {
  const client = createClient({ connectionString: process.env.POSTGRES_URL_NON_POOLING });
  await client.connect();
  try {
    await client.sql`UPDATE lambda_code SET code = ${data.code} WHERE id = ${data.id};`;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating data');
  } finally {
    await client.end();
  }
}