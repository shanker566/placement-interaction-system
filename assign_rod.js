const mysql = require('mysql2/promise');

async function assignJobs() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '2400080042',
        database: 'placement_portal'
    });

    console.log("Connected to placement_portal...");

    // Get rod's ID
    const [rows] = await connection.execute("SELECT id FROM users WHERE email = 'rod@gmail.com' LIMIT 1");
    if (rows.length === 0) { console.log("rod missed"); process.exit(1); }
    const rodId = rows[0].id;

    // Assign all jobs to rod
    await connection.execute("UPDATE jobs SET posted_by = ?", [rodId]);
    console.log("Jobs assigned to rod!");

    process.exit(0);
}

assignJobs().catch(console.error);
