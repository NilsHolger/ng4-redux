import { Component } from '@angular/core';
//import { TodoService } from '../todo.service';
import { NgRedux, select } from '@angular-redux/store';
import { CLEAR_TODOS } from '../../actions';
import { IAppState } from '../../store';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.css']
})
export class TodoDashboardComponent {
  @select() todos;
  @select() lastUpdate;

  constructor(private ngRedux: NgRedux<IAppState>) {

  }

  clearTodos() {
    this.ngRedux.dispatch({type: CLEAR_TODOS});
  }

}
