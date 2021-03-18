import React from "react";
import SignInOutContainer from "./containers";
import Signup from "./components/signup";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { FirstStep } from "./components/FirstStep";
import { SecondStep } from "./components/SecondStep";
import { db, fire } from "./helpers/db";
import NewsContent from "./components/NewsContent";
import { Home } from "@material-ui/icons";


const authentication = {
  isLoggedIn: false,
  onAuthentication() {
    this.isLoggedIn = true;
  },
  getLogInStatus() {
    return this.isLoggedIn;
  }
}


function SecuredRoute(props) {
  return (
    <Route path={props.path} render={data => authentication.getLogInStatus()
      ? (<props.component {...data}></props.component>) : (<Redirect to={{ pathname: '/' }}></Redirect>)
    } ></Route>
  )
}



const user = fire.currentUser;

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Switch>
        <Route exact path="/" render={(props) => <SignInOutContainer {...props} authentiCation={authentication} />} />
        <Route exact path="/Signup" component={Signup} />
        <SecuredRoute exact path="/selectNews" component={FirstStep} />
        <SecuredRoute exact path="/selectCategory" component={SecondStep} />
        <SecuredRoute exact path="/news-contents" component={Home} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
