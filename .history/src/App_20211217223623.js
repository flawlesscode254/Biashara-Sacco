import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Items from './Items';
import Purchases from './Purchases';
import Progress from './Progress';
import Emergency from './Emergency';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Items} />
          <Route path="/request" component={Items} />
          <Route path="/pay" component={Emergency} />
          <Route path="/progress" component={Progress} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
