import { AnyAction } from 'redux';

import { User } from './user.types';

import {
  signInFailed,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
  signInSuccess,
  setCurrentUser,
  signUpStart,
  checkUserSession,
} from './user.action';

export type UserState = {
  readonly currentUser: User | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (
    signUpStart.match(action) ||
    checkUserSession.match(action) 
  ) {
    return { ...state, isLoading: true };
  }
  if (
    signInSuccess.match(action) ||
    setCurrentUser.match(action) 
  ) {
    return { ...state, isLoading: false, currentUser: action.payload};
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return { ...state, isLoading: false, error: action.payload };
  }

  return state;
};