// import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';

// import BasicTable from './Components/Archive/BasicTable;'
// import FixedHeader from './Components/Archive/FixedHeader;'
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Screener from './Components/Screener';
// import Exchange from './Components/Exchange';
import Forum from './Components/Forum';
import TransHistory from './Components/TransHistory';
// import Profile from './Components/Profile';

import Exchange from './Components/Login_Profile_Exchange/exchange_page';
import CreateUser from './Components/Login_Profile_Exchange/create_user';


function App() {
  return (
    <Router>
      <div className="App">
        {/* <TransHistory /> */}

        {/* <nav><ul>
          <li><Link to='/'>login</Link></li>
          <li><Link to='/screener'>screener</Link></li>
          <li><Link to='/exchange'>exchange</Link></li>
          <li><Link to='/trans_history'>trans_history</Link></li>
          <li><Link to='/profile'>profile</Link></li>
          <li><a href='https://arbitrage-4c056.firebaseapp.com'>forum</a></li>
        </ul></nav> */}

        <NavBar />

        <Switch>
          <Route path='/screener' component={Screener} />
          {/* <Route path='/exchange' component={Exchange} /> */}
          <Route path='/forum' component={Forum}/>
          <Route path='/trans_history' component={TransHistory} />
          <Route path='/profile' component={Exchange} />
          <Route path='/' component={CreateUser}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
