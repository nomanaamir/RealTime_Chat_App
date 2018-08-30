import React, {Component} from 'react';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';
import '../App.css';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import UsersName from './usersName';
import UserComp from './UserComp';
import Header from './Header';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
class Home extends Component {
    constructor(){
        super();
        this.state={
            userName:[],
            userEmail:"",
            open: false
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            
                        if (user) {
                         
                                firebase.database().ref().child('chat').child(user.uid).on("value", ev=>{
                                    let data = ev.val();
                                    // console.log("dataaaaaaaaaaaaaaaaa", data)
                        
                                        // this.setState({userName: Object.values(data)})
                                        this.setState({userName: data,userEmail: user.email})
                                        // console.log('nameeeeeeeeeeeeeeeeeeeeeeeee',this.state.userName.image)
                                        console.log("email",user.email)
                             
                                })
                     
                           
                        }
            
                    });
        
       
    }
    // handleOpen(){
    //     this.setState({open: true});
    //   };
    
    //   handleClose = () => {
    //     this.setState({open: false});
    //   };
    
      logOut(){
        firebase.auth().signOut();
        {this.props.history.push("/")}
      }
      handleToggle = () => this.setState({open: !this.state.open});
    render(){
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Log Out"
              primary={true}
              keyboardFocused={true}
              onClick={()=>this.logOut()}
            />,
          ];
        return(
            <div>
               <div>
        <img src={require("../images/draw.png")}
          onClick={this.handleToggle}
          height="50px"
          width="50px"
          style={{float:"right",paddingTop:"25px",paddingRight:"45px"}}
        />
        <Drawer open={this.state.open}>
          <MenuItem> <img src={this.state.userName.image} style={{borderRadius: "20px",marginLeft: "50px",marginTop:"40px",boxShadow:"0px 0px 12px black"}} height="120px" width="120px"/></MenuItem>
          <MenuItem>{this.state.userName.name}</MenuItem>
          <MenuItem>{this.state.userEmail}</MenuItem>
          <MenuItem><RaisedButton label="Log Out" onClick={()=>this.logOut()} primary={true}/></MenuItem>
        </Drawer>
      </div>
                
            <div>  <Header /> </div>
                               {/* <div style={{backgroundColor:"#33B8E2"}}> 
                               <img src={this.state.userName.image} className="mainImg" height="75px" width="75px"/></div>
                               <div style={{color:"red",fontSize:"20px",float:"right",marginRight: "600px",marginTop: "-50px"}}><span style={{color:"blue"}}>Name:</span> <span style={{color:"white"}}>{this.state.userName.name}</span></div>
                               <span style={{float:"right",marginTop: "-150px"}}><RaisedButton label="Log Out" onClick={()=>this.handleOpen()} primary={true}/></span> */}
                                <div className="userComp"> <UsersName /></div>
                                {/* <div className="userTab">  <UserComp /> </div> */}
                               
                     
                      </div>
                
               
        )
    }
}
export default Home;



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

        // <img src={this.state.userName.image} className="mainImg" height="75px" width="75px"/></div><div style={{color:"red",fontSize:"20px",float:"right",marginRight: "600px",marginTop: "-50px"}}><span style={{color:"blue"}}>Name:</span> <span style={{color:"white"}}>{this.state.userName.name}</span></div>
        // <span style={{float:"right",marginTop: "-150px"}}><RaisedButton label="Log Out" onClick={this.handleOpen} primary={true}/></span>
        //  <div className="userComp"> <UsersName />

        // <div> <img src={this.state.userName.image} className="mainImg" height="75px" width="75px"/></div><div style={{color:"red",fontSize:"20px",float:"right",marginRight: "600px",marginTop: "-50px"}}><span style={{color:"blue"}}>Name:</span> <span style={{color:"white"}}>{this.state.userName.name}</span></div>
        // <span style={{float:"right",marginTop: "-150px"}}><RaisedButton label="Log Out" onClick={this.handleOpen} primary={true}/></span>