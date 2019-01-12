/**
 * UserPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUser = state => state.get('user', initialState);

const makeSelectUsername = () =>
  createSelector(selectUser, userState => userState.get('username'));

const makeSelectUserStats = () =>
  createSelector(selectUser, userState => userState.get('userStats'));

const makeSelectUserStatsError = () =>
  createSelector(selectUser, userState => userState.get('userStatsError'));

const makeSelectSentiment = () =>
  createSelector(selectUser, userState => userState.get('sentiment'));

const makeSelectAddSentimentStatus = () =>
  createSelector(selectUser, userState => userState.get('addSentimentStatus'));

const makeSelectAddSentimentError = () =>
  createSelector(selectUser, userState => userState.get('addSentimentError'));

const makeSelectAddSentimentTried = () =>
  createSelector(selectUser, userState => userState.get('addSentimentTried'));


export { selectUser,  makeSelectUsername, makeSelectUserStats, makeSelectUserStatsError, makeSelectSentiment,
			makeSelectAddSentimentStatus, makeSelectAddSentimentError, makeSelectAddSentimentTried };
