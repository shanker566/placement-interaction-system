require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/placement';

(async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    // Ensure User model is registered for populate()
    const User = require('../models/User');
    const Job = require('../models/Job');
    const jobs = await Job.find({}).populate('postedBy', 'username email role profile');
    console.log(`Found ${jobs.length} jobs:\n`);
    jobs.forEach(j => {
      console.log('ID:', j._id);
      console.log('Title:', j.title);
      console.log('Company:', j.company);
      console.log('PostedBy:', j.postedBy ? `${j.postedBy._id} (${j.postedBy.username || j.postedBy.email})` : 'null');
      console.log('Requirements:', j.requirements);
      console.log('SalaryRange:', j.salaryRange);
      console.log('---');
    });
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();