import React, {Component} from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import {Route} from "react-router-dom";
import Home from "./Home.js";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            onSubmit: this.props.onSubmit,
            redirectToHome: false
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.state.onSubmit(this.state.correo,this.state.password);
        this.setState({redirectToHome:true});
    }

    render() {
        if(this.state.redirectToHome) {
              return (
                <Redirect to={"/"}/>
              );
            }
        return (            
            <div className="container-fluid banner">
                <div className="row justify-content-around banner-content center-items">
                    <form onSubmit={this.handleSubmit} className="col-6 center-items">
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel className="auth-text">Email</ControlLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel className="auth-text">Password</ControlLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <Button
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
                </div>               
                <Route exact path="/" component={Home}/>
            </div>
        );
    }
}