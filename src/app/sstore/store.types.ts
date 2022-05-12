import { Action } from './action';
import { SState } from './sstate';
import { SStore } from './sstore';

export interface I<PAYLOAD> {
  dispatch(p: PAYLOAD): void;
}

export type FReducer<STATE, PAYLOAD> = (s: STATE, p: PAYLOAD) => STATE;

export interface IAction<STATE, PAYLOAD> {
  addReducer(r: FReducer<STATE, PAYLOAD>): void;
  reduce: FReducer<STATE, PAYLOAD>;
}

export interface ISStore<State extends object, A extends Record<string, Action<State, any>> = {}> {
  readonly state: SState<State>;
  readonly actions: A;
  readonly addAction: <Payload>() => <K extends string>(actionName: K) => SStore<State, A & { [key in K]: Action<State, Payload> }>
}
