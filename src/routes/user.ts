import express from 'express';
import User from '../models/User';


const router = express.Router();

router.get('/:id', async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const user = new User(id);
    const data = await user.getData();

    res.send(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/:id/avatar', async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const user = new User(id);

    const avatar = await user.getAvatar();

    res.send(avatar);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/:id/avatar', async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const user = new User(id);

    await user.deleteAvatar();

    res.send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
