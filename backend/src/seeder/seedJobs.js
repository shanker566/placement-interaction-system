require('dotenv').config();
const mongoose = require('mongoose');
const { Types } = mongoose;

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/placement';

let mockJobs = [
    {
        title: 'Frontend Developer',
        company: 'Acme Tech',
        location: 'Remote',
        type: 'Full-time',
        salary: '₹6,00,000 - ₹8,00,000',
        description: 'Build responsive UIs with React.',
        skills: ['React', 'JavaScript', 'CSS'],
        postedAt: new Date(),
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        // postedBy will be assigned after ensuring a demo employer exists
        postedBy: null
    },
    {
        title: 'Backend Engineer',
        company: 'DataWorks',
        location: 'Bengaluru',
        type: 'Full-time',
        salary: '₹8,00,000 - ₹12,00,000',
        description: 'Design REST APIs and manage databases.',
        skills: ['Node.js', 'Express', 'MongoDB'],
        postedAt: new Date(),
        deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        postedBy: null
    },
    {
        title: 'DevOps Intern',
        company: 'Cloudify',
        location: 'Hyderabad',
        type: 'Internship',
        salary: '₹1,00,000 - ₹2,00,000',
        description: 'Assist with CI/CD and infrastructure as code.',
        skills: ['Docker', 'GitHub Actions', 'AWS'],
        postedAt: new Date(),
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        postedBy: null
    },
    {
        title: 'Data Analyst',
        company: 'Insight Labs',
        location: 'Chennai',
        type: 'Contract',
        salary: '₹4,00,000 - ₹6,00,000',
        description: 'Analyze datasets and create dashboards.',
        skills: ['Python', 'Pandas', 'SQL'],
        postedAt: new Date(),
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        postedBy: null
    },
    {
        title: 'Mobile App Developer',
        company: 'Appster',
        location: 'Remote',
        type: 'Full-time',
        salary: '₹7,00,000 - ₹10,00,000',
        description: 'Build cross-platform apps using React Native.',
        skills: ['React Native', 'JavaScript', 'REST APIs'],
        postedAt: new Date(),
        deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
        postedBy: null
    }
];

(async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected:', new URL(MONGO_URI.includes('mongodb') ? MONGO_URI.replace('mongodb://', 'http://') : MONGO_URI).hostname || MONGO_URI);

        let Job;
        try {
            Job = require('../models/Job');
        } catch (e) {
            const { Schema } = mongoose;
            const jobSchema = new Schema({
                title: String,
                company: String,
                location: String,
                type: String,
                salary: String,
                description: String,
                skills: [String],
                postedAt: Date,
                deadline: Date,
                postedBy: { type: Schema.Types.ObjectId, required: true }
            }, { timestamps: true });
            Job = mongoose.model('Job', jobSchema);
        }

        // Ensure there is a demo employer to attribute seeded jobs to
        const User = require('../models/User');
        const { hashPassword } = require('../utils/hashPassword');

        let demoEmployer = await User.findOne({ role: 'employer' });
        if (!demoEmployer) {
            const hashed = await hashPassword('password123');
            demoEmployer = await User.create({
                username: 'demo_employer',
                email: 'demo@company.com',
                password: hashed,
                role: 'employer',
                isVerified: true,
                profile: { companyName: 'Demo Company' }
            });
            console.log('Created demo employer:', demoEmployer.email);
        }

        // assign postedBy for all mock jobs and normalize fields to match Job schema
        const normalizeSalary = (salaryStr) => {
            if (!salaryStr) return { currency: 'INR' };
            try {
                const parts = salaryStr.split('-').map(p => p.replace(/[^0-9]/g, ''));
                const min = parts[0] ? Number(parts[0]) : undefined;
                const max = parts[1] ? Number(parts[1]) : undefined;
                return { min, max, currency: 'INR' };
            } catch (e) {
                return { currency: 'INR' };
            }
        };

        mockJobs = mockJobs.map(j => {
            const requirements = j.skills || j.requirements || [];
            const salaryRange = j.salary ? normalizeSalary(j.salary) : (j.salaryRange || { currency: 'INR' });
            return { ...j, postedBy: demoEmployer._id, requirements, salaryRange };
        });

        await Job.deleteMany({});
        console.log('Old jobs removed');

        const result = await Job.insertMany(mockJobs);
        console.log(`Inserted ${result.length} mock jobs`);
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
})();
