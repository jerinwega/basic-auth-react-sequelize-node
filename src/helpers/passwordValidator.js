 
 export function passwordValidator(password, errors = {})
 {
 //Password validation 
 let valid = false;
 if (!password) {
    valid = false;
    errors.password = 'Please fill out this field';
  }
  else if(password.length < 6){
    valid = false;
    errors.password = 'Please match the requested format';
  } else {
    valid = true;
  }
  return {valid, errors};
}