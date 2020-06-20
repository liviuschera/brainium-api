import bcrypt from 'bcryptjs';
import { insertUser } from '../database/query.database.mjs';

export default async function handleSignUp(req, res) {
   const { firstName, lastName, email, password } = req.body;
   try {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);

      const userExists = await insertUser({
         first_name: firstName,
         last_name: lastName,
         email,
         password: hash,
         joined: new Date(),
      });
      console.log('user exists: ', userExists);
      if (userExists) {
         res.json(userExists);
      } else {
         throw new Error('Email already exists.');
      }
   } catch (error) {
      console.error(error.message);
      res.status(400).json('Signup error');
   }
}
