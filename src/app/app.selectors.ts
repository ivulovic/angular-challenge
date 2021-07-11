import { createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';
import { State } from './store';
 
export const selectAppState = (state: State) => state.app;
 
export const selectIsLoggedIn = createSelector(
  selectAppState,
  (state: AppState) => {
    return state.isLoggedIn
  }
);