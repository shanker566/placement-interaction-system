const mysql = require('mysql2/promise');

async function assignJobs() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '2400080042',
        database: 'placement_portal'
    });

    console.log("Connected to placement_portal...");

    // Find the latest employer account
    const [rows] = await connection.execute("SELECT id, email FROM users WHERE role = 'employer' ORDER BY created_at DESC LIMIT 1");
    
    if (rows.length === 0) {
        console.log("No employer account found!");
        process.exit(1);
    }
    
    const latestEmployerId = rows[0].id;
    const latestEmployerEmail = rows[0].email;

    console.log(`Assigning jobs to latest employer: ${latestEmployerEmail} (ID: ${latestEmployerId})`);

    // Assign all jobs to this employer
    await connection.execute("UPDATE jobs SET posted_by = ?", [latestEmployerId]);

    console.log("Successfully re-assigned all jobs to your latest employer account!");
    process.exit(0);
}

assignJobs().catch(console.error);
