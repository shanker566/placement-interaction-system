const mysql = require('mysql2/promise');

async function listUsers() {
    const connection = await mysql.createConnection({
        host: 'yamabiko.proxy.rlwy.net',
        port: 35611,
        user: 'root',
        password: 'KHCbkrlHfTJNKnVNJwPCdZXOXuLPqvyd',
        database: 'railway'
    });

    const [users] = await connection.execute('SELECT id, username, email, role, is_verified FROM users');
    console.log("Current Users in DB:");
    console.table(users);
    
    await connection.end();
}

listUsers().catch(console.error);
