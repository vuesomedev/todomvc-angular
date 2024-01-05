import { Component } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCompletedCount, selectItemsLeft } from '../../store/todo/todo.selector';
import { FiltersObj, Filters } from '../../constants/filter';
import { TodoStateInterface } from '../../store/todo-state.interface';
import { onClearCompleted } from '../../store/todo/todo.action';
import { onFilterSelect } from '../../store/filter/filter.action';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { selectFilter } from '../../store/filter/filter.selector';

@Component({
  selector: 'app-footer',
  template: `<footer class="footer">
    <span class="todo-count"
      ><strong>{{ itemsLeft$ | async }}</strong
      ><span> {{ itemText$ | async }} left</span></span
    >
    <ul class="filters">
      <li *ngFor="let item of filterTitles">
        <a href="#" [class.selected]="item.key === (filter$ | async)" (click)="handleFilterSelect(item.key, $event)">
          {{ item.value }}
        </a>
      </li>
    </ul>
    <button *ngIf="!!(completedCount$ | async)" class="clear-completed" (click)="handleClearCompleted()">
      Clear completed
    </button>
  </footer>`,
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe]
})
export class FooterComponent {
  filterTitles: FiltersObj[] = [
    { key: 'all', value: 'All' },
    { key: 'active', value: 'Active' },
    { key: 'completed', value: 'Completed' }
  ];

  itemsLeft$: Observable<number>;

  completedCount$: Observable<number>;

  itemText$: Observable<string>;

  filter$: Observable<string>;

  constructor(private store: Store<TodoStateInterface>) {
    this.itemsLeft$ = store.select(selectItemsLeft);
    this.completedCount$ = store.select(selectCompletedCount);
    this.itemText$ = store.select((state: TodoStateInterface) => (selectItemsLeft(state) === 1 ? 'item' : 'items'));
    this.filter$ = store.select(selectFilter);
  }

  handleClearCompleted() {
    this.store.dispatch(onClearCompleted());
  }

  async handleFilterSelect(filter: Filters, event: Event) {
    event.preventDefault();
    this.store.dispatch(onFilterSelect(filter));
  }
}
