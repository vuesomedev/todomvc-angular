import { Injectable } from '@angular/core';
import { AddTodo, TodoStateInterface } from '../store/todo-state.interface';
import { Store } from '@ngrx/store';
import { TodoInterface } from './todo.interface';
import { onCompleteAll, onCreate, onRemove, onUpdate } from '../store/todo/todo.action';
import { selectAllCompleted, selectVisible } from '../store/todo/todo.selector';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private store: Store<TodoStateInterface>) {}

  addTodo(todo: AddTodo) {
    this.store.dispatch(onCreate(todo));
  }

  getTodos(): Observable<ReadonlyArray<TodoInterface>> {
    return this.store.select(selectVisible);
  }

  getTodoById(id: string): Observable<Readonly<TodoInterface | undefined>> {
    return this.getTodos().pipe(map(todos => todos.find(todo => todo.id === id)));
  }

  updateTodo(todo: TodoInterface) {
    this.store.dispatch(onUpdate(todo));
  }

  deleteTodo(id: string) {
    this.store.dispatch(onRemove(id));
  }

  getCompletedTodos(): Observable<ReadonlyArray<TodoInterface>> {
    return this.getTodos().pipe(map(todos => todos.filter(todo => todo.completed)));
  }

  completedTodos(): Observable<boolean> {
    return this.store.select(selectAllCompleted).pipe(map(completed => !!completed));
  }

  toggleCompleted() {
    this.store.dispatch(onCompleteAll());
  }

  deleteTodos(ids: string[]) {
    for (const id of ids) {
      this.deleteTodo(id);
    }
  }
}
