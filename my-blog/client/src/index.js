import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Home } from './routes';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))