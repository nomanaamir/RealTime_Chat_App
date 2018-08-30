import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import '../App.css';
class SignUp extends Component {
    ref = firebase.database().ref();
    
    constructor(){
        super();
        this.state={
            email:"",
            pass:"",
            name:"",
            image:"",
            uidd:""
        }
    }
    
    email(ev){
        this.setState({email: ev.target.value});
    }
    pass(ev){
        this.setState({pass: ev.target.value});
    }
    name(ev){
        this.setState({name:ev.target.value});
    }
    signUp(){
        let name= this.state.name;
        let page = this.props.history;
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass)
        .then(ev=>{
            firebase.storage().ref().child(`images${this.state.image.name}`).put(this.state.image).then(function(snap){
                firebase.database().ref().child('chat').child(ev.uid).set({name,image: snap.downloadURL,uidd:ev.uid}).then(()=>{
                    console.log("userUIDDDDDDDDDDDDDd",ev.uid)
                    console.log("successsssssssssssssss")
                    { page.push("/Home")}
                });
                console.log('imageeeeeeeeeeeeeeeeeeeeeeeeee',snap.downloadURL)
            })
            
            
        })
        .catch(ev=> alert(ev.message));
    }
    uploadImage(ev){
        this.setState({image:ev.target.files[0]})
        console.log(ev.target.files[0].name)
        // console.log(this.state.image)
    }
    render() {

        return(
            <div className="form">
            <form className="main">
            <img src={require("../images/logo1.png")} className="logo"/>
            <p className="head">Sign Up</p>
            <p> Full Name:<br />
                <input type="name" className="field3" onChange={this.name.bind(this)}/>
                </p>
                <br />
                <p> Email:<br />
                <input type="email" className="field1" onChange={this.email.bind(this)}/>
                </p>
                <br />
                <p> Password:<br />
                <input type="password" className="field2" onChange={this.pass.bind(this)}/>
                </p>
                <FlatButton
      label="Choose an Image"
      labelPosition="before"
      containerElement="label"
      style={styles.uploadButton}
      onChange={this.uploadImage.bind(this)}
    >
     <input type="file" style={styles.uploadInput} />
    </FlatButton>
                <br />
                <br />
                <RaisedButton label="Sign Up" primary={true} onClick={()=> this.signUp()}/>
                <br />
                <br />
               <Link to="/"><a href="#">Already Have</a></Link>
                </form>
            </div>
        )
    }
}
export default SignUp;
const styles = {
    uploadButton: {
      verticalAlign: 'middle',
    },
    uploadInput: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0,
    },
  };