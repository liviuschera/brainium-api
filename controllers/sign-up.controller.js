// import bcrypt from 'bcryptjs';
import bcrypt from 'bcrypt-nodejs';
import { insertUser } from '../database/query.database.js';

export default async function handleSignUp(req, res) {
   const { firstName, lastName, email, password } = req.body;
   try {
      // var salt = bcrypt.genSaltSync(10);
      // var hash = bcrypt.hashSync(password, salt);
      const hash = bcrypt.hashSync(password);

      const userExists = await insertUser({
         first_name: firstName,
         last_name: lastName,
         email,
         password: hash,
         joined: new Date(),
      });
      // console.log('user exists: ', userExists);
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
