import { Action } from './action';
import { IObservableState, SState } from './sstate';

export interface I<PAYLOAD> {
  dispatch(p: PAYLOAD): void;
}

export type FReducer<STATE, PAYLOAD> = (s: STATE, p: PAYLOAD) => STATE;

export interface IAction<STATE, PAYLOAD> {
  addReducer(r: FReducer<STATE, PAYLOAD>): void;
  reduce: FReducer<STATE, PAYLOAD>;
}

export type TActionMap<State> = Record<string, Action<IObservableState<State>, any>>;

export interface ISStore<State extends object, ActionMap extends TActionMap<State>> {
  readonly state: SState<State>;
  readonly actions: ActionMap;
  readonly addAction: <Payload extends object | null>() => <K extends string>(actionName: NotInKeys<ActionMap, K>) =>
    ISStore<State, ActionMap & { [key in K]: Action<State, Payload> }>
}

export type NotInKeys<T, S> = S extends keyof T ? never : S;
