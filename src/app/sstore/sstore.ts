import { SState } from './sstate';
import { Action } from './action';
import { IAction, ISStore } from './store.types';

export class SStore<State extends object, Actions extends Record<string, IAction<State, any>> = {}> implements ISStore<State> {

  readonly state: SState<State>;

  static create<S extends object, A extends Record<string, IAction<S, any>> = {}>(state: S | SState<S>, actions = {} as A) {
    return new SStore(state, actions);
  }

  private constructor(state: State | SState<State>, readonly actions = {} as Actions) {
    this.state = state instanceof SState ? state : new SState<State>(state);
  }

  readonly addAction = <Payload = null>() => <K extends string>(actionName: K) => {
    const newAction = new Action<State, Payload>(() => this.state.val, (s) => this.state.next(s));
    const newActions = { ...this.actions, [actionName]: newAction } as Actions & { [key in K]: Action<State, Payload> };
    return SStore.create(this.state, newActions);
  }
}
