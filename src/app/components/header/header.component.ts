import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoStateInterface } from '../../store/todo-state.interface';
import { onCreate } from '../../store/todo/todo.action';

const ENTER_KEY = 'Enter';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        [value]="name"
        (input)="handleChange($event)"
        (keyup)="handleSubmit($event)"
      />
    </header>
  `,
  standalone: true
})
export class HeaderComponent {
  name = '';

  constructor(private store: Store<TodoStateInterface>) {}

  handleChange(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
  }

  handleSubmit(event: KeyboardEvent) {
    if (event.key !== ENTER_KEY) {
      return;
    }

    this.store.dispatch(onCreate({ id: '1', name: this.name }));
    this.name = '';
  }
}
