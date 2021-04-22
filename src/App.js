import './App.css';
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './Component/Checkout/Checkout';
import LogIn from './Component/LogIn/LogIn';
import { useStateValue } from './Component/ContextAPI/StateProvider';
import { useEffect } from 'react';
import { auth } from './Component/firebase';

function App() {

  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {

      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  },[])

  return (
    <div className="App">
      <Router>
        <Switch>

          <Route path="/LogIn">  
            <LogIn />
          </Route>

          <Route path="/checkout">  
            <Header /> 
            <Checkout />
          </Route>
          
          <Route path="/">
            <Header />   
            <Home />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
