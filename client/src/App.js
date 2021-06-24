import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Routes from './components/routing/Routes';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
}

export default App;
