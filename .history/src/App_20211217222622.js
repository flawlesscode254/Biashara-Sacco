import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Items from './Items';
import Purchases from './Purchases';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Items} />
          <Route path="/request" component={Items} />
          <Route path="/emergency" component={Purchases} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
