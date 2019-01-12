import {
  GET_USERSTATS, GET_USERSTATS_SUCCESS, GET_USERSTATS_ERROR,
  ADD_SENTIMENT, ADD_SENTIMENT_SUCCESS, ADD_SENTIMENT_ERROR
} from './constants';


export function getUserStats(name) {
  return {
    type: GET_USERSTATS,
    name
  };
}

export function getUserStatsSuccess(stats) {
  return {
    type: GET_USERSTATS_SUCCESS,
    stats
  };
}

export function getUserStatsError(error) {
  return {
    type: GET_USERSTATS_ERROR,
    error
  };
}


export function addSentiment(sentiment) {
  return {
    type: ADD_SENTIMENT,
    sentiment
  };
}

export function addSentimentSuccess() {
  return {
    type: ADD_SENTIMENT_SUCCESS
  };
}

export function addSentimentError(error) {
  return {
    type: ADD_SENTIMENT_ERROR,
    error
  };
}