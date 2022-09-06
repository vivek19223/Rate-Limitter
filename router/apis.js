import {Router} from 'express';
import {getPosts, getUsers} from '../service/jsonPlaceHolder.js';
import {ServiceUnavailableError} from '../error/errors.js';

const router = Router ();

router.get ('/posts', async (req, res) => {
  try {
    const posts = await getPosts ();
    res.status (200).send (posts);
  } catch (error) {
    res.status (500).send (new ServiceUnavailableError ());
  }
});

router.get ('/users', async (req, res) => {
  try {
    const users = await getUsers ();
    res.status (200).send (users);
  } catch (e) {
    res.status (500).send (new ServiceUnavailableError ());
  }
});

export default router;
