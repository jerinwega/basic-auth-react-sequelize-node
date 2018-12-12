import React from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import queryString from 'query-string';
export class WelcomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }
  
    componentDidMount(){
  
      const values = queryString.parse(this.props.location.search);
      console.log(values.name);
      this.setState({name: values.name})

 
    }
  

                
      render() {
   let { name }= this.state;

        return (<div>
          <div class="w3-container w3-content w3-display-middle ">
            <div class="sw3-panel w3-card w3-display-container w3-display-middle w3-round-xlarge wsize">
    
              <h1 class=" w3-center wsty">Welcome { name } ! </h1>
              
              
            </div>
          </div>

          <div className = "overridecss">
          <Link to="/login" className="w3-btn w3-round-xxlarge">Logout</Link>
          </div> 
    
          <footer>
            <div class="w3-container w3-display-bottommiddle">
    
              <p class="w3-text-white copyright">Copyright &copy; Jerin Abraham 2018. Made with <font color="red">♥</font> in India</p>
    
            </div>
          </footer>
        </div>);
      }
    }
    
