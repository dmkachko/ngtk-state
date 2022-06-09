import { FReducer } from '../lib/store.types';
import { IAppState } from '../app.types';

export const APP_INITIAL_STATE: IAppState = { count: 0, message: '' };

type AppReducer<P = any> = FReducer<IAppState, P>;

export const incReducer: AppReducer = (s) => ({ ...s, count: s.count + 1, message: 'increased :)' });
export const decReducer: AppReducer = (s) => ({ ...s, count: s.count - 1, message: 'decreased :(' });
export const messageReducer: AppReducer<{ m: string }> = (s, p) => ({ ...s, message: p.m });
export const warningReducer: AppReducer<{ m: string }> = (s, p) => ({ ...s, warning: p.m });
