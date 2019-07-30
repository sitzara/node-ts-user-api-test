import axios from '../lib/axios';
import UserFileDb from './UserFileDb';


class User extends UserFileDb {
  constructor(protected id: number) {
    super(id);
  }

  async getData() {
    const url = `/users/${this.id}`;

    const { data: { data } } = await axios.get(url);
    return data;
  }

  async getAvatar() {
    const { avatar } = await this.getData();
    const image = await this.__getAvatar(avatar);

    return image.toString('base64');
  }

  async deleteAvatar() {
    await this.__deleteAvatar();
  }
}

export default User;
