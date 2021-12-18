import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RequestLoan from './RequestLoan';
import Progress from './Progress';
import RepayMent from './Repayment';
import Login from './Login';
import {Register} from "./"

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/request" component={RequestLoan} />
          <Route path="/pay" component={RepayMent} />
          <Route path="/progress" component={Progress} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
