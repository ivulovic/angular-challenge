import { createAction } from '@ngrx/store';
const scope = 'app';
export const login = createAction(`${scope}/login`);