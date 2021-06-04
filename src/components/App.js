import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBarContainer from "react-redux-loading";
import { handleInitialData } from "../actions/shared";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from "react-router-dom";

import Dashboard from "./Dashboard";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";
import { Fragment } from "react";
import Nav from "./Nav";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { loading } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBarContainer />
          <div className='container'>
            <Nav />
            {loading === true ? (
              <h5 className='center'>Loading...</h5>
            ) : (
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/tweet/:id' component={TweetPage} />
                <Route exact path='/new' component={NewTweet} />

                <Route>
                  <div className='center'>
                    <hr />
                    (404) Nothing leads to here, you are lost
                    <Link to='/' style={{ color: "blue" }}>
                      {" "}
                      Start Over?
                    </Link>
                  </div>
                </Route>
              </Switch>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
