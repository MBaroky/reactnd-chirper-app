import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBarContainer from "react-redux-loading";
import { handleInitialData } from "../actions/shared";
// import Dashboard from "./Dashboard";
// import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";

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
          <TweetPage
            match={{ params: { id: "8xf0y6ziyjabvozdd253nd" } }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
