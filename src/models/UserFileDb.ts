import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import axios from '../lib/axios';
import config from '../config';


const { imagesPath } = config;

const fileOpen = promisify(fs.open);
const readFile = promisify(fs.readFile);
const unlinkFile = promisify(fs.unlink);
const writeFile = promisify(fs.write);
const closeFile = promisify(fs.close);

class UserFileDb {
  constructor(protected id: number) { }

  protected async __fetchFile(url: string): Promise<Buffer> {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
    });
    return response.data;
  }

  protected async __getAvatar(url: string): Promise<Buffer> {
    const avatarPath = path.resolve(`${imagesPath}/avatar_${this.id}.jpg`);
    let fd: number | null = null;

    try {
      fd = await fileOpen(avatarPath, 'wx');

      const buffer = await this.__fetchFile(url);

      await writeFile(fd, buffer);
      return buffer;
    } catch (error) {
      if (error.code === 'EEXIST') {
        return await readFile(avatarPath);
      }
      throw error;
    } finally {
      if (fd !== null) {
        await closeFile(fd);
      }
    }
  }

  protected async __deleteAvatar() {
    const avatarPath = path.resolve(`${imagesPath}/avatar_${this.id}.jpg`);

    try {
      await unlinkFile(avatarPath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return;
      }
      throw error;
    }
  }
}

export default UserFileDb;
