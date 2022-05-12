import { Component, OnInit } from '@angular/core';
import { SStore } from './sstore/sstore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  store = SStore.create({ count: 0, message: '' })
    .addAction()('inc')
    .addAction()('dec')
    .addAction<{m: string}>()('addMessage');

  ngOnInit(): void {
    const actions = this.store.actions;
    actions.inc.addReducer((s) => ({ ...s, count: s.count + 1, message: 'increased :)' }));
    actions.dec.addReducer((s) => ({ ...s, count: s.count - 1, message: 'decreased :(' }));
    actions.addMessage.addReducer((s, p) => ({ count:0, message: p.m }));
  }

}
