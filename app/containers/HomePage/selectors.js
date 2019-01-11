/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectSearchusername = () =>
  createSelector(selectHome, homeState => homeState.get('searchusername'));

const makeSelectNewusername = () =>
  createSelector(selectHome, homeState => homeState.get('newusername'));

const makeSelectUsers = () =>
  createSelector(selectHome, homeState => homeState.get('users'));

const makeSelectSearchError = () =>
  createSelector(selectHome, homeState => homeState.get('searchError'));

const makeSelectAddStatus = () =>
  createSelector(selectHome, homeState => homeState.get('addStatus'));

const makeSelectAddTried = () =>
  createSelector(selectHome, homeState => homeState.get('addTried'));

const makeSelectAddError = () =>
  createSelector(selectHome, homeState => homeState.get('addError'));


export { selectHome, makeSelectSearchusername, makeSelectNewusername, makeSelectUsers, makeSelectSearchError,
			makeSelectAddStatus, makeSelectAddTried, makeSelectAddError };
