import schedule from 'node-schedule';
import Users from '../models/Users';

let page = 1;

const users = new Users();

const job = schedule.scheduleJob('* * * * *', async () => {
  try {
    const response = await users.getData(page);

    const { data, total_pages: totalPages } = response;

    if (page > totalPages) {
      job.cancel();
      return;
    }

    await users.appendData(data);
    page++;
  } catch (error) {
    console.log(error);
  }
});
