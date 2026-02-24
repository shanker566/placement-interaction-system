const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./src/models/Job');
const User = require('./src/models/User'); // Assuming User model path

dotenv.config();

const jobs = [
    {
        title: "Senior Full Stack Engineer",
        company: "TechFlow Systems",
        location: "San Francisco, CA (Remote)",
        type: "Full-time",
        salaryRange: { min: 140, max: 220, currency: "USD" },
        description: "We are looking for an experienced Full Stack Engineer to lead our core product team. You will be responsible for architecting scalable solutions using React, Node.js, and AWS. Experience with microservices is a plus.",
        requirements: ["React", "Node.js", "AWS", "System Design", "7+ years experience"],
        status: "active"
    },
    {
        title: "Product Designer",
        company: "Creative Pulse",
        location: "New York, NY",
        type: "Full-time",
        salaryRange: { min: 90, max: 150, currency: "USD" },
        description: "Join our award-winning design team. We need someone with a keen eye for detail and a passion for user-centric design. You will work closely with PMs and engineers to ship delightful experiences.",
        requirements: ["Figma", "UI/UX", "Prototyping", "User Research"],
        status: "active"
    },
    {
        title: "Marketing Manager",
        company: "GrowthRocket",
        location: "Austin, TX",
        type: "Full-time",
        salaryRange: { min: 80, max: 120, currency: "USD" },
        description: "Lead our growth marketing initiatives. You will be in charge of paid acquisition, SEO, and content strategy. Ideally, you have experience in B2B SaaS.",
        requirements: ["SEO", "SEM", "Content Marketing", "Google Analytics"],
        status: "active"
    },
    {
        title: "Backend Developer (Go)",
        company: "StreamLine",
        location: "Remote",
        type: "Contract",
        salaryRange: { min: 60, max: 100, currency: "USD" }, // Hourly implied or low annual request? Keeping generic k.
        description: "Help us migrate our legacy monolith to Go microservices. This is a 6-month contract with possibility of extension.",
        requirements: ["Go", "Kubernetes", "gRPC", "PostgreSQL"],
        status: "active"
    },
    {
        title: "Data Scientist Intern",
        company: "DataMinds",
        location: "Seattle, WA",
        type: "Internship",
        salaryRange: { min: 40, max: 60, currency: "USD" },
        description: "Great opportunity for students to work on real-world machine learning problems. You will work with our senior data scientists on NLP projects.",
        requirements: ["Python", "PyTorch", "SQL", "Machine Learning"],
        status: "active"
    },
    {
        title: "Frontend Developer",
        company: "PixelPerfect",
        location: "London, UK",
        type: "Full-time",
        salaryRange: { min: 50, max: 80, currency: "GBP" },
        description: "We need a pixel-perfect frontend developer who loves CSS and animations. You will be building marketing sites and web applications.",
        requirements: ["Vue.js", "Tailwind CSS", "GSAP", "JavaScript"],
        status: "active"
    },
    {
        title: "DevOps Engineer",
        company: "CloudScale",
        location: "Berlin, Germany",
        type: "Full-time",
        salaryRange: { min: 70, max: 110, currency: "EUR" },
        description: "Manage our cloud infrastructure and CI/CD pipelines. We are 100% on Azure.",
        requirements: ["Azure", "Docker", "Terraform", "CI/CD"],
        status: "active"
    },
    {
        title: "Mobile App Developer (iOS)",
        company: "Appify",
        location: "Toronto, Canada",
        type: "Full-time",
        salaryRange: { min: 90, max: 130, currency: "CAD" },
        description: "Build the next generation of our iOS app. Swift and SwiftUI expertise required.",
        requirements: ["Swift", "SwiftUI", "iOS SDK", "CocoaPods"],
        status: "active"
    }
];

const seedDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Find a user to assign jobs to
        let user = await User.findOne({ role: 'employer' });
        if (!user) {
            user = await User.findOne(); // Any user
        }

        if (!user) {
            console.error("No users found in DB to assign jobs to. Please register a user first.");
            process.exit(1);
        }

        console.log(`Assigning jobs to user: ${user.username} (${user._id})`);

        const jobsWithUser = jobs.map(job => ({ ...job, postedBy: user._id }));

        await Job.insertMany(jobsWithUser);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedDB();
