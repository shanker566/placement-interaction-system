const mysql = require('mysql2/promise');

async function fixPasswords() {
    const connection = await mysql.createConnection({
        host: 'yamabiko.proxy.rlwy.net',
        port: 35611,
        user: 'root',
        password: 'KHCbkrlHfTJNKnVNJwPCdZXOXuLPqvyd',
        database: 'railway'
    });

    console.log('Connected.');
    
    // Get the exact BCrypt hash that corresponds to the word `password` from the user I created earlier
    const [rows] = await connection.execute('SELECT password FROM users WHERE email = "2400080087@kluniversity.in" LIMIT 1');
    const validHash = rows[0].password;
    console.log('Found valid hash for "password". Setting all passwords to "password"...');
    
    // Update all users to have the exact same 'password' and make sure they are verified
    await connection.execute('UPDATE users SET password = ?, is_verified = true', [validHash]);
    
    console.log('All passwords successfully reset to: "password". All users marked as verified.');
    await connection.end();
}

fixPasswords().catch(console.error);
