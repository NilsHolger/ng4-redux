import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';

import { IAppState, rootReducer, InitialState } from './store';

import { AppComponent } from './app.component';
import { TodoModule } from './tasking/tasking.module';
import { TodoService } from './todo.service';
import { MessagingModule } from './messaging/messaging.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    TodoModule,
    MessagingModule
  ],
  providers: [ TodoService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
        let enhancers = isDevMode ? [devTools.enhancer()] : [];
        ngRedux.configureStore(rootReducer, InitialState, [], enhancers);
    }
 }
