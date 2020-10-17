export {}

module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors: any = {};
    if (username.trim() === ''){
        errors.username = 'Username must not be empty.';
    }
    if (email.trim() === ''){
        errors.username = 'Email must not be empty.';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    }
}