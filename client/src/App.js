import logo from './logo.svg';
import './App.css';

import Signup from './Signup';
import Login from './Login'
import Dashboard from './Dashboard'
import Home from './Home'
import History from './History';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Error from "./Error.js";
import UpdatedForm from "./UpdatedForm";
import Edit from "./Edit.js";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="router">
            <Switch>
              
                <Route exact path="/">
                     <Home/>
                </Route>
                <Route exact path="/user/:id/dashboard" component={Dashboard}>
                </Route>
                <Route exact path="/edit/:id">
                  <Edit/>
                </Route>
                <Route exact path="/user/:id/History" component={History}>

                </Route>
                <Route exact path="/user/:id/create">
                  <UpdatedForm/>
                </Route>
                <Route exact path="/login">
                  <Login/>
                </Route>
                <Route exact path="/signup">
                  <Signup/>
                </Route>
                <Route exact path="*">
                  <Error/>
                </Route>
              
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
