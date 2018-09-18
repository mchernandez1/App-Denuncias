import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import ToggleDisplay from "react-toggle-display";
import Home from "./Home.js";
import SignUp from "./SignUp.js";
import Login from "./Login.js";
import Denuncias from "./Denuncias.js";

class NavBar extends Component {

     constructor(props) {
      super(props);
      this.state = {
        show: true,
        login:this.props.login
      };
    }
    componentDidMount(){
      if (this.props.display === "true") {
        this.setState = ({show: true});
      }
      else if (this.props.display === "false") {
        this.setState = ({show: false});
      }
    }

    render() {
      console.log(this.state.show)
      return (
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container-fluid">                
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink exact className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink exact className="nav-link" to="/Denuncias">Denuncias</NavLink>
                    </li>                    
                    <li className="nav-item">
                      <NavLink exact className="nav-link" to="/">¡Contáctenos!</NavLink>
                    </li>  
                    <ToggleDisplay show={!this.state.show}>
                      <li className="nav-item">
                         <NavLink exact className="nav-link" to="/">Mi cuenta</NavLink>
                      </li>
                    </ToggleDisplay>               

                  </ul>                  
                </div>
                   <div className="navbar-collapse collapse w-100 order-3">
                    <ul className="navbar-nav ml-auto list-inline">
                      <ToggleDisplay show={this.state.show}>
                        <li className="nav-item list-inline-item">
                           <NavLink exact className="nav-link" to="/Login">
                           <i className="fas fa-user-circle"></i> <br/>
                                Login 
                            </NavLink>
                        </li>
                      </ToggleDisplay>
                      <ToggleDisplay show={this.state.show}>
                        <li className="nav-item list-inline-item">
                           <NavLink exact className="nav-link" to="/SignUp">
                           <i className="fas fa-sign-in-alt"></i> <br/>
                                Sign Up
                            </NavLink>
                        </li>
                      </ToggleDisplay>  
                      <ToggleDisplay show={!this.state.show}>
                        <li className="nav-item">
                          <NavLink exact className="nav-link" to="/"> Logout</NavLink>
                        </li>
                      </ToggleDisplay>
                      <li className="nav-item list-inline-item">
                        <NavLink exact className="nav-link" to="/">
                        <i className="fas fa-exclamation-circle"></i> <br/> Denuncie! 
                        </NavLink>
                      </li>                   
                    </ul>            
                </div>
              </div>
            </nav>
            <br/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/SignUp" component={SignUp}/>  
            <Route path="/Login" render={() => this.state.login}/> 
            <Route exact path="/Denuncias" component={Denuncias}/>        
          </div>
        </Router>

      );        
    }
}

export default NavBar;