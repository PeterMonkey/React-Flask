import React from 'react';
import {HeadProvider, Title} from 'react-head';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { About } from './components/about';
import { Users } from './components/users';
import { Navbar } from './components/navbar';

function App() {

  return (
    
    <Router>
      <HeadProvider>
        <Title>React-flask</Title>
      </HeadProvider>
      <Navbar/>
      <div className="container p-4">
        <Switch>
          <Route path="/about" component={About}/>
          <Route path="/" component={Users}/>
        </Switch>
      </div>
    </Router>   
  )
};

export default App;
