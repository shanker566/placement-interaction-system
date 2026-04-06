# ============================================================
# Seed Mock Jobs via Render API
# ============================================================

$BASE = "https://placement-interaction-system-new.onrender.com/api"

# Step 1 – Register an employer (ignore error if already exists)
Write-Host "`n[1] Registering employer account..." -ForegroundColor Cyan
try {
    $regBody = '{"username":"MockEmployer","email":"employer@mockcompany.com","password":"employer123","role":"employer"}'
    Invoke-RestMethod -Uri "$BASE/auth/register" -Method POST -ContentType "application/json" -Body $regBody -ErrorAction SilentlyContinue | Out-Null
    Write-Host "    Registered (or already exists)" -ForegroundColor Gray
} catch {}

# Step 2 – Login as employer to get token
Write-Host "[2] Logging in as employer..." -ForegroundColor Cyan
$loginBody = '{"email":"employer@mockcompany.com","password":"employer123"}'
try {
    $loginRes = Invoke-RestMethod -Uri "$BASE/auth/login" -Method POST -ContentType "application/json" -Body $loginBody
    $TOKEN = $loginRes.token
    if (-not $TOKEN) {
        Write-Host "    ERROR: No token returned. The employer account may not be verified yet." -ForegroundColor Red
        Write-Host "    Run this script again after verifying the OTP sent to employer@mockcompany.com (check Mailtrap)" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "    Login OK. Token: $($TOKEN.Substring(0,20))..." -ForegroundColor Green
} catch {
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    Write-Host "    Login failed: $($reader.ReadToEnd())" -ForegroundColor Red
    exit 1
}

$HEADERS = @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" }

# Step 3 – Post mock jobs
$jobs = @(
    @{
        title       = "Software Engineer"
        company     = "Tech Solutions Pvt. Ltd."
        location    = "Hyderabad, Telangana"
        type        = "Full-Time"
        salary      = "6 - 10 LPA"
        description = "We are looking for a passionate Software Engineer to join our team. You will design, develop and maintain scalable web applications using modern tech stacks."
        requirements= "B.Tech/B.E in CS/IT, Strong in DSA, Experience with Java or Python, Knowledge of REST APIs"
        skills      = @("Java", "Spring Boot", "MySQL", "REST APIs", "Git")
        experience  = "0-2 years"
        openings    = 5
    },
    @{
        title       = "Frontend Developer"
        company     = "Webify Digital"
        location    = "Bangalore, Karnataka"
        type        = "Full-Time"
        salary      = "5 - 8 LPA"
        description = "Join our growing frontend team and build beautiful, performant user interfaces using React and modern CSS frameworks."
        requirements= "Strong proficiency in React.js, HTML5, CSS3, JavaScript ES6+. Familiarity with Tailwind CSS."
        skills      = @("React", "JavaScript", "Tailwind CSS", "HTML", "CSS")
        experience  = "0-1 years"
        openings    = 3
    },
    @{
        title       = "Data Analyst"
        company     = "Analytics Hub"
        location    = "Pune, Maharashtra"
        type        = "Full-Time"
        salary      = "4 - 7 LPA"
        description = "Analyze large datasets to extract meaningful insights. Work with business teams to drive data-driven decisions."
        requirements= "Proficiency in Python, SQL, Excel. Knowledge of Tableau or Power BI. Good analytical and communication skills."
        skills      = @("Python", "SQL", "Tableau", "Excel", "Statistics")
        experience  = "0-2 years"
        openings    = 4
    },
    @{
        title       = "DevOps Engineer"
        company     = "CloudBase Systems"
        location    = "Remote"
        type        = "Full-Time"
        salary      = "8 - 14 LPA"
        description = "Design and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability and scalability."
        requirements= "Experience with AWS/GCP/Azure, Docker, Kubernetes, Jenkins or GitHub Actions. Linux proficiency."
        skills      = @("AWS", "Docker", "Kubernetes", "CI/CD", "Linux")
        experience  = "1-3 years"
        openings    = 2
    },
    @{
        title       = "Machine Learning Engineer"
        company     = "AI Ventures"
        location    = "Chennai, Tamil Nadu"
        type        = "Full-Time"
        salary      = "10 - 18 LPA"
        description = "Build and deploy ML models into production. Work with research teams to translate models into scalable services."
        requirements= "Strong Python skills, experience with TensorFlow or PyTorch, knowledge of NLP or Computer Vision."
        skills      = @("Python", "TensorFlow", "PyTorch", "NLP", "Machine Learning")
        experience  = "1-3 years"
        openings    = 2
    },
    @{
        title       = "Android Developer"
        company     = "AppWorks Mobile"
        location    = "Delhi NCR"
        type        = "Full-Time"
        salary      = "5 - 9 LPA"
        description = "Develop and maintain native Android applications. Collaborate with designers and backend teams to deliver a smooth user experience."
        requirements= "Proficient in Kotlin/Java for Android, understanding of MVVM architecture, REST API integration."
        skills      = @("Kotlin", "Android", "Java", "MVVM", "REST APIs")
        experience  = "0-2 years"
        openings    = 3
    },
    @{
        title       = "Business Analyst"
        company     = "ConsultPro"
        location    = "Mumbai, Maharashtra"
        type        = "Full-Time"
        salary      = "6 - 10 LPA"
        description = "Bridge the gap between business requirements and technical solutions. Document process flows and coordinate with development teams."
        requirements= "Strong communication skills, knowledge of Agile/Scrum, experience with requirement gathering and JIRA."
        skills      = @("Business Analysis", "Agile", "JIRA", "Documentation", "SQL")
        experience  = "0-2 years"
        openings    = 4
    },
    @{
        title       = "Cybersecurity Analyst"
        company     = "SecureNet India"
        location    = "Hyderabad, Telangana"
        type        = "Full-Time"
        salary      = "7 - 12 LPA"
        description = "Monitor, detect and respond to security threats. Perform vulnerability assessments and implement security best practices."
        requirements= "Knowledge of SIEM tools, network security, firewalls, OWASP top 10. Certifications like CEH/CISSP preferred."
        skills      = @("Network Security", "SIEM", "Ethical Hacking", "Firewalls", "Linux")
        experience  = "1-3 years"
        openings    = 2
    }
)

Write-Host "[3] Posting $($jobs.Count) mock jobs..." -ForegroundColor Cyan

$success = 0
$failed  = 0

foreach ($job in $jobs) {
    try {
        $body = $job | ConvertTo-Json -Depth 5
        $res  = Invoke-RestMethod -Uri "$BASE/jobs" -Method POST -Headers $HEADERS -Body $body -ContentType "application/json"
        Write-Host "    ✓ Posted: '$($job.title)' at '$($job.company)'" -ForegroundColor Green
        $success++
    } catch {
        try {
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $err = $reader.ReadToEnd()
        } catch {
            $err = $_.Exception.Message
        }
        Write-Host "    ✗ Failed: '$($job.title)' — $err" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "  Seed complete: $success succeeded, $failed failed" -ForegroundColor White
Write-Host "============================================`n" -ForegroundColor Cyan
