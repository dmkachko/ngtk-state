import { FReducer, IAction } from './store.types';

export class Action<S, P> implements IAction<S, P> {

  private reducers = [] as FReducer<S, P>[];

  constructor(private readonly state: () => S, private readonly next: (v: S) => void) {}

  addReducer(r: FReducer<S, P>): this {
    this.reducers.push(r);
    return this;
  }

  readonly reduce: FReducer<S, P> = (s, p?) => {
    return (this.reducers || []).reduce((acc, r) => r(acc, p), s);
  }

  dispatch(payload: P) {
    const newState = this.reduce(this.state(), payload);
    this.next(newState);
  }
}







