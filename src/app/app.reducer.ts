import { createReducer, on } from '@ngrx/store';
import { login } from './app.actions';
 
export interface AppState {
  isLoggedIn: boolean;
};

export const initialState: AppState = {
	isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
};
 
const _appReducer = createReducer(
  initialState,
  on(login, (state) => ({
		...state,
		isLoggedIn: true
	})),
);
 
export function appReducer(state: any, action: any) {
  return _appReducer(state, action);
};