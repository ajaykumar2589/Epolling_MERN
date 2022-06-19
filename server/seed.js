require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
//process.env.DATABASE
//process.env.DATABASE
//process.env.DATABASE
mongoose.connect(process.env.DATABASE);

const db = require('./models');

const users = [
  { username: 'username', password: 'password' },
  { username: 'ajaykumar', password: 'password' },
];

const polls = [
  {
    question: 'Which is the best JavaScript framework',
    options: ['Angular', 'React', 'VueJS'],
  },
  { question: 'Who is the best mutant', options: ['Wolverine', 'Deadpool'] },
  { question: 'Truth or dare', options: ['Truth', 'Dare'] },
  { question: 'Boolean?', options: ['True', 'False'] },
];
//we are creating duplicate data
const seed = async () => {
  try {
  //first we remove all users
    await db.User.remove();
    console.log('DROP ALL USERS');
///we remove all polls
    await db.Poll.remove();
    console.log('DROP ALL POLLS');
//we are creating duplicate data for users
    await Promise.all(
      users.map(async user => {
        const data = await db.User.create(user);
        await data.save();
      }),
    );
    console.log('CREATED USERS', JSON.stringify(users));
//we are creating a new poll data
    await Promise.all(
      polls.map(async poll => {
        poll.options = poll.options.map(option => ({ option, votes: 0 }));
        const data = await db.Poll.create(poll);
        const user = await db.User.findOne({ username: 'username' });
        data.user = user;
        user.polls.push(data._id);
        await user.save();
        await data.save();
      }),
    );
    console.log('CREATED POLLS', JSON.stringify(polls));
  } catch (err) {
    console.error(err);
  }
};

seed();