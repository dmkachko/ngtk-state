import { FReducer, IAction } from './store.types';
import { SState } from './sstate';

export class Action<S extends object, P> implements IAction<S, P> {

  private reducers = [] as FReducer<S, P>[];
  private prefixFn = (s: S, p?: P) => {};
  private postfixFn = (s: S, p?: P) => {};

  constructor(private readonly state: SState<S>, private name: string) {}

  addReducer(r: FReducer<S, P>): this {
    this.reducers.push(r);
    return this;
  }

  addReducers(rs: FReducer<S, P>[]): this {
    this.reducers = [...this.reducers, ...rs];
    return this;
  }

  readonly reduce: FReducer<S, P> = (s, p?) => {
    return (this.reducers || []).reduce((acc, r) => r(acc, p), s);
  }

  dispatch(payload: P) {
    this.log('red', 'action: ', this.name, 'payload: ', payload);
    this.prefixFn(this.state.val, payload);
    this.log('blue', 'action: ', this.name, 'state before: ', this.state.val);
    const newState = this.reduce(this.state.val, payload);
    this.state.next(newState);
    this.log('blue', 'action: ', this.name, 'state after: ', this.state.val, '\n\n');
    this.postfixFn(this.state.val, payload);
  }

  prefix(fn: (s: S, p?: P) => void) {
    this.prefixFn = fn;
  }

  postfix(fn: (s: S, p?: P) => void) {
    this.postfixFn = fn;
  }

  log(color: string, ...params: any) {
    console.log('%c☢︎', this.css(color), ...params, );
  }

  css(color: string) {
    return `color:${color}`;
  }

}







