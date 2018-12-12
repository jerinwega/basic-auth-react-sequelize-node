import React from 'react';
import { Link } from "react-router-dom";
import { emailValidator } from './helpers/emailValidator.js'

export class ForgotComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
      changes:'',
      message:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 

  handleChange(e) {
     const {errors = {}} =this.state;
     errors[e.target.name] = "";
     this.setState({changes : ""});
     this.setState({message : ""});
     this.setState({ [e.target.name]: e.target.value,
     errors 
    });
  }

  handleSubmit(e) {

    e.preventDefault();
    
    let { email , errors = {} } = this.state;
    const emailStatus = emailValidator(email);
    

    if(emailStatus.valid)
    {
      axios.post('/api/forgot', { 
        params:
          {
            email
          }
      })
      .then(response=> {

        if (response.data.message && response.data.status === true) {

         
          this.setState({ email: "", message: response.data.message, changes :"w3-panel w3-green w3-round-xlarge visibleL" })
       }
       else if (response.data.message && response.data.status === false) {
         this.setState({  message: response.data.message, changes:"w3-panel w3-red w3-round-xlarge visibleL" }) 
       }
         
         
         })
      .catch(e=>console.log(e));

    }
else {
  errors.email = emailStatus.errors.email; 
  this.setState({ errors });
}
  }


  render() {
    const {  email, errors = {} } = this.state;

    let { changes, message } = this.state;
  

    return (<div>
      <div class="w3-container w3-content w3-display-middle ">
        <div class="sw3-panel w3-card w3-display-container w3-display-middle w3-round-xlarge size2">

          <h1 class=" w3-center sty"><img className="al" src="https://png.pngtree.com/svg/20161128/forgot_password_370338.png" width="47px;" height="47px;"></img>  Forgot Password</h1>




          <form name="form" onSubmit={this.handleSubmit}>
            <div>
              
              <input type="text" className=" w3-input w3-round-large align2" name="email" value={email} onChange={this.handleChange} placeholder="Please enter your Email ID" />
              <small className="err2" style ={{color:'red',fontWeight:'bold'}}>{errors.email}</small> 
            </div>


            <div>
              <button className=" w3-btn w3-round-xxlarge btn_move3">Send</button>
              <Link to="/login" className="w3-btn w3-round-xxlarge link_move3">Cancel</Link>

            </div>
            <div className= {changes} >
                  <p className="w3-center format">{message}</p>
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