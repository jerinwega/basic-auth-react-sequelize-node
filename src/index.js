import React from 'react';
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { LoginComponent } from './LoginComponent';
import { RegisterComponent } from './RegisterComponent';
import { ForgotComponent } from './ForgotComponent';
import { ResetComponent } from './ResetComponent';



export class App extends React.Component {
   render(){
 
 return(
 
   <Switch>
    <Route exact path = "/"  render={() => <Redirect to="/login" />} />
    <Route  path ="/login" component={LoginComponent} />
    <Route  path ="/register" component={RegisterComponent} />
    <Route  path ="/forgot" component={ForgotComponent} />
    <Route  path ="/reset/:token" component={ResetComponent} />
   </Switch>
     );
   }
  }
    

 export default withRouter(App);