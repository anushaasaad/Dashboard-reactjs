import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import Bootstrap from './components/bootstrap';
import Fetchdata from './components/fetchdata';
import Dashboard from './components/dashboard';
class App extends Component {
  render() {
    return (
      <div className="App"> 
          <Dashboard />
      </div>
    )
  }
}
export default App;