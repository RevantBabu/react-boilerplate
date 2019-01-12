/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_SEARCHUSERNAME = 'boilerplate/Home/CHANGE_SEARCHUSERNAME';
export const CHANGE_NEWUSERNAME = 'boilerplate/Home/CHANGE_NEWUSERNAME';
export const SEARCH_USERNAME = 'boilerplate/Home/SEARCH_USERNAME';
export const SEARCH_USERNAME_SUCCESS = 'boilerplate/Home/SEARCH_USERNAME_SUCCESS';
export const SEARCH_USERNAME_ERROR = 'boilerplate/Home/SEARCH_USERNAME_ERROR';
export const ADD_USERNAME = 'boilerplate/Home/ADD_USERNAME';
export const ADD_USERNAME_SUCCESS = 'boilerplate/Home/ADD_USERNAME_SUCCESS';
export const ADD_USERNAME_ERROR = 'boilerplate/Home/ADD_USERNAME_ERROR';



