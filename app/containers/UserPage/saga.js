/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_USERSTATS, ADD_SENTIMENT } from './constants';
import {
  getUserStats,
  getUserStatsSuccess,
  getUserStatsError,
  addSentimentSuccess,
  addSentimentError
} from './actions';

import request from 'utils/request';
import { makeSelectUsername, makeSelectSentiment } from './selectors';

/**
 * Github repos request/response handler
 */
export function* getUserStatsServer() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  const requestURL = "/api/stats/" + username;

  try {
    // Call our request helper (see 'utils/request')
    const stats = yield call(request, requestURL);
    yield put(getUserStatsSuccess(stats));
  } catch (err) {
    yield put(getUserStatsError(err));
  }
}

export function* addSentiment() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const sentiment = yield select(makeSelectSentiment());
  const sentimentString = sentiment == 1 ? "plus" : "minus";
  try {
    const result = yield call(() => request("/api/addsentiment/" + username + "/" + sentimentString, {
        method: "POST",
        body: JSON.stringify({"username": username}),
    }));
    yield put(addSentimentSuccess());
    yield put(getUserStats(username));
  } catch (err) {
    yield put(addSentimentError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_USERSTATS, getUserStatsServer);
  yield takeLatest(ADD_SENTIMENT, addSentiment);
}
