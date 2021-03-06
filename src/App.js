import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/layout/Header";
import Lessons from "./components/lesson/Lessons";
import Category from "./components/section/Category";
import Textbook from "./components/section/Textbook";
import Chapters from "./components/section/Chapters";
import CreateTextbookList from "./components/user/CreateTextbookList";
import UserAccount from "./components/user/UserAccount";
import AccountPopup from "./components/layout/AccountPopup";
import store from "./store";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Category} />
                <Route exact path="/category/:slug" component={Textbook} />
                <Route exact path="/textbook/:slug" component={Chapters} />
                <Route exact path="/lesson/:slug" component={Lessons} />
                <Route
                  exact
                  path="/user/textbook"
                  component={CreateTextbookList}
                />
                <Route exact path="/user/account" component={UserAccount} />
              </Switch>
            </div>
            <AccountPopup />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
