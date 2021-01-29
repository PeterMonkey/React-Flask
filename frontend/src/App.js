import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { about } from './components/about';
import { users } from './components/users';
import { navbar } from './components/navbar';

function App() {
  return (
    <Router>
      <navbar/>
      <div>
        <Switch>
          <Route path="/about" component={about}/>
          <Route path="/" component={users}/>
        </Switch>
      </div>
    </Router>   
  );
}

export default App;
