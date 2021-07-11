import {ActionReducerMap} from '@ngrx/store';
import { appReducer, AppState } from '../app.reducer';

export interface State {
  app: AppState
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer
};