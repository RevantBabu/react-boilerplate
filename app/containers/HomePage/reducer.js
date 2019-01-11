/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { CHANGE_SEARCHUSERNAME } from './constants';
import { CHANGE_NEWUSERNAME } from './constants';
import {
  SEARCH_USERNAME, SEARCH_USERNAME_SUCCESS, SEARCH_USERNAME_ERROR,
  ADD_USERNAME, ADD_USERNAME_SUCCESS, ADD_USERNAME_ERROR,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  searchusername: '',
  newusername: '',
  users: [],
  searchError: false,
  addStatus: false,
  addError: false,
  addTried: false
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCHUSERNAME:
      // Delete prefixed '@' from the github username
      return state.set('searchusername', action.name.replace(/@/gi, ''));
    case CHANGE_NEWUSERNAME:
      // Delete prefixed '@' from the github username
      return state.set('newusername', action.name.replace(/@/gi, ''));
    case SEARCH_USERNAME:
      return state
        .set('searchError', false)
        .set('users', []);
    case SEARCH_USERNAME_SUCCESS:
      return state
        .set('users', action.users);
    case SEARCH_USERNAME_ERROR:
      return state.set('searchError', action.error);
    case ADD_USERNAME:
      return state
        .set('addError', false)
        .set('addTried', false)
        .set('addStatus', false);
    case ADD_USERNAME_SUCCESS:
      return state
        .set('addStatus', action.status)
        .set('addTried', true);
    case ADD_USERNAME_ERROR:
      return state
        .set('addError', action.error)
        .set('addTried', true);
    default:
      return state;
  }
}

export default homeReducer;
