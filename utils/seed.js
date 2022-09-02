// const connection = require('../config/connection');
// const { User, Thoughts } = require('../models');
// const { getRandomUser, getRandomThought } = require('./data');

// connection.on('error', (err) => err);

// connection.once('open', async () => {
//     console.log('connected');

// const users = [];

// // Loop 4 times -- add users to users array
// for (let i = 0; i < 4; i++) {
//     const thoughts = getRandomThought(4);

//     const username = getRandomUser();
    
//     users.push({
//         username,
//         thoughts,
//     });
// }

// await User.collection.insertMany(users);

// console.table(users);
// console.info('Seeding complete!');
// process.exit(0);
// });

import { Seeder } from 'mongoose-data-seed';
import { User } from '../server/models';

const data = [{
  email: 'user1@gmail.com',
  password: '123123', password_confirmation: '123123',
  isAdmin: true
}, {
  email: 'user2@gmail.com',
  password: '123123', password_confirmation: '123123',
  isAdmin: false
}];

class UsersSeeder extends Seeder {

  async shouldRun() {
    const usersCount =  await User.count().exec();

    return usersCount === 0;
  }

  async run() {
    return User.create(data);
  }
}

export default UsersSeeder;