import React, {Component} from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import request from "superagent";
import { Redirect } from "react-router-dom";
import {Route} from "react-router-dom";
import Home from "./Home.js";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nombre: "",
            password: "",
            correo: "",            
            onSubmit: this.props.onSubmit,
            redirectToHome: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.correo.length > 0 && this.state.password.length > 0 && this.state.nombre.length > 0;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(e){
      e.preventDefault();
      const body = JSON.stringify({
        nombre: this.state.nombre,
        correo: this.state.correo,
        password: this.state.password        
      });
      console.log(body);
      request
        .post("/users/")
        .set("Content-Type", "application/json")
        .send(body)
        .end((err, res)=>{
          console.log(res);
          this.setState({redirectToHome: true});
        });
    }

    render() {
        if (this.state.redirectToHome) {
          return (
            <Redirect to={"/"}/>
          );
        }
        return (
            <div className="container-fluid banner">
                <div className="row justify-content-around banner-content center-items">
                    <form onSubmit={this.handleSubmit} className="col-6 center-items">
                        <FormGroup controlId="nombre" bsSize="large">
                            <ControlLabel className="auth-text">Name</ControlLabel>
                            <FormControl
                                autoFocus
                                type="nombre"
                                value={this.state.nombre}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="correo" bsSize="large">
                            <ControlLabel className="auth-text">Correo</ControlLabel>
                            <FormControl
                                autoFocus
                                type="correo"
                                value={this.state.correo}
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
                            Sign Up
                        </Button>
                    </form>
                </div>
                <Route exact path="/" component={Home}/>
            </div>
        );
    }
}

/*En una proxima versión podrían agregar una base de datos para tener la posibilidad de guardar a nuevos contactos, además de los que ya tienen alojados en el archivo .json */
