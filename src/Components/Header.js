import React, {Component} from 'react';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';
import '../App.css';



        class Header extends Component{
          render(){
            return(
              <div style={{backgroundColor:"white",marginTop:"-25px",marginRight:"-8px",marginLeft:"-10px",boxShadow:"0px 0px 18px black"}}>
              <img src={require("../images/logo1.png")} height="75px" width="75px" style={{paddingTop:"10px",paddingLeft:"60px"}}/>
              </div>
            )
          }
        }
   
   
        export default Header;













        
// import React, {Component} from 'react';
// import * as firebase from 'firebase';
// import {Link} from 'react-router-dom';
// import '../App.css';
// // import Avatar from 'material-ui/Avatar';
// import List from 'material-ui/List/List';
// import ListItem from 'material-ui/List/ListItem';
// // import MobileTearSheet from 'material-ui/MobileTearSheet';
// import Avatar from 'material-ui/Avatar';
// // import {List, ListItem} from 'material-ui/List';
// import Subheader from 'material-ui/Subheader';
// import Divider from 'material-ui/Divider';
// import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
// import '../App.css'
// class UserTab extends Component {
   
    
//     render(){
//         return(
//             <div>
//         <Card>
//         <CardHeader
//           title="URL Avatar"
//           subtitle="Subtitle"
//           avatar="images/jsa-128.jpg"
//         />
//         {/* <CardMedia
//           overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
//         >
//           <img src="images/nature-600-337.jpg" alt="" />
//         </CardMedia> */}
//         <CardTitle title="Card title" subtitle="Card subtitle" />
//         <input type="text" className="chatField"/>
//         <br />
//         <br />
       
//       </Card>
       
//                       </div>
                
               
//         )
//     }
// }
// export default UserTab;