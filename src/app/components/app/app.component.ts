import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoLocalService } from '../../services/todo-local.service';
import { Observable } from 'rxjs';
import { TodoInterface } from '../../services/todo.interface';
import { TodoStateInterface } from '../../store/todo-state.interface';
import { onLoad } from '../../store/todo/todo.action';

@Component({
  selector: 'app-root',
  template: `<div id="app">
    <section class="todoapp">
      <app-header></app-header>
      <app-list *ngIf="(todos$ | async)?.length"></app-list>
      <app-footer *ngIf="(todos$ | async)?.length"></app-footer>
    </section>
    <app-copy-right></app-copy-right>
  </div>`
})
export class AppComponent implements OnInit {
  todos$: Observable<TodoInterface[]>;

  constructor(private store: Store<TodoStateInterface>) {
    this.todos$ = this.store.select('todos');
  }

  ngOnInit() {
    this.store.dispatch(onLoad(TodoLocalService.loadTodos()));
    this.todos$.subscribe(todos => TodoLocalService.storeTodos(todos));
  }
}
