/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SEARCH_USERNAME, ADD_USERNAME } from './constants';
import {
  searchUsernameSuccess,
  searchUsernameError,
  addUsernameSuccess,
  addUsernameError
} from './actions';

import request from 'utils/request';
import { makeSelectSearchusername } from 'containers/HomePage/selectors';
import { makeSelectNewusername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getUsers() {
  // Select username from store
  const username = yield select(makeSelectSearchusername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  const requestURL = "/api/users/" + username;

  try {
    // Call our request helper (see 'utils/request')
    const users = yield call(request, requestURL);
    yield put(searchUsernameSuccess(users, username));
  } catch (err) {
    yield put(searchUsernameError(err));
  }
}

export function* addUser() {
  // Select username from store
  const username = yield select(makeSelectNewusername());

  try {
    const result = yield call(() => request("/api/addusers/" + username, {
        method: "POST",
        body: JSON.stringify({"username": username}),
    }));
    yield put(addUsernameSuccess(result.userCreated, username));
  } catch (err) {
    yield put(addUsernameError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SEARCH_USERNAME, getUsers);
  yield takeLatest(ADD_USERNAME, addUser);
}
