const mysql = require('mysql2/promise');

async function seedJobs() {
    const connection = await mysql.createConnection({
        host: 'yamabiko.proxy.rlwy.net',
        port: 35611,
        user: 'root',
        password: 'KHCbkrlHfTJNKnVNJwPCdZXOXuLPqvyd',
        database: 'railway'
    });

    console.log('Connected to MySQL database.');

    // 1. Ensure we have an employer
    const [rows] = await connection.execute(
        'SELECT id FROM users WHERE role = "employer" AND email = "employer@mockcompany.com"'
    );
    
    let employerId;
    if (rows.length === 0) {
        console.log('Inserting mock employer...');
        const [result] = await connection.execute(`
            INSERT INTO users (username, email, password, role, is_verified, created_at, updated_at) 
            VALUES ('Mock Employer', 'employer@mockcompany.com', '$2a$10$wE9O0.o3.jK9SStD5gA1a.fU8YgE6e5hQ2Ym2Ew//B0O.8N4LgVHO', 'employer', true, NOW(), NOW())
        `);
        employerId = result.insertId;
        console.log(`Employer inserted with ID: ${employerId}`);
    } else {
        employerId = rows[0].id;
        console.log(`Using existing employer ID: ${employerId}`);
    }

    // 2. Insert Mock Jobs
    const jobs = [
        {
            title: "Frontend Developer",
            description: "Join our growing frontend team and build beautiful, performant user interfaces using React and modern CSS frameworks.",
            company: "Webify Digital",
            location: "Bangalore, Karnataka",
            type: "FULL_TIME",
            status: "active",
            salary_min: 500000,
            salary_max: 800000,
            requirements: '["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"]'
        },
        {
            title: "Software Engineer",
            description: "We are looking for a passionate Software Engineer to join our team. You will design, develop and maintain scalable web applications.",
            company: "Tech Solutions Pvt. Ltd.",
            location: "Hyderabad, Telangana",
            type: "FULL_TIME",
            status: "active",
            salary_min: 600000,
            salary_max: 1000000,
            requirements: '["Java", "Spring Boot", "MySQL", "REST APIs", "Git"]'
        },
        {
            title: "Data Analyst",
            description: "Analyze large datasets to extract meaningful insights. Work with business teams to drive data-driven decisions.",
            company: "Analytics Hub",
            location: "Pune, Maharashtra",
            type: "FULL_TIME",
            status: "active",
            salary_min: 400000,
            salary_max: 700000,
            requirements: '["Python", "SQL", "Tableau", "Excel"]'
        },
        {
            title: "DevOps Engineer",
            description: "Design and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability and scalability.",
            company: "CloudBase Systems",
            location: "Remote",
            type: "FULL_TIME",
            status: "active",
            salary_min: 800000,
            salary_max: 1400000,
            requirements: '["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"]'
        }
    ];

    console.log('Inserting mock jobs...');
    for (const job of jobs) {
        await connection.execute(`
            INSERT INTO jobs (title, description, company, location, type, status, salary_min, salary_max, requirements, posted_by, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `, [
            job.title, 
            job.description, 
            job.company, 
            job.location, 
            job.type, 
            job.status, 
            job.salary_min, 
            job.salary_max, 
            job.requirements, 
            employerId
        ]);
        console.log(`Inserted job: ${job.title}`);
    }

    console.log('Seeding complete! Closing connection.');
    await connection.end();
}

seedJobs().catch(console.error);
