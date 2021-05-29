import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddTweet } from "../actions/tweets";

class NewTweet extends Component {
  state = {
    text: "",
  };
  handleChange = e => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };
  handleSubmit = e => {
    e.preventDefault();
    const { text } = this.state;
    //   TODO : Add tweet to store
    const { dispatch, id } = this.props;
    dispatch(handleAddTweet(text, id));
    console.log("tweet text is: ", text);
    this.setState(() => ({
      text: "",
    }));
  };
  render() {
    const { text } = this.state;
    const tweetLeft = 280 - text.length;
    return (
      <div>
        <h3 className='center'>Compose New Text</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            name='textare'
            id=''
            cols='30'
            placeholder="What's Hapenning?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
            rows='10'></textarea>
          {tweetLeft <= 100 && (
            <div className='tweet-length'>{tweetLeft}</div>
          )}
          <button
            className='btn'
            type='submit'
            disabled={text === ""}>
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
