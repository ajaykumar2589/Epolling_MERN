const db = require('../models');
exports.showPolls = async (req, res, next) => {
    try {
    //   const polls = await db.Poll.find().populate('user', ['username', 'id']);
    const polls = await db.Poll.find();
    res.status(200).json(polls);
      // .populate('voted', ['username', 'id']);
  
      return res.status(200).json(polls);
    } catch (err) {
        err.status = 400;
        next(400);
    //   return next({
    //     status: 400,
    //     message: err.message,
    //   });
    }
  };
  exports.createPoll = async (req, res, next) => {
    const { id } = req.decoded;
   
    try {
      const user = await db.User.findById(id);
    const { question, options } = req.body;
      const poll = await db.Poll.create({
        question,
        user,
        options: options.map(option => ({ option,
         votes: 0 })),
      });
     user.polls.push(poll._id);
     await user.save();
      // return res.status(201).json(poll);
    return res.status(201).json({ ...poll._doc, user: user._id });
    } catch (err) {
        // err.status = 400;
        // next(400);
      return next({
        status: 400,
        message: err.message,
      });
    }
  };