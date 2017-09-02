import { tassign } from 'tassign';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, CLEAR_TODOS, INCREMENT, DECREMENT } from './actions';

export interface IAppState {
  todos: any[];
  lastUpdate: Date;
  newMessages: number;
}

export const InitialState: IAppState = {
  todos: [],
  lastUpdate: null,
  newMessages: 0
}

class TodoActions {
  constructor(private state, private action) {}
  addTodo() {
    let newTodo = { id: this.state.todos.length + 1, title: this.action.title };
    return tassign(this.state, {
      //instead of push method  which mutates original array use concat returns a new array
      todos: this.state.todos.concat(newTodo),
      lastUpdate: new Date()
    });
  }
  toggleTodo() {
    //find item to be modified
    let todo = this.state.todos.find(t => t.id === this.action.id);
    //find position of item in array
    let index = this.state.todos.indexOf(todo);
    return tassign(this.state, {
      todos: [
        ...this.state.todos.slice(0, index),
        tassign(todo, { isCompleted: !todo.isCompleted}),
        ...this.state.todos.slice(index + 1)
      ],
      lastUpdate: new Date()
    });
  }

  removeTodo() {
    return tassign(this.state, {
      todos: this.state.todos.filter(t => t.id !== this.action.id),
      lastUpdate: new Date()
    });
  }

  clearTodos() {
    return tassign(this.state, {
      todos: [],
      lastUpdate: new Date()
    });
  }

  increment() {
    return tassign(this.state, { newMessages:  this.state.newMessages + 1 });
  }
  decrement() {
    return tassign(this.state, { newMessages:  this.state.newMessages - 1 });
  }
}

export function rootReducer(state: IAppState, action): IAppState {
    let actions = new TodoActions(state, action);
        switch(action.type) {
          case ADD_TODO: return actions.addTodo();
          case TOGGLE_TODO: return actions.toggleTodo();
          case REMOVE_TODO: return actions.removeTodo();
          case CLEAR_TODOS: return actions.clearTodos();
          case INCREMENT: return actions.increment();
          case DECREMENT: return actions.decrement();
        }
        return state;
}
