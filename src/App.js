import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Update from './components/update.component';
import Read from './components/read.component';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to={'/'} className="navbar-brand">Объявления</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link">Список</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/create'} className="nav-link">Создать</Link>
                            </li>
                        </ul>
                    </div>
                </nav> <br/>
                <Switch>
                    <Route exact path='/create' component={ Create } />
                    <Route path='/update/:id' component={ Update } />
                    <Route path='/' component={ Read } />
                </Switch>
            </div>
        </Router>
    );
  }
}

export default App;
