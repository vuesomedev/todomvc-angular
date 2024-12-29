import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoLocalService } from '../../services/todo-local.service';
import { Observable } from 'rxjs';
import { TodoInterface } from '../../services/todo.interface';
import { TodoStateInterface } from '../../store/todo-state.interface';
import { onLoad } from '../../store/todo/todo.action';
import { CopyRightComponent } from '../copy-right/copy-right.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ItemComponent } from '../item/item.component';
import { ListComponent } from '../list/list.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `<div id="app">
    <section class="todoapp">
      <app-header></app-header>
      @if((todos$ | async)?.length) {
        <app-list></app-list>
        <app-footer></app-footer>
      }
    </section>
    <app-copy-right></app-copy-right>
  </div>`,
  standalone: true,
  imports: [CopyRightComponent, HeaderComponent, FooterComponent, ItemComponent, ListComponent, AsyncPipe]
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
