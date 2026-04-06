async function testStudentApps(email, password) {
    try {
        console.log(`Testing login for ${email}...`);
        const res = await fetch('https://placement-interaction-system-new.onrender.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        
        if (res.ok) {
            console.log(`✅ Logged in. Token: ${data.token.substring(0, 10)}... fetching apps...`);
            const appsRes = await fetch('https://placement-interaction-system-new.onrender.com/api/applications/my', {
                headers: { 'Authorization': `Bearer ${data.token}` }
            });
            const appsText = await appsRes.text();
            console.log(`Apps response status: ${appsRes.status}`);
            console.log(`Apps response: ${appsText}`);
        } else {
            console.error(`❌ Failed: ${JSON.stringify(data)}`);
        }
    } catch (err) {
        console.error(`❌ Error: ${err.message}`);
    }
}

testStudentApps('2400080100@gmail.com', 'password');
