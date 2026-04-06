const axios = require('axios');

async function testLogin(email, password) {
    try {
        console.log(`Testing login for ${email}...`);
        const res = await axios.post('https://placement-interaction-system-new.onrender.com/api/auth/login', {
            email,
            password
        });
        console.log(`✅ Success! Token: ${res.data.token.substring(0, 20)}... Role: ${res.data.role}`);
    } catch (err) {
        console.error(`❌ Failed: ${err.response ? JSON.stringify(err.response.data) : err.message}`);
    }
}

async function runTests() {
    await testLogin('employer@mockcompany.com', 'password');
    await testLogin('2400080100@gmail.com', 'password');
    await testLogin('2400080087@kluniversity.in', 'password');
}

runTests();
