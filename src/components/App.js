import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBarContainer from "react-redux-loading";
import { handleInitialData } from "../actions/shared";
// import Dashboard from "./Dashboard";
import NewTweet from "./NewTweet";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { loading } = this.props;
    return (
      <div>
        <LoadingBarContainer />
        {loading === true ? (
          <h5 className='center'>Loading...</h5>
        ) : (
          <NewTweet />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
