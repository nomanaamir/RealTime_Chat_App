import React, {Component} from 'react';
import '../App.css'
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
// import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
// import MobileTearSheet from 'material-ui/MobileTearSheet';
import Avatar from 'material-ui/Avatar';
// import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class UserComp extends Component {
    constructor(){
        super();
        this.state={
            userr:"",
            users:[],
            name: "",
            image: "",
            typeMsgs: "",
            usersUids: "",
            msgs: [],
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {

            if (user) {
                this.setState({ userr: user.uid })
                firebase.database().ref().child('chat').on("value", ev => {
                    let keys = [];
                    let data2 = ev.val();
                    for (let i in data2) {
                        keys.push(i)
                    }
                    // console.log("dataaaaaaaaaaaaaaaaa", data2)

                    // this.setState({userName: Object.values(data)})
                    this.setState({ users: Object.values(data2), keys })
                    // console.log('nameeeeeeeeeeeeeeeeeeeeeeeee',this.state.users)
                    // console.log("keyssssssssssssssssss",keys)

                })


            }

        });




    }
    typeMsg(ev, val, ind) {
        this.setState({ typeMsgs: ev.target.value })
        console.log('msgggggggggggggggggggggggggggg', this.state.typeMsgs, this.state.usersUids, this.state.usersKeys)
        // alert(this.state.usersKeys)
    }
    msgSent() {
        console.log('firebaseeeeeeeeeeeeeeeeeeeeeee', this.state.usersUids)
        console.log('firebaseeeeeeeeeeeeeeeeeeeeeee', this.state.userr)
        if (this.state.typeMsgs === "") {
            alert("Messeges Is Required")
        } else {

            firebase.database().ref().child(`msgs/${this.state.userr}/${this.state.usersUids}/`).push({ typeMsgs: this.state.typeMsgs, userr: this.state.userr })
            firebase.database().ref().child(`msgs/${this.state.usersUids}/${this.state.userr}/`).push({ typeMsgs: this.state.typeMsgs, usersUids: this.state.usersUids })
            this.setState({ typeMsgs: "" })
        }
    }
    render(){
        return(
            <Card>
            <CardHeader
                title={this.state.name.name}
                avatar={this.state.name.image}
            />
            <CardText className="card" id="ikl">
                {this.state.msgs.map((val, ind) => {
                    console.log('msggsssssssssOOOOOO', val.typeMsgs)

                    return (
                        val.userr === this.state.userr ? 
                       
                        <div>
                            <p className="chatText">{val.typeMsgs}</p> </div>
                           
                        : <p className="chatText2">{val.typeMsgs}</p>
                    )
                })}


        {this.state.name.name &&
            <form onSubmit={(e) => e.preventDefault()} className="footer">
               <span> <input type="text" onChange={this.typeMsg.bind(this)} value={this.state.typeMsgs} placeholder="Type Message" className="chatField" />
             </span>   <span style={{ padding: "25px", marginTop: "-20px" }}>
                    <button type="submit" style={{ borderRadius: "20px",bottom: "-7px", position: "fixed",marginLeft: "828px" }} onClick={() => this.msgSent()}>
                        <img src={require("../images/plane.png")}  height="40px" width="40px" />
                    </button>
                </span>
            </form>}
            </CardText>

        </Card>
        
        )
    }
}
export default UserComp;