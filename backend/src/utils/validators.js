const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    // Min 8 chars, at least one letter and one number
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // For simplicity in this demo, just check length > 5
    return password.length >= 6;
};

const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
};

module.exports = {
    validateEmail,
    validatePassword,
    validatePhone
};
