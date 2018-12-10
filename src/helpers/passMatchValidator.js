export function passMatchValidator(password, passconfirm, passMatch, errors = {}) {
    let valid = false;
 
    if (!passconfirm) {
        valid = false;
        errors.passconfirm = 'Please fill out this field';
    }
    else if (passconfirm !== password) {
        valid = false;
        passMatch = false;
        errors.passconfirm = 'Password mismatch';
    } else
    {
        valid = true;
        passMatch = true;
    }
    return {errors,valid,passMatch};
}
