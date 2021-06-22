import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from './index/Home.js';
import Login from './login/Login.js'

function Index() {
    const LoginGuardRoute = ({ component: Component, ...props }) => (
        <Route
          {...props}
          render={(routeProps) => {
            const item = localStorage.getItem("@Token");
            // Do all your conditional tests here
            return item !== null ? (
              <Component {...routeProps} />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
      );
 
        return (
            <>
            <BrowserRouter>
                <Switch>
                    <LoginGuardRoute exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                </Switch>
            </BrowserRouter>
         
            </>
        );
   
}
export default Index;
ReactDOM.render(<Index />, document.getElementById("app"));
