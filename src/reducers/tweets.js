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
            ...[tweet.replyingTo],
            replies: [...[tweet.replyingTo].replies, tweet.id],
          },
        };
      }
      return {
        ...state,
        ...replyingTo,
        [tweet.id]: tweet,
      };
    default:
      return state;
  }
}
