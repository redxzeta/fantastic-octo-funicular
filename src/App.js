import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Home from "./components/home/Home";
import Header from "./layout/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Register from "./components/login/Register";
import { auth } from "./services/FirebaseDashboard";
import Login from "./components/login/Login";
export default function App() {
  const [userAuth, setUserAuth] = useState("");
  const [placement, setplacement] = useState({
    userlat: 34.0522,
    userlng: -118.2437,
  });

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setUserAuth({
          authenticated: true,
          data: user,
        });
      } else {
        setUserAuth({ authenticated: false });
      }
    });
  }, []);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (succes) => {
          setplacement({
            userlat: succes.coords.latitude,
            userlng: succes.coords.longitude,
          });
        },
        (error) => {
          // console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Router>
        <Header authenticated={userAuth.authenticated} />
        <Container style={{}}>
          <Switch>
            <Route path="/register">
              {userAuth.authenticated ? <Redirect to="/" /> : <Register />}
            </Route>
            <Route path="/login">
              {userAuth.authenticated ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/">
              <Home
                placement={placement}
                setplacement={setplacement}
                userAuth={userAuth}
              />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}
