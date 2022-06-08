import { Component, OnInit } from '@angular/core';
import { SStore } from './sstore/SStore';
import { FReducer } from './sstore/store.types';

interface IAppState { count: number, message: string }

const InitialState: IAppState = { count: 0, message: '' };

const incReducer: FReducer<IAppState, any> = (s) => ({ ...s, count: s.count + 1, message: 'increased :)' });
const decReducer: FReducer<IAppState, any> = (s) => ({ ...s, count: s.count - 1, message: 'decreased :(' });
const messageReducer: FReducer<IAppState, {m: string}> = (s, p) => ({ count:0, message: p.m });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  store = SStore.create(InitialState)
    .addAction()('inc')
    .addAction()('dec')
    .addAction<{m: string}>()('addMessage');

  ngOnInit(): void {
    const actions = this.store.actions;
    actions.inc.addReducer(incReducer);
    actions.dec.addReducer(decReducer);
    actions.addMessage.addReducer(messageReducer);
  }
}
