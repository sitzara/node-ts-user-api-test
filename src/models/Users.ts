import UsersFileDb, { UsersResponse } from './UsersFileDb';


class Users extends UsersFileDb {
  async getData(page: number): Promise<UsersResponse> {
    return await this.__getData(page);
  }

  async appendData(data: Array<object>): Promise<void> {
    await this.__appendData(data);
  }
}

export default Users;
