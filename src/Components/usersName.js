import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import '../App.css';
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

class UsersName extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            userr: '',
            name: "",
            image: "",
            typeMsgs: "",
            usersUids: "",
            usersKeys: "",
            keys: [],
            msgs: [],
            msgs2: [],
            // msgKeys:'',
            // userMsgs:[],
            // user2Uid:""
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
    userFunc(val, ind) {
        // let div = document.getElementById("ikl").scrollTop = 100000
        
        this.setState({ name: val, usersUids: val.uidd, usersKeys: this.state.keys[ind] })
        setTimeout(()=>{document.getElementById("ikl").scrollTop = 100000},1000)
        // alert(user.uid)
        // console.log(val)
        firebase.database().ref().child(`msgs/${this.state.userr}/${val.uidd}`).on("value", ev => {
            console.log('my uid', this.state.userr)
            console.log('user uid', val.uidd)
            let dataMsg = ev.val()
            console.log('currrrrrrrrrrrrrrrrrrrrr', dataMsg)
            if (dataMsg) {
                this.setState({ msgs: Object.values(dataMsg) })
            } else {
                this.setState({ msgs: [] })
            }
            // console.log(this.state.msgs)
        })

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
            setTimeout(()=>{document.getElementById("ikl").scrollTop = 100000},50)
            
        }
    }
    
    // btn() {
    //     let div = document.getElementById("ikl").scrollTop = 100000
    //    };
    
   
    render() {
        return (
            <div>
                {/* <button onClick={()=>this.btn()}>button</button> */}
                <div style={{height:"431px"}}>
                    <List className="listt">
                        <Subheader style={{color:"#33B8E2",  width: "100%",fontSize: "x-large", textAlign: "center",}}>Users</Subheader>
                        {this.state.users.map((val, ind) => {
                            // console.log('userrrrrr======r=r==r=r=',this.state.userr)
                            return (
                                val.uidd === this.state.userr ? null : <ListItem
                                    onClick={() => this.userFunc(val, ind)}
                                    primaryText={val.name}
                                    leftAvatar={<Avatar src={val.image} />}
                                    rightIcon={<CommunicationChatBubble />}
                                />

                            )



                        })}
                    </List>
                        </div>
                        
                    {this.state.name.name ?
                    <Card className="userTab">
                        <CardHeader
                            title={this.state.name.name}
                            avatar={this.state.name.image}
                        />
                        <CardText className="card" id="ikl">
                            {this.state.msgs.map((val, ind) => {
                                console.log('msggsssssssssOOOOOO', val.typeMsgs)

                                return (
                                    val.userr === this.state.userr ? 
                                   
                                    <div style={{width: "-webkit-fill-available", height: "auto",float:"right"}}>
                                        <p  className="chatText">{val.typeMsgs}</p> </div>

                                    : <div style={{width: "-webkit-fill-available", height: "auto",float:"right"}}>   
                                     <p className="chatText2">{val.typeMsgs}</p></div>
                                )
                            })}


                        <form onSubmit={(e) => e.preventDefault()} className="footer">
                           <span> <input type="text" onChange={this.typeMsg.bind(this)} value={this.state.typeMsgs} placeholder="Type Message" className="chatField" />
                         </span>   <span style={{ padding: "25px"}}>
                                <button type="submit" className="sendBtn" onClick={() => this.msgSent()}>
                                    <img src={require("../images/plane.png")}  height="40px" width="40px" />
                                </button>
                            </span>
                        </form>
                        </CardText>

                    </Card>: <p className="selectUser">SELECT USER</p>}
                 
                        </div>
                           
                            
              


        )
    }
}
export default UsersName;


// let userName =[];
// let data = ev.val();
// for(let i in data){
//     userName.push(i)
//     this.setState({userName: Object.values(data)})
//     console.log('nameeeeeeeeeeeeeeeeeeeeeeeee',this.state.userName)



        //   {/* <List>
        //                 <ListItem
        //                 disabled={true}
        //                 leftAvatar={
        //                     <Avatar src={this.state.userName.image} size={60}/>
        //                 }
        //                 >
        //                 <h1 className="nameText">{this.state.userName.name}</h1>



        //                 </ListItem>
        //             </List> */}






        // firebase.auth().onAuthStateChanged((user) => {

        //                 if (user) {

        //                     firebase.database().ref().child('chat').on("value", ev=>{
        //                         let data2 = ev.val();
        //                         console.log("dataaaaaaaaaaaaaaaaa", data2)

        //                             // this.setState({userName: Object.values(data)})
        //                             this.setState({users: Object.values(data2)})
        //                             console.log('nameeeeeeeeeeeeeeeeeeeeeeeee',this.state.users)

        //                     })


        //                 }

        //             });