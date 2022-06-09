import { SState } from './sstate';
import { Action } from './action';
import { ISStore, NotInKeys, TActionMap } from './store.types';

export class SStore<State extends object, ActionMap extends TActionMap<State> = {}> implements ISStore<State, ActionMap> {

  readonly state: SState<State>;

  constructor(state: State | SState<State>, readonly actions = {} as ActionMap) {
    this.state = state instanceof SState ? state : new SState<State>(state);
  }

  static create<S extends object, A extends TActionMap<S> = {}>(state: S | SState<S>, actions = {} as A) {
    return new SStore(state, actions);
  }

  readonly addAction = <Payload extends object | null = null>() => <K extends string>(actionName: NotInKeys<ActionMap, K>) => {
    const newAction = new Action<State, Payload>(this.state, actionName);
    const newActionMap = {[actionName]: newAction} as { [key in K]: Action<State, Payload> };
    const newActions = { ...this.actions, ...newActionMap};
    return SStore.create(this.state, newActions as { [K in keyof typeof newActions]: (typeof newActions)[K] });
  }
}
