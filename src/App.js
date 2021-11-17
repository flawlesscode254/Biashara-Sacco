import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from './Nav';
import Items from './Items';
import Purchases from './Purchases';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Nav} />
          <Route path="/info" component={Items} />
          <Route path="/previous" component={Purchases} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
