import express from 'express';
import cors from 'cors';
import handleSignIn from './controllers/sign-in.controller.mjs';
import handleSignUp from './controllers/sign-up.controller.mjs';
import handleRank from './controllers/rank.controller.mjs';
import handleGetUser from './controllers/sign-up.controller.mjs';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req, res) => {
   res.send(database.users);
});

app.post('/signin', (req, res) => handleSignIn(req, res));

app.post('/signup', (req, res) => handleSignUp(req, res));

app.put('/image', (req, res) => handleRank(req, res));

app.get('/user/:id', (req, res) => handleGetUser(req, res));

app.listen(port, () => console.log(`Server is running on port ${port}`));
