
export function emailValidator(email, errors = {}) {
    // Email validation
    let valid = false;
    if (!email) {
        valid = false;
        errors.email = 'Please fill out this field';
    } else if (typeof email !== 'undefined') {
        const lastAtPos = email.lastIndexOf('@');
        const lastDotPos = email.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
            valid = false;
            errors.email = "Email is not valid, include '@' and '.'";
        } else {
            valid = true;
        }
    } else {
        valid = true;
    }
    return {valid, errors};
}
