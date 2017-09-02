import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { NgRedux, select } from '@angular-redux/store';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './actions';
import { IAppState } from './store';

@Injectable()
export class TodoService {
  private readonly URL = 'https://jsonplaceholder.typicode.com/todos';
//  private todos = [];
//  public todoAdded = new EventEmitter();
//  public todoToggled = new EventEmitter();
//  public todoRemoved = new EventEmitter();
//  public todosCleared = new EventEmitter();

  constructor(private http: Http, private ngRedux: NgRedux<IAppState>) {}

  addTodo(todo) {
    return this.http.post(this.URL, todo);
  }

  toggleTodo(todo) {
    // todo.isCompleted = !todo.isCompleted;
    // this.todoToggled.emit(todo);
  }

  removeTodo(todo) {
    // let index = this.todos.indexOf(todo);
    // this.todos.splice(index, 1);
    // this.todoRemoved.emit(todo);
  }

  loadTodos() {
    this.ngRedux.dispatch({ type: 'FETCH_TODOS_REQUEST' });
    this.http.get(this.URL).subscribe(todos => {
    this.ngRedux.dispatch({ type: 'FETCH_TODOS_SUCCESS', todos: todos.json() });
  }, err => {
    this.ngRedux.dispatch({ type: 'FETCH_TODOS_ERROR' });
  });
  }

  clearTodos() {
    // this.todos = [];
    // this.todosCleared.emit();
  }

}
