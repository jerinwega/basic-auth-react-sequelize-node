import React from 'react';
import { Link } from "react-router-dom";
import { passwordValidator } from './helpers/passwordValidator';
import { passMatchValidator } from './helpers/passMatchValidator';
export class ResetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passconfirm: '',
      errors: {},
      passMatch: false,
      tokenStatus: true,
      changes: '',
      message:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { errors = {} } = this.state;
    errors[e.target.name]="";
    this.setState({passMatch : false});
    this.setState({changes : ""});
    this.setState({message : ""});
    this.setState({ [e.target.name]: e.target.value });
  
  }


  
componentDidMount() {

  axios.post('/api/resettokencheck', {
        params: {
          resetPasswordToken: this.props.match.params.token,
        },
      })
      .then(response => {
        console.log(response);
        this.setState({ tokenStatus:response.data.status });
        console.log(response.data.status);
        
      }).catch(error => {
        console.log(error);
      });
  }


  handleSubmit(e) {

    e.preventDefault();
    
    let { password, passMatch, passconfirm, errors = {} } = this.state;

 
    const passwordStatus = passwordValidator(password);
    const passMatchStatus = passMatchValidator(password, passconfirm, passMatch);
   if(passwordStatus.valid && passMatchStatus.valid)
   {
       axios.post('/api/resetform', { 
         params:
           {
             password, resetPasswordToken: this.props.match.params.token,
           }
       })
       .then(response=> {
        if (response.data.message && response.data.status === true) {

          const red = this; 
          red.props.history.push('/login');
          this.setState({  password: "", passconfirm: "",  passMatch: passMatchStatus.passMatch, })
       }
       else if (response.data.message && response.data.status === false) {
         this.setState({  password: "", passconfirm: "", message: response.data.message,  passMatch: passMatchStatus.passMatch, changes:"w3-panel w3-red w3-round-xlarge visibleL" }) 
       }
      }) 
       .catch(e=>console.log(e));
       
     } else {
       errors.password = passwordStatus.errors.password;
       errors.passconfirm = passMatchStatus.errors.passconfirm; 
       this.setState({ errors });
     }
   }
   


  render() {
    const { password, passMatch, passconfirm, errors= {}, tokenStatus } = this.state;
    let {changes, message } =this.state; 
  

    if (tokenStatus === true) 
    {
    return (
    <div>
      <div class="w3-container w3-content w3-display-middle ">
        <div class="sw3-panel w3-card w3-display-container w3-display-middle w3-round-xlarge size3">

          <h1 class=" w3-center sty"><img className="al" src="https://cdn1.iconfinder.com/data/icons/finance-22/512/Businessman_Safe_Secure_Protected_User_Lock_Avatar-512.png" width="52px;" height="48px;"></img>  Reset Password</h1>




          <form name="form" onSubmit={this.handleSubmit}>
            <div>
              <input type="password"   className = { passMatch ? 'w3-input w3-round-large passf align3 passvalid' : 'w3-input w3-round-large align3 passv passf' } name="password" value={password} onChange={this.handleChange} placeholder="New Password" />
            </div>
            <small className="csmall">Must be at least 6 characters long</small>

             <div>    
                      <small className="err2" style ={{color:'red', fontWeight:'bold'}}>{errors.password}</small> 
              </div>


            <div>
              <input type="password"   className= { passMatch ? 'w3-input w3-round-large passf align3 passvalid' : 'w3-input w3-round-large align3 passv passf' } name="passconfirm" value={passconfirm} onChange={this.handleChange} placeholder="Confirm Password" />
              <small className="err2" style ={{color:'red',fontWeight:'bold'}}>{errors.passconfirm}</small> 
            </div>


            <div>
              <button className=" w3-btn w3-round-xxlarge btn_move3">Reset</button>
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
    </div>
    );
     }
    else {
      return (
        <div class="w3-panel w3-round-xxlarge w3-red ">
              <h1 className = "w3-center">Token Expired</h1>
          </div>
      )}

  }
}