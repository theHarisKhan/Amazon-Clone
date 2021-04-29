import './App.css';
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './Component/Checkout/Checkout';
import LogIn from './Component/LogIn/LogIn';
import { useStateValue } from './Component/ContextAPI/StateProvider';
import { useEffect } from 'react';
import { auth } from './Component/firebase';
import Payment from './Component/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Component/Orders/Orders';

  const promise = loadStripe('pk_test_51IkaCIBPjiAuUrpXHVCU8GRfAN4pKK1qkdAeSLTFowT0AnZpxaHK6tSj1h6m38s7StEUaiVFMM2VsvIGaLywLQX300oT2anMjt')

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

          <Route path="/orders"> 
            <Header /> 
            <Orders />
          </Route>

          <Route path="/LogIn">  
            <LogIn />
          </Route>

          <Route path="/checkout">  
            <Header /> 
            <Checkout />
          </Route>

          <Route path="/payment">  
            <Header /> 
            <Elements stripe={promise}>  
              <Payment />
            </Elements>
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
