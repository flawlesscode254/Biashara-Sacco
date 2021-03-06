import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RequestLoan from './RequestLoan';
import Progress from './Progress';
import RepayMent from './Repayment';
import Login from './Login';
import Register from './Register'
import Contact from "./Contact"
import About from "./About"
import BorrowedLoans from "./BorrowedLoans"
import Repayments from "./Repayments"
import Savings from "./Savings"
import MadeSavings from "./MadeSavings"
import UsersList from "./UsersList"
import ReplyChat from "./ReplyChat"
import PayPal from "./PayPal"
import OtherPayPal from "./OtherPayPal"

function App() {
  return (
    // Routes section
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/request" component={RequestLoan} />
          <Route path="/pay" component={RepayMent} />
          <Route path="/progress" component={Progress} />
          <Route path="/register" component={Register} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/borrowed" component={BorrowedLoans} />
          <Route path="/repayments" component={Repayments} />
          <Route path="/savings" component={Savings} />
          <Route path="/saved" component={MadeSavings} />
          <Route path="/users" component={UsersList} />
          <Route path="/reply" component={ReplyChat} />
          <Route path="/paypal" component={PayPal} />
          <Route path="/other" component={OtherPayPal} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
