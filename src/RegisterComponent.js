import React from 'react';
import { Link } from "react-router-dom";
import { emailValidator } from './helpers/emailValidator';
import { passwordValidator } from './helpers/passwordValidator';
import { passMatchValidator } from './helpers/passMatchValidator';
import { withRouter } from "react-router-dom";

export class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email: '',
      password: '',
      passconfirm: '',
      errors: {},
      passMatch: false,
      exists: '',
      status: false
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    const { errors = {} } = this.state;
    errors[e.target.name]="";
    this.setState({exists: ''});
    this.setState({status: false});
    this.setState({passMatch : false});
    this.setState({ [e.target.name]: e.target.value });
  
  }

  handleSubmit(e) {  

    e.preventDefault();
    
    let { name, email, passMatch, password, passconfirm, errors = {} } = this.state;

    if(!name){
      errors.name = "Please fill out this field";
   }
   const emailStatus = emailValidator(email);
   const passwordStatus = passwordValidator(password);
   const passMatchStatus = passMatchValidator(password, passconfirm, passMatch);
  if(name && emailStatus.valid && passwordStatus.valid && passMatchStatus.valid)
  {
      axios.post('/api/db/register', { 
        params:
          {
            name, 
            email,
            password,
          }
      })
      .then(response=> {console.log(response); this.setState({ exists: response.data.message, status: response.data.status, passMatch: passMatchStatus.passMatch})})
      .catch(e=>console.log(e));
      
    } else {
      errors.email = emailStatus.errors.email; 
      errors.password = passwordStatus.errors.password;
      errors.passconfirm = passMatchStatus.errors.passconfirm; 
      this.setState({ errors });
    }
  }
    

  render() {
    const {status, exists, name, email, password, passMatch, passconfirm, errors= {} } = this.state;
    let changes = '';
    if (exists && status === true) {

       changes = "w3-panel w3-green w3-round-xlarge visible";
    }
    else if (exists && status == false) {
      changes = "w3-panel w3-red w3-round-xlarge visible";
    }
   
    return (
       <div>
            <div class = "w3-container w3-content w3-display-middle ">
                <div class="sw3-panel w3-card w3-display-container w3-display-middle w3-round-xlarge sizeR">
                    <h1 class=" w3-center sty"><img className="al" src="https://i2.wp.com/littlescholarpreschool.com/wp-content/uploads/2017/07/register.png?fit=256%2C256" width="45px;" height="45px;"></img>  REGISTER</h1>

            <form name="form" onSubmit={this.handleSubmit}>

              <div>
                      <input type="text" className="w3-input w3-round-large align" name="name" value={name} onChange={this.handleChange} placeholder="Name" />
                      <small className="err" style ={{color:'red',fontWeight:'bold'}}>{errors.name}</small> 
              </div>

               <div>
                      <input type="text" className="w3-input w3-round-large align" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
                      <small className="err" style ={{color:'red',fontWeight:'bold'}}>{errors.email}</small> 
              </div>

              <div>
                      <input type="password"   className= { passMatch ? 'w3-input w3-round-large passf align passvalid' : 'w3-input w3-round-large align passv passf' }  name="password" value={password} onChange={this.handleChange} placeholder="Password" />
              </div>
                      <small>Must be at least 6 characters long</small>
              <div>    
                      <small className="err" style ={{color:'red', fontWeight:'bold'}}>{errors.password}</small> 
              </div>

              <div>
                      <input type="password"  className= { passMatch ? 'w3-input w3-round-large passf align passvalid' : 'w3-input w3-round-large align passv passf' } name="passconfirm" value={passconfirm} onChange={this.handleChange} placeholder="Confirm Password" />
                      <small className="err" style ={{color:'red',fontWeight:'bold'}}>{errors.passconfirm}</small> 
              </div>

               <div>
                      <button className="w3-btn w3-round-xxlarge btn_move2">Register</button>
                      <Link to="/login" className="w3-btn w3-round-xxlarge link_move2">Back</Link>

              </div>
              

              <div className= {changes} >
                  <p className="w3-center format">{exists}</p>
              </div>


            </form>
          </div>
       </div>

        <footer>
            <div class="w3-container w3-display-bottommiddle">

             <p class="w3-text-white copyright">Copyright &copy; Jerin Abraham 2018. Made with <font color="red">♥</font> in India</p>

           </div>
        </footer>
    </div>
      );
    }
}

export default withRouter(RegisterComponent)