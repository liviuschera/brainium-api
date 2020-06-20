import { getUserById, updateUserEntries } from '../database/query.database.mjs';

export default async function handleRank(req, res) {
   const { id } = req.body;
   console.log('UPDATE ENTRY: ', id);
   const userExists = await getUserById(id);

   if (userExists) {
      const updateEntry = await updateUserEntries(id);

      if (updateEntry instanceof Error) {
         res.status(404).json(
            'Unable to update user entries (db query failed)'
         );
      } else {
         res.json(updateEntry[0]);
      }
   } else {
      res.status(404).json('Unable to update user entries (no such user)');
   }
}
