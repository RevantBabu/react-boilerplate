import { fromJS } from 'immutable';

import {
  GET_USERSTATS, GET_USERSTATS_SUCCESS, GET_USERSTATS_ERROR,
  ADD_SENTIMENT, ADD_SENTIMENT_SUCCESS, ADD_SENTIMENT_ERROR
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  username: '',
  userStats: false,
  userStatsError: false,
  addSentimentStatus: false,
  addSentimentError: false,
  addSentimentTried: false,
  sentiment: 1
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERSTATS:
      return state
        .set('username', action.name)
        .set('userStatsError', false);
    case GET_USERSTATS_SUCCESS:
      return state.set('userStats', action.stats);
    case GET_USERSTATS_ERROR:
      return state
        .set('userStatsError', true)
        .set('userStats', false);
    case ADD_SENTIMENT:
      return state
        .set('sentiment', action.sentiment)
        .set('addSentimentStatus', false)
        .set('addSentimentTried', false)
        .set('addSentimentError', false);
    case ADD_SENTIMENT_SUCCESS:
      return state
        .set('addSentimentTried', true)
        .set('addSentimentStatus', true);
    case ADD_SENTIMENT_ERROR:
      return state
        .set('addSentimentTried', true)
        .set('addSentimentError', true);
    default:
      return state;
  }
}

export default userReducer;
