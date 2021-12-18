import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Items from './Items';
import Purchases from './Purchases';
import Progress from './Progress';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Items} />
          <Route path="/request" component={Items} />
          <Route path="/pay" component={Purchases} />
          <Route path="/pay" component={Purchases} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
