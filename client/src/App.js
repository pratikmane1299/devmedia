import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Routes from './components/routing/Routes';

import './App.css';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
