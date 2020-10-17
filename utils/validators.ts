export {}

module.exports.validateRegisterInput = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
    ) => {
        const errors: any = {};
        validateUsername(username, errors);
        validateEmail(email, errors);
        validatePassword(password, confirmPassword, errors);
        return {
            errors,
            valid: Object.keys(errors).length < 1
        };
    };

const validateEmail = (email: string, errors: any) => {
    if (isEmptyRemoveWhiteSpace(email)){
        errors.email = 'Email must not be empty.';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)){
            errors.email = 'Email address is invalid.';
        }
    }
};

const validateUsername = (username: string, errors: any) => {
    if (isEmptyRemoveWhiteSpace(username)){
        errors.username = 'Username must not be empty.';
    }
};

const validatePassword = (password: string, confirmPassword: string, errors: any) => {
    if (isEmptyAllowWhiteSpace(password)){
        errors.password = 'Password must not be empty.';
    } else if (password !== confirmPassword){
        errors.password = 'Passwords must match.';
    }
};

const isEmptyRemoveWhiteSpace = (str: string) => str.trim() === '';
const isEmptyAllowWhiteSpace = (str: string) => str === '';