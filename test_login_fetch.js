async function testLogin(email, password) {
    try {
        console.log(`Testing login for ${email}...`);
        const res = await fetch('https://placement-interaction-system-new.onrender.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        
        if (res.ok) {
            console.log(`✅ Success! Token: ${data.token.substring(0, 20)}... Role: ${data.role}`);
        } else {
            console.error(`❌ Failed: ${JSON.stringify(data)}`);
        }
    } catch (err) {
        console.error(`❌ Network Error: ${err.message}`);
    }
}

async function runTests() {
    await testLogin('employer@mockcompany.com', 'password');
    await testLogin('2400080100@gmail.com', 'password');
    await testLogin('2400080087@kluniversity.in', 'password');
}

runTests();
