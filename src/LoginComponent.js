import React from 'react';
import { Link } from "react-router-dom";
import { emailValidator } from './helpers/emailValidator.js'
import { passwordValidator } from './helpers/passwordValidator.js';
import Axios from 'axios';
export class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors:{},
      exists:'',
      status:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {

    var { errors={}} = this.state;
    errors[e.target.name]="";
    this.setState({exists: ''});
    this.setState({status: false});
    this.setState({ [e.target.name]: e.target.value,
    errors 
    });
  }
  

  handleSubmit(e) {

    e.preventDefault();
    
    let { email, password, errors = {} } = this.state;
  
    const emailStatus = emailValidator(email);
    const passwordStatus = passwordValidator(password);


    if( emailStatus.valid  && passwordStatus.valid) {

    axios.post('/api/login', { 
      params:
        {
          email,
          password,
        }
    })
    .then(response=> this.setState({ exists: response.data.message, status: response.data.status}))
    .catch(e=>console.log(e));
  } else {
    errors.email = emailStatus.errors.email; 
    errors.password = passwordStatus.errors.password;
    this.setState({ errors });
  }
  
  }

    
    
            
  render() {
    const {exists, status, email, password, errors = {} } = this.state;

    let changes = '';
    if (exists && status === true) {

       changes = "w3-panel w3-green w3-round-xlarge visibleL";
    }
    else if (exists && status == false) {
      changes = "w3-panel w3-red w3-round-xlarge visibleL";
    }

    return (<div>
      <div class="w3-container w3-content w3-display-middle ">
        <div class="sw3-panel w3-card w3-display-container w3-display-middle w3-round-xlarge size">

          <h1 class=" w3-center sty"><img className="al" src="http://www.puc.nh.gov/cepsportal/App_Themes/Content/themes/base/images/user-512.png" width="40px;" height="40px;"></img>  LOGIN</h1>



          <form name="form" onSubmit={this.handleSubmit}>
            <div>
             
              <input type="text"  className="w3-input w3-border w3-round-large align" name="email" value={email} onChange={this.handleChange} placeholder="Email" />  
              <small className="err" style ={{color:'red',fontWeight:'bold'}}>{errors.email}</small>  
            </div>

            <div >
             
              <input type="password"  className="w3-input w3-border w3-round-large align passf" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
            </div>

            <small>Must be at least 6 characters long</small>

            <div><small className="err" style ={{color:'red', fontWeight:'bold'}}>{errors.password}</small> </div>

            <div>
              <button className="w3-btn w3-round-xxlarge btn_move">Login</button>
              <Link to="/register" className="w3-btn w3-round-xxlarge link_move">Register</Link>

            </div>
            <div className="l_move">
              <Link to="/forgot" className="w3-round-xxlarge lin"> Forgot Password ?</Link>
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
    </div>);
  }
}
