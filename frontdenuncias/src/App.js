import React, {Component} from "react";
import NavBar from "./Navbar.js";
import Copyright from "./Copyright";
import Login from "./Login";
import request from "superagent";


class App extends Component {


 constructor(props) {
  super(props);
  
  this.state = {
    noLogin: true,
    userName: null,
    userMail: null,
  };
  this.onSubmitLogin = this.onSubmitLogin.bind(this);
  this.onLogout = this.onLogout.bind(this);
}

onSubmitLogin(correo, password) {
/*  const body = JSON.stringify({
    correo: correo,
    password: password        
  });
  console.log(body);
  request
  .post("/login/")
  .set("Content-Type", "application/json")
  .send(body)
  .end((err, res)=>{
    console.log(res);    
    this.setState({redirectToHome: true});      
  });*/
  console.log("login Exitoso")
  this.setState({noLogin: false}, function(){
    console.log(this.state.noLogin);
    this.forceUpdate();
  });  
}

onLogout()
{

}

render() { 
  
  var login = <Login onSubmit={this.onSubmitLogin}/>;  
  
  return (<div>
    <div className="container-fluid">
      <NavBar display={this.state.noLogin} login = {login} />;    
    </div>
 /*Acá se está cerrando el tag pero no veo donde lo abren*/
    <Copyright/>
    </div>);
}
}

export default App;
          
/*Les recomiendo eliminar el código que está documento si no lo necesitan. Además se podría organizar el código según sus funciones para que sea más fácil a la vista ver donde se declara y se acaba una parte*/          
