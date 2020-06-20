import db from './connect.database.mjs';

export async function getAllUsers() {
  try {
    return await db.select('*').from('users');
  } catch (error) {
    console.error('Retrieving users error:', error);
  }
}

export async function insertUser(data) {
  const { first_name, last_name, email, password } = data;
  let result;
  return await db.transaction(async (trx) => {
    try {
      const insertIntoUsers = await trx('users')
        .insert({ first_name, last_name, joined: new Date(), email })
        .returning('*');

      await trx('login')
        .insert({
          hash: password,
          email: insertIntoUsers[0]?.email,
          created_on: new Date(),
        })
        .returning('*');

      return insertIntoUsers?.[0];
    } catch (error) {
      console.error('Insert user error: ', error.message);
    }

    return result;
  });
}

export async function getUserById(id) {
  try {
    return await db.select('*').from('users').where({ id: id });
  } catch (error) {
    console.error(`Unable to retrieve user with id: ${id}`, error);
  }
}

export async function getUserLogin(email) {
  try {
    const user = await db.raw(
      `SELECT users.id  AS id,
       users.first_name AS first_name,
       users.last_name  AS last_name,
       users.email      AS email,
       users.entries    AS entries,
       users.joined     AS joined,
       login.hash       AS hash
      FROM   users
      JOIN login
      ON users.email = login.email
      WHERE users.email = ?;`,
      [email]
    );
    return user?.rows[0];
  } catch (error) {
    console.error(`Unable to retrieve user with email: ${email}`, error);
  }
}

export async function updateUserEntries(id) {
  try {
    return await db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('*');
  } catch (error) {
    console.error('updateUserEntries: Unable to update entry.', error.message);
    return new Error(error);
  }
}
