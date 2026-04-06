const axios = require('axios');

const BASE_URL = 'https://placement-interaction-system-new.onrender.com/api';

const mockJobs = [
    {
        title: "Software Engineer",
        company: "Tech Solutions Pvt. Ltd.",
        location: "Hyderabad, Telangana",
        type: "Full-Time",
        salary: "6 - 10 LPA",
        description: "We are looking for a passionate Software Engineer to join our team. You will design, develop and maintain scalable web applications using modern tech stacks.",
        requirements: "B.Tech/B.E in CS/IT, Strong in DSA, Experience with Java or Python, Knowledge of REST APIs",
        skills: ["Java", "Spring Boot", "MySQL", "REST APIs", "Git"],
        experience: "0-2 years",
        openings: 5
    },
    {
        title: "Frontend Developer",
        company: "Webify Digital",
        location: "Bangalore, Karnataka",
        type: "Full-Time",
        salary: "5 - 8 LPA",
        description: "Join our growing frontend team and build beautiful, performant user interfaces using React and modern CSS frameworks.",
        requirements: "Strong proficiency in React.js, HTML5, CSS3, JavaScript ES6+. Familiarity with Tailwind CSS.",
        skills: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
        experience: "0-1 years",
        openings: 3
    },
    {
        title: "Data Analyst",
        company: "Analytics Hub",
        location: "Pune, Maharashtra",
        type: "Full-Time",
        salary: "4 - 7 LPA",
        description: "Analyze large datasets to extract meaningful insights. Work with business teams to drive data-driven decisions.",
        requirements: "Proficiency in Python, SQL, Excel. Knowledge of Tableau or Power BI. Good analytical and communication skills.",
        skills: ["Python", "SQL", "Tableau", "Excel", "Statistics"],
        experience: "0-2 years",
        openings: 4
    },
    {
        title: "DevOps Engineer",
        company: "CloudBase Systems",
        location: "Remote",
        type: "Full-Time",
        salary: "8 - 14 LPA",
        description: "Design and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability and scalability.",
        requirements: "Experience with AWS/GCP/Azure, Docker, Kubernetes, Jenkins or GitHub Actions. Linux proficiency.",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
        experience: "1-3 years",
        openings: 2
    }
];

async function seedJobs() {
    try {
        console.log('Registering employer...');
        await axios.post(`${BASE_URL}/auth/register`, {
            username: "SeedEmployer",
            email: "seed@employer.com",
            password: "password123",
            role: "employer"
        }).catch(err => {
            if (err.response && err.response.data.message.includes('already exists')) {
                console.log('Employer already exists, skipping registration.');
            } else {
                throw err;
            }
        });

        // Normally we'd need to verify OTP, but we can use the tempuser we created with the browser subagent earlier
        // Wait, the tempuser from earlier was '2400080087@kluniversity.in' with role 'student'. Students can't post jobs.
        // Let's create an employer using the browser subagent or DB directly if possible, or we can just send the request
        // Wait, we can't bypass OTP unless we update the DB.

    } catch (error) {
        console.error('Error:', error.message);
    }
}

seedJobs();
