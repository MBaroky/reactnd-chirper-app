import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate, formatTweet } from "../utils/helpers";
import {
  TiArrowBackOutline,
  TiHeartFullOutline,
  TiHeartOutline,
} from "react-icons/ti";
import { handleToggleTweet } from "../actions/tweets";
import { withRouter, Link } from "react-router-dom";

class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault();

    console.log(id);
    this.props.history.push(`/tweet/${id}`);
  };
  handleLike = e => {
    e.preventDefault();

    const { dispatch, tweet, authedUser } = this.props;
    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser,
      })
    );
    console.log(this.props.tweet.hasLiked);
  };
  render() {
    const { tweet } = this.props;
    const {
      id,
      name,
      timestamp,
      text,
      avatar,
      likes,
      replies,
      hasLiked,
      parent,
    } = tweet;
    if (tweet === null) {
      return <p>this tweet doesn't exist </p>;
    }
    return (
      <Link to={`/tweet/${id}`} className='tweet'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='tweet-info'>
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className='replying-to'
                onClick={e => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            <span>{replies !== 0 && replies}</span>
            <button
              className='heart-button'
              onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline
                  className='tweet-icon'
                  color='#e0245e'
                />
              ) : (
                <TiHeartOutline className='tweet-icon' />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = ({ tweets, authedUser, users }, { id }) => {
  const tweet = tweets[id],
    parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authedUser,
    tweet: tweet
      ? formatTweet(
          tweet,
          users[tweet.author],
          authedUser,
          parentTweet
        )
      : null,
  };
};

export default withRouter(connect(mapStateToProps)(Tweet));
