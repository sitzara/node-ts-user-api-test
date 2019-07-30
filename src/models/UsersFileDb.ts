import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import axios from '../lib/axios';
import config from '../config';


const { filesPath } = config;

const appendFile = promisify(fs.appendFile);

export interface UserData {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string,
}

export interface UsersResponse {
  data: Array<UserData>,
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
}

class UsersFileDb {
  protected async __getData(page: number): Promise<UsersResponse> {
    const { data } = await axios.get(`/users?page=${page}`);
    return data;
  }

  protected async __appendData(data: Array<object>): Promise<void> {
    const usersStorePath = path.resolve(`${filesPath}/users.txt`);

    await appendFile(usersStorePath, `${JSON.stringify(data)}\n`);
  }
}

export default UsersFileDb;
