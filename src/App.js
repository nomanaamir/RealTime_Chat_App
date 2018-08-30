import React, { Component } from 'react';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import usersName from './Components/usersName';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/Home" component={Home} />
          <Route path="/usersName" component={usersName}/>
          </div>
      </Router>
    );
  }
}
export default App;