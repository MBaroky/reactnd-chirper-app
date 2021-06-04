import {
  ADD_TWEET,
  RECEIVE_TWEETS,
  TOGGLE_TWEET,
} from "../actions/tweets";

export function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets,
      };
    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes:
            action.hasLiked === true
              ? state[action.id].likes.filter(
                  uid => uid !== action.authedUser
                )
              : [...state[action.id].likes, action.authedUser],
        },
      };

    case ADD_TWEET:
      const { tweet } = action;

      let replyingTo = {};

      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            // key: parent tweet's id
            ...state[tweet.replyingTo], // spreading the parent tweet
            // CONCLUSION: adding current-new tweet's id to the replies list of parent tweet
            replies: [
              ...state[tweet.replyingTo].replies, // spreading all old replies attached to the parent tweet
              tweet.id, //  adding new tweet's id
            ],
          },
        };
      }
      return {
        ...state, // spread state
        ...replyingTo, // updating the replies array in parent tweet
        [tweet.id]: tweet, // adding the new tweet
      };
    default:
      return state;
  }
}
