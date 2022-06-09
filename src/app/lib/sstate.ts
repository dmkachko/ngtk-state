import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class SSlice<T> {

  constructor(protected val$_: Observable<T>) {
  }

  get val$() {
    return this.val$_
  }

  pick<P extends keyof T>(prop: P): SSlice<T[P]> {
    const obs = this.val$.pipe(map(v => v[prop]));
    return new SSlice(obs);
  }

  filter(predicate: (value: T, index: number) => boolean) {
    const obs = this.val$.pipe(filter(predicate));
    return new SSlice(obs);
  }

  map(fn: (value: T, index: number) => T) {
    const obs = this.val$.pipe(map(fn));
    return new SSlice(obs);
  }
}

export interface IObservableState<T> {
  val: T;
  next(s: T):void;
}

export class SState<T extends object> extends SSlice<T> implements IObservableState<T> {

  protected readonly subj$: BehaviorSubject<T>;

  constructor(s: T) {
    const subj$ = new BehaviorSubject(s);
    super(subj$.asObservable());
    this.subj$ = subj$;
    this.val$_ = this.subj$.asObservable();
  }

  get val() {
    return this.subj$.value;
  }

  next(s: T) {
    this.subj$.next(s);
  }
}
