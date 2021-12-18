import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RequestLoan from './RequestLoan';
import Progress from './Progress';
import RepayMent from './Repayment';
import Login from './Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={RequestLoan} />
          <Route path="/request" component={RequestLoan} />
          <Route path="/pay" component={RepayMent} />
          <Route path="/progress" component={Progress} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
