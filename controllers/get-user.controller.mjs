import { getUserById } from '../database/query.database';

export default async function handleGetUser(req, res) {
  const userExists = await getUserById(req.params.id);

  if (userExists.length > 0) {
    res.json(userExists);
  } else {
    res.status(404).json("User doesn't exists");
  }
}
