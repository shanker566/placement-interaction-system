USE placement_portal;

-- Step 1: Insert an Employer user (Ignore if exists based on email)
-- Password hash is for 'password'
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
);

-- Step 2: Get the user ID of the mock employer
SET @employer_id = (SELECT id FROM users WHERE email = 'mockemployer@example.com' LIMIT 1);

-- Step 3: Insert 15 - 20 mock jobs linked to this employer
INSERT INTO jobs (title, description, company, location, requirements, salary_min, salary_max, salary_currency, type, posted_by, status, created_at, updated_at, deadline)
VALUES 
('Software Engineer', 'Develop and maintain backend systems.', 'MockTech Inc', 'Bangalore', '["Java", "Spring Boot", "MySQL"]', 600000, 1200000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Frontend Developer', 'Create responsive web interfaces.', 'TechSolutions', 'Hyderabad', '["React", "TypeScript", "Tailwind"]', 500000, 900000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Data Analyst', 'Analyze business data and create dashboards.', 'DataCorp', 'Pune', '["Python", "SQL", "Tableau"]', 400000, 800000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('DevOps Engineer', 'Manage CI/CD pipelines and cloud infrastructure.', 'CloudSys', 'Chennai', '["AWS", "Docker", "Kubernetes", "Jenkins"]', 800000, 1500000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Product Manager', 'Lead the product lifecycle from ideation to launch.', 'InnovateX', 'Mumbai', '["Agile", "Scrum", "Jira"]', 1000000, 1800000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('UI/UX Designer', 'Design user-friendly application flows.', 'DesignStudio', 'Remote', '["Figma", "Adobe XD", "Wireframing"]', 450000, 850000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Machine Learning Intern', 'Assist in building predictive models.', 'AI Labs', 'Bangalore', '["Python", "TensorFlow", "Scikit-learn"]', 200000, 300000, 'INR', 'INTERNSHIP', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY)),
('Backend Developer', 'Build robust server-side APIs.', 'MockTech Inc', 'Noida', '["Node.js", "Express", "MongoDB"]', 600000, 1100000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('QA Engineer', 'Write and execute automated test scripts.', 'QualityFirst', 'Pune', '["Selenium", "Java", "TestNG"]', 400000, 700000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Marketing Specialist', 'Execute digital marketing campaigns.', 'GrowthAgency', 'Delhi', '["SEO", "Google Ads", "Content Marketing"]', 350000, 600000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Cybersecurity Analyst', 'Monitor network security and mitigate risks.', 'SecureNet', 'Hyderabad', '["Network Security", "Ethical Hacking", "SIEM"]', 700000, 1400000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Full Stack Developer', 'End-to-end web application development.', 'WebMakers', 'Bangalore', '["MERN Stack", "GraphQL", "Docker"]', 800000, 1500000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Mobile App Developer', 'Develop iOS and Android applications.', 'AppWorks', 'Chennai', '["Flutter", "Dart", "Firebase"]', 600000, 1200000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('System Administrator', 'Maintain IT infrastructure and servers.', 'IT Corp', 'Mumbai', '["Linux", "Windows Server", "Networking"]', 300000, 600000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Salesforce Developer', 'Customize and implement Salesforce CRM.', 'CRM Solutions', 'Remote', '["Apex", "Visualforce", "LWC"]', 700000, 1300000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Cloud Architect', 'Design cloud-native solutions.', 'CloudSys', 'Bangalore', '["AWS", "Azure", "GCP", "Architecture"]', 1500000, 2500000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Technical Writer', 'Create user manuals and API documentation.', 'DocuTech', 'Pune', '["Markdown", "API Documentation", "English"]', 400000, 750000, 'INR', 'CONTRACT', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Human Resources Manager', 'Manage recruitment and employee relations.', 'PeopleFirst', 'Hyderabad', '["Recruitment", "Employee Relations", "HR Policies"]', 500000, 900000, 'INR', 'FULL_TIME', @employer_id, 'active', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY))
;
