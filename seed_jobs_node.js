const mysql = require('mysql2/promise');

async function seed() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '2400080042',
        database: 'placement_portal'
    });

    console.log("Connected to placement_portal...");

    // Insert mock employer
    await connection.execute(`
        INSERT IGNORE INTO users (username, email, password, role, is_verified, first_name, last_name, company_name, created_at, updated_at)
        VALUES (
            'mockemployer', 
            'mockemployer@example.com', 
            '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjQ', 
            'employer', 
            1, 
            'John', 
            'Doe', 
            'MockTech Inc', 
            NOW(), 
            NOW()
        )
    `);

    // Get employer ID
    const [rows] = await connection.execute("SELECT id FROM users WHERE email = 'mockemployer@example.com' LIMIT 1");
    const employerId = rows[0].id;

    console.log("Mock employer ID processing: ", employerId);

    // Insert jobs
    const jobs = [
        ['Software Engineer', 'Develop and maintain backend systems.', 'MockTech Inc', 'Bangalore', '["Java", "Spring Boot", "MySQL"]', 600000, 1200000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['Frontend Developer', 'Create responsive web interfaces.', 'TechSolutions', 'Hyderabad', '["React", "TypeScript", "Tailwind"]', 500000, 900000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['Data Analyst', 'Analyze business data and create dashboards.', 'DataCorp', 'Pune', '["Python", "SQL", "Tableau"]', 400000, 800000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['DevOps Engineer', 'Manage CI/CD pipelines and cloud infrastructure.', 'CloudSys', 'Chennai', '["AWS", "Docker", "Kubernetes", "Jenkins"]', 800000, 1500000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['Product Manager', 'Lead the product lifecycle from ideation to launch.', 'InnovateX', 'Mumbai', '["Agile", "Scrum", "Jira"]', 1000000, 1800000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['UI/UX Designer', 'Design user-friendly application flows.', 'DesignStudio', 'Remote', '["Figma", "Adobe XD", "Wireframing"]', 450000, 850000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['Machine Learning Intern', 'Assist in building predictive models.', 'AI Labs', 'Bangalore', '["Python", "TensorFlow", "Scikit-learn"]', 200000, 300000, 'INR', 'INTERNSHIP', employerId, 'active'],
        ['Backend Developer', 'Build robust server-side APIs.', 'MockTech Inc', 'Noida', '["Node.js", "Express", "MongoDB"]', 600000, 1100000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['QA Engineer', 'Write and execute automated test scripts.', 'QualityFirst', 'Pune', '["Selenium", "Java", "TestNG"]', 400000, 700000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['Marketing Specialist', 'Execute digital marketing campaigns.', 'GrowthAgency', 'Delhi', '["SEO", "Google Ads", "Content Marketing"]', 350000, 600000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['Cybersecurity Analyst', 'Monitor network security and mitigate risks.', 'SecureNet', 'Hyderabad', '["Network Security", "Ethical Hacking", "SIEM"]', 700000, 1400000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['Full Stack Developer', 'End-to-end web application development.', 'WebMakers', 'Bangalore', '["MERN Stack", "GraphQL", "Docker"]', 800000, 1500000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['Mobile App Developer', 'Develop iOS and Android applications.', 'AppWorks', 'Chennai', '["Flutter", "Dart", "Firebase"]', 600000, 1200000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['System Administrator', 'Maintain IT infrastructure and servers.', 'IT Corp', 'Mumbai', '["Linux", "Windows Server", "Networking"]', 300000, 600000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['Salesforce Developer', 'Customize and implement Salesforce CRM.', 'CRM Solutions', 'Remote', '["Apex", "Visualforce", "LWC"]', 700000, 1300000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['Cloud Architect', 'Design cloud-native solutions.', 'CloudSys', 'Bangalore', '["AWS", "Azure", "GCP", "Architecture"]', 1500000, 2500000, 'INR', 'FULL_TIME', employerId, 'active'],
        ['Technical Writer', 'Create user manuals and API documentation.', 'DocuTech', 'Pune', '["Markdown", "API Documentation", "English"]', 400000, 750000, 'INR', 'CONTRACT', employerId, 'active'],
        ['Human Resources Manager', 'Manage recruitment and employee relations.', 'PeopleFirst', 'Hyderabad', '["Recruitment", "Employee Relations", "HR Policies"]', 500000, 900000, 'INR', 'FULL_TIME', employerId, 'active']
    ];

    for (const job of jobs) {
        await connection.execute(`
            INSERT INTO jobs (title, description, company, location, requirements, salary_min, salary_max, salary_currency, type, posted_by, status, created_at, updated_at, deadline)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY))
        `, job);
    }

    console.log("Successfully seeded 18 mock jobs!");
    process.exit(0);
}

seed().catch(console.error);
