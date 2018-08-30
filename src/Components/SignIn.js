import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import '../App.css';
class SignIn extends Component {
    ref = firebase.database().ref();
    constructor(){
        super();
        this.state={
            email:"",
            pass:""
        }
    }
    email(ev){
        this.setState({email: ev.target.value});
    }
    pass(ev){
        this.setState({pass: ev.target.value})
    }
    signIn(){
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass)
        .then(ev=>{
            alert("Successfully Sign In");
            {this.props.history.push("/Home")}
        })
        .catch(ev=> alert(ev.message));
    }
    render() {

        return(
            <div className="form">
            <form className="main">
            <img src={require("../images/logo1.png")} className="logo"/>
            <p className="head">Sign In</p>
            <p> Email:<br />
                <input type="email" className="field1" onChange={this.email.bind(this)}/>
                </p>
                <br />
                <p> Password:<br />
                <input type="password" className="field2" onChange={this.pass.bind(this)}/>
                </p>
                <RaisedButton label="Sign In" primary={true} onClick={()=> this.signIn()}/>
                <br />
                <br />
                <Link to="/SignUp" > <a href="#">Create New One</a></Link>
                </form>
            </div>
        )
    }
}
export default SignIn;