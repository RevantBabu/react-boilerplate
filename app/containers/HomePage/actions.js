/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { CHANGE_SEARCHUSERNAME } from './constants';
import { CHANGE_NEWUSERNAME } from './constants';
import {
  SEARCH_USERNAME, SEARCH_USERNAME_SUCCESS, SEARCH_USERNAME_ERROR,
  ADD_USERNAME, ADD_USERNAME_SUCCESS, ADD_USERNAME_ERROR,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeSearchusername(name) {
  return {
    type: CHANGE_SEARCHUSERNAME,
    name,
  };
}

export function changeNewusername(name) {
  return {
    type: CHANGE_NEWUSERNAME,
    name,
  };
}

export function searchUsername() {
  return {
    type: SEARCH_USERNAME,
  };
}

export function searchUsernameSuccess(users, searchusername) {
  return {
    type: SEARCH_USERNAME_SUCCESS,
    users,
    searchusername,
  };
}

export function searchUsernameError(error) {
  return {
    type: SEARCH_USERNAME_ERROR,
    error
  };
}


export function addUsername() {
  return {
    type: ADD_USERNAME,
  };
}

export function addUsernameSuccess(status, addusername) {
  return {
    type: ADD_USERNAME_SUCCESS,
    status,
    addusername,
  };
}

export function addUsernameError(error) {
  return {
    type: ADD_USERNAME_ERROR,
    error
  };
}