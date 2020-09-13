import React, { Component } from 'react';

import classes from './App.css';
import Layout from './components/Layout/Layout'

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <h1>Gururaj here</h1>
        <Layout>
          <p>test</p>
        </Layout>
      </div>
    );
  }
}

export default App;
