import "./App.css";
import Checkout from "./Checkout";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./Orders";

const stripePublicKey =
  "pk_test_51NMZ5rBEKuEbMVJ0ecM6iRJmb1NEZtEPiD82ENw7tfRDhwxyoa3bgiz3wUOtK4Hqf9tIXK1Neir9Qiy6pSTmTIqN00m2m8BW2J";

const promise = loadStripe(stripePublicKey);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/orders" element={[<Header />, <Orders />]} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route
            path="/payment"
            element={[
              <Header />,
              <Elements stripe={promise}>
                <Payment />
              </Elements>,
            ]}
          />
          <Route path="/" element={[<Header />, <Home />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
