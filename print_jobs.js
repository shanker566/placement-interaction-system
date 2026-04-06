const mysql = require('mysql2/promise');

async function check() {
    const c = await mysql.createConnection({
        host:'localhost', user:'root', password:'2400080042', database:'placement_portal'
    });
    
    console.log("Connected...");
    
    const [users] = await c.query("SELECT id, username, email, company_name, created_at FROM users WHERE role = 'employer'");
    
    for (const u of users) {
        const [jobs] = await c.query("SELECT COUNT(*) as count FROM jobs WHERE posted_by = ?", [u.id]);
        console.log(`User: ${u.username} (${u.email}) | Company: ${u.company_name} | CreatedAt: ${u.created_at} | Jobs: ${jobs[0].count}`);
    }
    
    process.exit(0);
}

check().catch(e => { console.error(e); process.exit(1); });
