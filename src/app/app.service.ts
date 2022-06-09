import { Injectable } from '@angular/core';
import { SStore } from './lib/sstore';
import { APP_INITIAL_STATE, decReducer, incReducer, messageReducer, warningReducer } from './app-state/app.state';
import { ValidationService } from './validation.service';

@Injectable()
export class AppService {

  store = SStore.create(APP_INITIAL_STATE)
    .addAction()('inc')
    .addAction()('dec')
    .addAction<{ m: string }>()('addMessage')
    .addAction<{ m: string }>()('addMessageAndInc')
    .addAction<{ m: string }>()('setWarning')
  ;

  actions = this.store.actions;

  state$ = this.store.state.val$;

  constructor(private validationService: ValidationService) {
    this.bindActions();
    this.addFixtures();
  }

  private bindActions() {
    this.actions.inc.addReducer(incReducer);
    this.actions.dec.addReducer(decReducer);
    this.actions.addMessage.addReducer(messageReducer);
    this.actions.addMessageAndInc.addReducers([messageReducer, incReducer]);
    this.actions.setWarning.addReducers([warningReducer]);
  }

  private addFixtures() {

    this.actions.addMessage.prefix(
      s => {
        if (!this.validationService.validateCounter(s.count)) {
          this.actions.setWarning.dispatch({ m: 'Warning: The counter is out of range...' });
        } else {
          this.actions.setWarning.dispatch({ m: '' });
        }
      });

    this.actions.addMessage.postfix(
      s => {
        if (s.count === 10) {
          this.actions.setWarning.dispatch({ m: 'Warning: The counter has been set to 10!' });
        }
      });

  }

}
